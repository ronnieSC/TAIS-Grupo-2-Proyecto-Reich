import cabecera from "./sesion.api";
import docenteApi from "./docente.api";
import { AxiosError } from "axios";

const crear_calificacion = async (calificacion: any) => {
  const response = await cabecera("/api/calificaciones/")
    .then(async (response) => {
      return response
        .post("/", calificacion)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const actualizar_calificacion = async (
  idCalificacion: any,
  calificacion: any
) => {
  const response = await cabecera(`/api/calificaciones/${idCalificacion}/`)
    .then(async (response) => {
      return response
        .patch("/", calificacion)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const ver_calificacion = async (idEstudiante: string) => {
  const { data } = await cabecera(`/api/calificaciones/${idEstudiante}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_calificaciones_asignadas = async () => {
  const { data } = await cabecera("/api/calificaciones/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_calificacion_asignada = async (idCalificacion: any) => {
  const { data } = await cabecera(`/api/calificaciones/${idCalificacion}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_datos_estudiante = async (id: string) => {
  const datosEstudiante = await docenteApi.obtener_listado_alumnos(id);
  return { datosEstudiante };
};

const obtener_informacion_completa = async (id: string) => {
  const calificaciones = await obtener_calificaciones_asignadas();
  const datosDelEstudiante = await obtener_datos_estudiante(id);

  return { calificaciones, datosDelEstudiante };
};

const obtener_notas = async (idEstudiante: any) => {
  const { data } = await cabecera(`/api/calificaciones/${idEstudiante}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

export default {
  crear_calificacion,
  ver_calificacion,
  actualizar_calificacion,
  obtener_calificaciones_asignadas,
  obtener_datos_estudiante,
  obtener_informacion_completa,
  obtener_calificacion_asignada,
  obtener_notas,
};
