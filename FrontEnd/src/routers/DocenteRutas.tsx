import { RouterProvider, createBrowserRouter } from "react-router-dom";
import credencialesApi from "../api/credenciales.api";

import Inicio from "../pages/Inicio/Inicio";

import ErrorPagina from "../pages/Error/ErrorPagina";
import MisCursos from "../pages/MisCursos/MisCursos";
import { DocenteLayout } from "./Layouts/DocenteLayout";
import DetallesMisCursos from "../pages/MisCursos/DetalleMisCursos/DetalleMisCursos";
import RegistroCompleto from "../pages/MisCursos/RegistroCompleto/RegistroCompleto";

import docenteApi from "../api/docente.api";
import calificacionApi from "../api/calificaciones.api";
import NuevaCalificacion from "../pages/MisCursos/ModalNuevaCalificacion/NuevaCalificacion";
import EditarCalificacion from "../pages/MisCursos/ModalEditarCalificacion/EditarCalificacion";
import { AxiosError } from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    id: "rootAdmin",
    loader: () => credencialesApi.obtener_datos(),
    element: <DocenteLayout />,
    errorElement: <ErrorPagina />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
      /*
       * Rutas - Gestión Docentes Mis Cursos
       */
      {
        path: "misCursos",
        id: "misCursosDocente",
        loader: () => docenteApi.obtener_cursos_asignados(),
        element: <MisCursos />,
      },

      {
        path: "misCursos/:idBloque",
        id: "listadoRaiz",
        loader: async ({ params }) => {          
          const resp = await docenteApi.obtener_listado_alumnos(
            params.idBloque!
          );
          return resp;
        },
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData(); //
              const values = formData.get("values") as string;
              const calificacion = JSON.parse(values);

              const response = await calificacionApi
                .crear_calificacion(calificacion)
                .then((response) => {
                  if (response && response.status == 201) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    return {
                      ok: false,
                      status: error.response.status,
                      errors: error.response.data,
                    };
                  }
                  return { ok: false };
                });

              return response;
            }
          }
        },
        element: <DetallesMisCursos />,
        children: [
          {
            path: "crear/:idEstudiante",
            id: "crearCalificacion",
            loader: () => calificacionApi.obtener_calificaciones_asignadas(),            
            element: <NuevaCalificacion />,
          },
          {
            path: "registro_Completo/:idCurso",
            id: "registro",
            loader: () => calificacionApi.obtener_calificaciones_asignadas(),
            action: async ({ request }) => {
              switch (request.method) {
                case "PATCH": {
                  const formData = await request.formData();
                  const values = formData.get("values") as string;
                  const calificacion = JSON.parse(values);
                  const calificacionId = formData.get(
                    "idCalificacion"
                  ) as string;

                  const response = await calificacionApi
                    .actualizar_calificacion(calificacionId, calificacion)
                    .then((response) => {
                      if (response && response.status == 200) {
                        return { ok: true, status: response.status };
                      }
                      return { ok: true };
                    })
                    .catch((error: AxiosError) => {
                      if (error.response) {
                        console.log(error)
                        return {
                          ok: false,
                          status: error.response.status,
                          errors: error.response.data,
                        };
                      }
                      return { ok: false };
                    });
                  return response;
                }
              }
            },
            element: <RegistroCompleto />,
            children: [
              {
                path: "editar/:idEstudianteCurso",
                id: "editarCalificacion",
                loader: async ({ params }) => {
                  const a = await calificacionApi.obtener_calificacion_asignada(
                    params.idEstudianteCurso
                  );
                  return a;
                },

                element: <EditarCalificacion />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function DocenteRutas() {
  return <RouterProvider router={router} />;
}
