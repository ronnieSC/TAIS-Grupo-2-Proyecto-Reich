import { RouterProvider, createBrowserRouter } from "react-router-dom";
import credencialesApi from "../api/credenciales.api";
import { AdminLayout } from "./Layouts/AdminLayout";
import contratoApi from "../api/contrato.api";
import claseApi from "../api/clase.api";

import Clase from "../pages/Clase/Clase";
import NuevaClase from "../pages/Clase/ModalNuevaClase/NuevaClase";
import EditarClase from "../pages/Clase/ModalEditarClase/EditarClase";
import EliminarClase from "../pages/Clase/ModalEliminarClase/EliminarClase";

import Curso from "../pages/Curso/Curso";

import Contrato from "../pages/Contrato/Contrato";
import Inicio from "../pages/Inicio/Inicio";
import NuevoContrato from "../pages/Contrato/ModalNuevoContrato/NuevoContrato";
import EditarContrato from "../pages/Contrato/ModalEditarContrato/EditarContrato";
import EliminarContrato from "../pages/Contrato/ModalEliminarContrato/EliminarContrato";
import VerContrato from "../pages/Contrato/ModalVerContrato/VerContrato";
//import ErrorPagina from "../pages/Error/ErrorPagina";
import estudianteApi from "../api/estudiante.api";
import Estudiante from "../pages/Estudiante/Estudiante";
import VerEstudiante from "../pages/Estudiante/ModalVerEstudiante/VerEstudiante";
import EditarEstudiante from "../pages/Estudiante/ModalEditarEstudiante/EditarEstudiante";
import cursoApi from "../api/curso.api";
import NuevoCurso from "../pages/Curso/ModalNuevoCurso/NuevoCurso";
import EliminarCurso from "../pages/Curso/ModalEliminarCurso/EliminarCurso";
import VerCurso from "../pages/Curso/ModalVerCurso/VerCurso";
import EditarCurso from "../pages/Curso/ModalEditarCurso/EditarCurso";
import Pariente from "../pages/Estudiante/ModalAgregarEstudiante/Pariente";
import parienteApi from "../api/pariente.api";
import AgregarPariente from "../pages/Estudiante/ModalAgregarEstudiante/ModalAgregarPariente/AgregarPariente";
import EliminarPariente from "../pages/Estudiante/ModalAgregarEstudiante/ModalEliminarPariente/EliminarPariente";
import EditarPariente from "../pages/Estudiante/ModalAgregarEstudiante/ModalEditarPariente/EditarPariente";
import VerPariente from "../pages/Estudiante/ModalAgregarEstudiante/ModalVerPariente/VerPariente";
import docenteApi from "../api/docente.api";
import Docente from "../pages/Docente/Docente";
import NuevoDocente from "../pages/Docente/ModalNuevoDocente/NuevoDocente";
import EditarDocente from "../pages/Docente/ModalEditarDocente/EditarDocente";
import VerDocente from "../pages/Docente/ModalVerDocente/VerDocente";
import EliminarDocente from "../pages/Docente/ModalEliminarDocente/EliminarDocente";
import { ParienteEntidad } from "../utilities/ParienteTipos";
import { EstudianteEntidad } from "../utilities/EstudianteTipos";
import { DocenteEntidad } from "../utilities/DocenteTipos";
import { ClaseGuardada } from "../utilities/ClaseTipos";
import { CursoGuardado } from "../utilities/CursoTipos";
import { AxiosError, AxiosResponse } from "axios";
import ClaseEstudiantes from "../pages/Clase/ModalEstudiantes/ClaseEstudiantes";
import AgregarEstudiantes from "../pages/Clase/ModalEstudiantes/AgregarEstudiantes";
import QuitarEstudiante from "../pages/Clase/ModalEstudiantes/QuitarEstudiantes";
import configuracionApi from "../api/configuracion.api";
import Configuracion from "../pages/Configuracion/Configuracion";
import NuevoGradoConfig from "../pages/Configuracion/ModalNuevoGrado/NuevoGrado";
import EliminarGradoConfig from "../pages/Configuracion/ModalEliminarGrado/EliminarGrado";
import NuevoAnioAcademicoConfig from "../pages/Configuracion/ModalNuevoAnio/NuevoAnio";
import EliminarAnioAcademicoConfig from "../pages/Configuracion/ModalEliminarAnio/EliminarAnio";
import NuevoEncargadoConfig from "../pages/Configuracion/ModalNuevoEncargado/NuevoEncargado";
import EditarEncargadoConfig from "../pages/Configuracion/ModalEditarEncargado/EditarEncargado";
import EliminarEncargadoConfig from "../pages/Configuracion/ModalEliminarEncargado/EliminarEncargado";
import NuevoNivelConfig from "../pages/Configuracion/ModalNuevoNivel/NuevoNivel";
import EliminarNivelConfig from "../pages/Configuracion/ModalEliminarNivel/EliminarNivel";
import NuevaActividadConfig from "../pages/Configuracion/ModalNuevaActividad/NuevaActividad";
import EliminarActividadConfig from "../pages/Configuracion/ModalEliminarActividad/EliminarActividad";
import NuevoTipoDocumentoConfig from "../pages/Configuracion/ModalNuevoTipoDocumento/NuevoTipoDocumento";
import EditarTipoDocumentoConfig from "../pages/Configuracion/ModalEditarTipoDocumento/EditarTipoDocumento";
import EliminarTipoDocumentoConfig from "../pages/Configuracion/ModalEliminarTipoDocumento/EliminarTipoDocumento";
import NuevoPrecioConfig from "../pages/Configuracion/ModalNuevoPrecio/NuevoPrecio";
import EditarPrecioConfig from "../pages/Configuracion/ModalEditarPrecio/EditarPrecio";
import EliminarPrecioConfig from "../pages/Configuracion/ModalEliminarPrecio/EliminarPrecio";
import NuevoDocumentoContratoConfig from "../pages/Configuracion/ModalNuevoDocumentoContrato/NuevoDocumentoContrato";
import EditarDocumentoContratoConfig from "../pages/Configuracion/ModalEditarDocumentoContrato/EditarDocumentoContrato";
import EliminarDocumentoContratoConfig from "../pages/Configuracion/ModalEliminarDocumentoContrato/EliminarDocumentoContrato";

import {
  GradoGuardado,
  AnioAcademicoGuardado,
  NivelGuardado,
  ActividadGuardada,
  EncargadoGuardado,
  TipoDocumentoGuardado,
  PrecioGuardado,
  DocumentoContratoGuardado,
} from "../utilities/ConfigracionTipos";
import ErrorPagina from "../pages/Error/ErrorPagina";
import Horario from "../pages/Horario/Horario";
import NuevoHorario from "../pages/Horario/ModalNuevoHorario/NuevoHorario";
import VerHorario from "../pages/Horario/VerHorario/VerHorario";
import horarioApi from "../api/horario.api";
import EliminarHorario from "../pages/Horario/EliminarHorario/EliminarHorario";
import ConfigurarHorario from "../pages/Horario/VerHorario/ConfigurarHorario/ConfigurarHorario";
import EliminarBloque from "../pages/Horario/VerHorario/EliminarBloque/EliminarBloque";

const router = createBrowserRouter([
  {
    path: "/",
    id: "rootAdmin",
    loader: () => credencialesApi.obtener_datos(),
    element: <AdminLayout />,
    errorElement: <ErrorPagina />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },

      /*
       * Rutas - Gestión Contratos
       */
      {
        path: "contrato",
        id: "contratoRaiz",
        loader: () => contratoApi.informacion_relevante(),
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const contrato = JSON.parse(values);

              const response = await contratoApi
                .crear_contrato(contrato)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 201) {
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
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const contrato = JSON.parse(values);
              const contratoId = formData.get("contratoId") as string;

              console.log(contrato, contratoId);

              const response = await contratoApi
                .actualizar_contrato(contrato, contratoId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 200) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error.response);
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
            case "DELETE": {
              const formData = await request.formData();
              const contratoId = formData.get("contratoId") as string;

              const response = await contratoApi
                .eliminar_contrato(contratoId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
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
        element: <Contrato />,
        children: [
          {
            path: "crear",
            loader: () => contratoApi.obtener_datos_nuevocontrato(),
            element: <NuevoContrato />,
          },
          {
            path: "editar/:contratoId",
            loader: async ({ params }) => {
              const contrato = await contratoApi.obtener_contrato(
                params.contratoId!
              );
              const informacion =
                await contratoApi.obtener_datos_nuevocontrato();
              return { contrato, informacion };
            },
            element: <EditarContrato />,
          },
          {
            path: "eliminar/:contratoId",
            loader: ({ params }) =>
              contratoApi.obtener_contrato(params.contratoId!),
            element: <EliminarContrato />,
          },
          {
            path: "ver/:contratoId",
            loader: ({ params }) =>
              contratoApi.obtener_contrato(params.contratoId!),
            element: <VerContrato />,
          },
        ],
      },

      /*
       * Rutas - Gestión Configuracion
       */
      {
        path: "configuracion",
        id: "configuracionRaiz",
        loader: () => configuracionApi.informacion_relevante(),
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const valuesSerialized = formData.get("valuesGrado") as string;
              const valuesSerialized2 = formData.get("valuesNivel") as string;
              const valuesSerialized3 = formData.get("valuesAnio") as string;
              const valuesSerialized4 = formData.get("valuesPrecio") as string;
              const valuesSerialized5 = formData.get(
                "valuesEncargado"
              ) as string;
              const valuesSerialized6 = formData.get(
                "valueTipoDocumento"
              ) as string;
              const valuesSerialized7 = formData.get(
                "valuesActividad"
              ) as string;
              const valuesSerialized8 = formData.get(
                "valueDocumentoContrato"
              ) as string;

              /*  CREAR NUEVO GRADO */
              if (valuesSerialized != null) {
                const grado = JSON.parse(valuesSerialized) as GradoGuardado;

                const response = await configuracionApi
                  .crear_grado(grado)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 201) {
                      return { ok: true, status: response.status };
                    }
                    return { ok: true };
                  })
                  .catch((error: AxiosError) => {
                    if (error.response) {
                      console.log(error.response)
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

              /*  CREAR NUEVO NIVEL */
              if (valuesSerialized2 != null) {
                const nivel = JSON.parse(valuesSerialized2) as NivelGuardado;

                const response = await configuracionApi
                  .crear_nivel(nivel)
                  .then((response: AxiosResponse | void) => {
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

              /*  CREAR NUEVO AÑO ACADEMICO */
              if (valuesSerialized3 != null) {
                const anioAcademico = JSON.parse(
                  valuesSerialized3
                ) as AnioAcademicoGuardado;

                const response = await configuracionApi
                  .crear_anioAcademico(anioAcademico)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 201) {
                      return { ok: true, status: response.status };
                    }
                    return { ok: true };
                  })
                  .catch((error: AxiosError) => {
                    if (error.response) {
                      console.log(error.response)
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

              /*  CREAR NUEVO PRECIO */
              if (valuesSerialized4 != null) {
                const precio = JSON.parse(valuesSerialized4) as PrecioGuardado;

                const response = await configuracionApi
                  .crear_precio(precio)
                  .then((response: AxiosResponse | void) => {
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

              /*  CREAR NUEVO ENCARGADO */
              if (valuesSerialized5 != null) {
                const encargado = JSON.parse(
                  valuesSerialized5
                ) as EncargadoGuardado;

                const response = await configuracionApi
                  .crear_encargado(encargado)
                  .then((response: AxiosResponse | void) => {
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

              /*  CREAR NUEVO TIPO DOCUMENTO */
              if (valuesSerialized6 != null) {
                const tipoDocumento = JSON.parse(
                  valuesSerialized6
                ) as TipoDocumentoGuardado;

                const response = await configuracionApi
                  .crear_tipoDocumento(tipoDocumento)
                  .then((response: AxiosResponse | void) => {
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

              /*  CREAR NUEVA ACTIVIDAD */
              if (valuesSerialized7 != null) {
                const actividad = JSON.parse(
                  valuesSerialized7
                ) as ActividadGuardada;

                const response = await configuracionApi
                  .crear_actividad(actividad)
                  .then((response: AxiosResponse | void) => {
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

              /* CREAR NUEVO DOCUMENTO CONTRATO */
              if (valuesSerialized8 != null) {
                const documentoContrato = JSON.parse(
                  valuesSerialized8
                ) as DocumentoContratoGuardado;

                const response = await configuracionApi
                  .crear_contratoDocumento(documentoContrato)
                  .then((response: AxiosResponse | void) => {
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
              return { ok: false };
            }
            case "PATCH": {
              const formData = await request.formData();
              const valuesPrecio = formData.get("valuesPrecio") as string;
              const valuesEncargado = formData.get("valuesEncargado") as string;
              const valuesTipoDocumento = formData.get(
                "valuesTipoDocumento"
              ) as string;
              const valuesContratoDocumento = formData.get(
                "valuesContratoDocumento"
              ) as string;
              if (valuesPrecio != null) {
                /* ACTUALIZAR UN PRECIO */
                const precio = JSON.parse(valuesPrecio) as PrecioGuardado;
                const precioId = formData.get("precioId") as string;

                const response = await configuracionApi
                  .actualizar_precio(precio, precioId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 200) {
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

              if (valuesEncargado != null) {
                /* ACTUALIZAR UN ENCARGADO  */
                const encargado = JSON.parse(
                  valuesEncargado
                ) as EncargadoGuardado;
                const encargadoId = formData.get("encargadoId") as string;

                const response = await configuracionApi
                  .actualizar_encargado(encargado, encargadoId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 200) {
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

              if (valuesTipoDocumento != null) {
                /* ACTUALIZAR UN TIPO DOCUMENTO  */
                const tipoDocumento = JSON.parse(
                  valuesTipoDocumento
                ) as TipoDocumentoGuardado;
                const tipoDocumentoId = formData.get(
                  "tipoDocumentoId"
                ) as string;

                const response = await configuracionApi
                  .actualizar_tipoDocumento(tipoDocumento, tipoDocumentoId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 200) {
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

              if (valuesContratoDocumento != null) {
                /* ACTUALIZAR UN DOCUMENTO CONTRATO  */
                const documentoContrato = JSON.parse(
                  valuesContratoDocumento
                ) as DocumentoContratoGuardado;
                const documentoContratoId = formData.get(
                  "documentoContratoId"
                ) as string;
                const response = await configuracionApi
                  .actualizar_contratoDocumento(
                    documentoContrato,
                    documentoContratoId
                  )
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 200) {
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
              return { ok: false };
            }
            case "DELETE": {
              const formData = await request.formData();
              const gradoId = formData.get("gradoId") as string;
              const precioId = formData.get("precioId") as string;
              const nivelId = formData.get("nivelId") as string;
              const anioId = formData.get("anioId") as string;
              const encargadoId = formData.get("encargadoId") as string;
              const tipoDocId = formData.get("tipoDocId") as string;
              const actividadId = formData.get("actividadId") as string;
              const docContId = formData.get("docContId") as string;

              if (gradoId != null) {
                /*  ELIMINAR GRADO */
                const response = await configuracionApi
                  .eliminar_grado(gradoId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (precioId != null) {
                /*  ELIMINAR PRECIO */
                const response = await configuracionApi
                  .eliminar_precio(precioId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (nivelId != null) {
                /*  ELIMINAR NIVEL */
                const response = await configuracionApi
                  .eliminar_nivel(nivelId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (anioId != null) {
                /*  ELIMINAR AÑO */
                const response = await configuracionApi
                  .eliminar_anioAcademico(anioId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (encargadoId != null) {
                /*  ELIMINAR Encargado */
                const response = await configuracionApi
                  .eliminar_encargado(encargadoId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (tipoDocId != null) {
                /*  ELIMINAR NIVEL */
                const response = await configuracionApi
                  .eliminar_tipoDocumento(tipoDocId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              if (actividadId != null) {
                /*  ELIMINAR ACTIVIDAD */
                const response = await configuracionApi
                  .eliminar_actividad(actividadId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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

              if (docContId != null) {
                /*  ELIMINAR DOCUMENTO CONTRATO */
                const response = await configuracionApi
                  .eliminar_contratoDocumento(docContId)
                  .then((response: AxiosResponse | void) => {
                    if (response && response.status == 204) {
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
              return { ok: false };
            }
          }
          return { ok: false };
        },

        element: <Configuracion />,
        children: [
          /* RUTAS PARA CREAR UN GRADO - CONFIURACION */
          {
            path: "crearGrado/",
            loader: () => configuracionApi.obtener_grados(),
            element: <NuevoGradoConfig />,
          },
          {
            path: "eliminarGrado/:gradoId",
            loader: ({ params }) =>
              configuracionApi.obtener_grado(params.gradoId!),
            element: <EliminarGradoConfig />,
          },
          /* RUTAS PARA CREAR UN AÑO ACADEMICO - CONFIURACION */
          {
            path: "crearAnioAcademico/",
            loader: () => configuracionApi.obtener_aniosAcademicos(),
            element: <NuevoAnioAcademicoConfig />,
          },
          {
            path: "eliminarAnioAcademico/:anioId",
            loader: ({ params }) =>
              configuracionApi.obtener_anioAcademico(params.anioId!),
            element: <EliminarAnioAcademicoConfig />,
          },
          /* RUTAS PARA CREAR UN ENCARGADO O RESPONSABLE - CONFIURACION */
          {
            path: "crearEncargado/",
            loader: () => configuracionApi.obtener_encargados(),
            element: <NuevoEncargadoConfig />,
          },
          {
            path: "editarEncargado/:encargadoId",
            loader: ({ params }) =>
              configuracionApi.obtener_encargado(params.encargadoId!),
            element: <EditarEncargadoConfig />,
          },
          {
            path: "eliminarEncargado/:encargadoId",
            loader: ({ params }) =>
              configuracionApi.obtener_encargado(params.encargadoId!),
            element: <EliminarEncargadoConfig />,
          },
          /* RUTAS PARA CREAR UN TIPO DOCUMENTO - CONFIURACION */
          {
            path: "crearTipoDocumento/",
            loader: () => configuracionApi.obtener_tipoDocumentos(),
            element: <NuevoTipoDocumentoConfig />,
          },
          {
            path: "editarTipoDocumento/:tipoDocId",
            loader: ({ params }) =>
              configuracionApi.obtener_tipoDocumento(params.tipoDocId!),
            element: <EditarTipoDocumentoConfig />,
          },
          {
            path: "eliminarTipoDocumento/:tipoDocId",
            loader: ({ params }) =>
              configuracionApi.obtener_tipoDocumento(params.tipoDocId!),
            element: <EliminarTipoDocumentoConfig />,
          },
          /* RUTAS PARA CREAR UN NIVEL - CONFIURACION */
          {
            path: "crearNivel",
            loader: () => configuracionApi.obtener_niveles(),
            element: <NuevoNivelConfig />,
          },
          {
            path: "eliminarNivel/:nivelId",
            loader: ({ params }) =>
              configuracionApi.obtener_nivel(params.nivelId!),
            element: <EliminarNivelConfig />,
          },
          /* RUTAS PARA CREAR UNA ACTIVIDAD - CONFIURACION */
          {
            path: "crearActividad/",
            loader: () => configuracionApi.obtener_actividades(),
            element: <NuevaActividadConfig />,
          },
          {
            path: "eliminarActividad/:actividadId",
            loader: ({ params }) =>
              configuracionApi.obtener_actividad(params.actividadId!),
            element: <EliminarActividadConfig />,
          },
          /* RUTAS PARA CREAR UNA ACTIVIDAD - CONFIURACION */
          {
            path: "crearPrecio/",
            loader: () => configuracionApi.obtener_precios(),
            element: <NuevoPrecioConfig />,
          },
          {
            path: "editarPrecio/:precioId",
            loader: ({ params }) =>
              configuracionApi.obtener_precio(params.precioId!),
            element: <EditarPrecioConfig />,
          },
          {
            path: "eliminarPrecio/:precioId",
            loader: ({ params }) =>
              configuracionApi.obtener_precio(params.precioId!),
            element: <EliminarPrecioConfig />,
          },
          /* RUTAS PARA CREAR UN DOCUMENTO CONTRATO - CONFIGURACION */
          {
            path: "crearDocumentoContrato/",
            loader: () => configuracionApi.obtener_contratoDocumentos(),
            element: <NuevoDocumentoContratoConfig />,
          },
          {
            path: "editarDocumentoContrato/:docContId",
            loader: ({ params }) =>
              configuracionApi.obtener_contratoDocumento(params.docContId!),
            element: <EditarDocumentoContratoConfig />,
          },
          {
            path: "eliminarDocumentoContrato/:docContId",
            loader: ({ params }) =>
              configuracionApi.obtener_contratoDocumento(params.docContId!),
            element: <EliminarDocumentoContratoConfig />,
          },
        ],
      },

      /*
       * Rutas - Gestión Clases
       */
      {
        path: "clase",
        id: "claseRaiz",
        loader: () => claseApi.informacion_relevante(),
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const clase = JSON.parse(values);

              const response = await claseApi
                .crear_clase(clase)
                .then((response: AxiosResponse | void) => {
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
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const clase = JSON.parse(values) as ClaseGuardada;
              const claseId = formData.get("claseId") as string;

              const response = await claseApi
                .actualizar_clase(clase, claseId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 200) {
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
            case "DELETE": {
              const formData = await request.formData();
              const claseId = formData.get("claseId") as string;

              const response = await claseApi
                .eliminar_clase(claseId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
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
        element: <Clase />,
        children: [
          {
            path: "crear",
            loader: () => claseApi.obtener_datos_clase(),
            element: <NuevaClase />,
          },
          {
            path: "editar/:claseId",
            loader: ({ params }) => claseApi.obtener_clase(params.claseId!),
            element: <EditarClase />,
          },
          {
            path: "eliminar/:claseId",
            loader: ({ params }) => claseApi.obtener_clase(params.claseId!),
            element: <EliminarClase />,
          },
          {
            path: "estudiantes/:claseId",
            id: "clase_estudiantes",
            loader: async ({ params }) => {
              const clase_estudiantes =
                await claseApi.obtener_estudiante_clase();
              const estudiantes = await estudianteApi.obtener_estudiantes();
              const clase = await claseApi.obtener_clase(params.claseId!);
              return { clase, estudiantes, clase_estudiantes };
            },
            action: async ({ request }) => {
              switch (request.method) {
                case "POST": {
                  const formData = await request.formData();
                  const values = formData.get("values") as string;
                  const estudiantes = JSON.parse(values) as number[];
                  const claseId = formData.get("claseId") as string;

                  estudiantes.forEach(async (id) => {
                    const tmp = {
                      clase_codigo: claseId,
                      estudiante_codigo: id,
                      semana_codigo: 1,
                    };
                    const response = await claseApi
                      .agregar_estudiante(tmp)
                      .then((response: AxiosResponse | void) => {
                        if (response && response.status === 201) {
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
                      return response
                  });

                  return { ok: false };
                }

                case "DELETE": {
                  const formData = await request.formData();
                  const values = formData.get("values") as string;
                  const clase_estudiantes_ids = JSON.parse(values) as number[];

                  clase_estudiantes_ids.forEach(async (id) => {
                    await claseApi
                      .eliminar_estudiante_clase(id)
                      .then((response: AxiosResponse | void) => {
                        if (response && response.status == 204) {
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
                  });

                  return { ok: false };
                }
              }
            },
            element: <ClaseEstudiantes />,
            children: [
              {
                path: "agregar",
                element: <AgregarEstudiantes />,
              },
              {
                path: "quitar",
                element: <QuitarEstudiante />,
              },
            ],
          },
        ],
      },

      /*
       * Rutas - Gestión Estudiantes/Parientes
       */
      {
        path: "estudiante",
        id: "estudianteRaiz",
        loader: () => estudianteApi.informacion_relevante(),
        action: async ({ request }) => {
          switch (request.method) {
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const estudiante = JSON.parse(values) as EstudianteEntidad;
              const estudianteId = formData.get("estudianteId") as string;

              const response = await estudianteApi
                .actualizar_estudiante(estudiante, estudianteId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 200) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error.response)
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
            case "DELETE": {
              const formData = await request.formData();
              const estudianteId = formData.get("estudianteId") as string;

              const response = await estudianteApi
                .eliminar_estudiante(estudianteId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
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
        element: <Estudiante />,
        children: [
          {
            path: "parientes/:contratoId",
            id: "parienteRaiz",
            loader: ({ params }) =>
              parienteApi.obtener_parientes(params.contratoId!),
            action: async ({ request }) => {
              switch (request.method) {
                case "POST": {
                  const formData = await request.formData();
                  const values = formData.get("values") as string;
                  const pariente = JSON.parse(values);

                  const response = await parienteApi
                    .crear_pariente(pariente)
                    .then((response: AxiosResponse | void) => {
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
                case "PATCH": {
                  const formData = await request.formData();
                  const values = formData.get("values") as string;
                  const pariente = JSON.parse(values) as ParienteEntidad;
                  const parienteId = formData.get("parienteId") as string;

                  console.log(pariente, parienteId)

                  const response = await parienteApi
                    .actualizar_pariente(pariente, parienteId)
                    .then((response: AxiosResponse | void) => {
                      if (response && response.status == 200) {
                        return { ok: true, status: response.status };
                      }
                      return { ok: true };
                    })
                    .catch((error: AxiosError) => {
                      if (error.response) {
                        console.log(error.response)
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
                case "DELETE": {
                  const formData = await request.formData();
                  const parienteId = formData.get("parienteId") as string;

                  const response = await parienteApi
                    .eliminar_pariente(parienteId)
                    .then((response: AxiosResponse | void) => {
                      if (response && response.status == 204) {
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
            element: <Pariente />,
            children: [
              {
                path: "agregar/:contratoId",
                loader: () => parienteApi.obtener_datos_pariente(),
                element: <AgregarPariente />,
              },
              {
                path: "editar/:parienteId",
                element: <EditarPariente />,
              },
              {
                path: "eliminar/:parienteId",
                element: <EliminarPariente />,
              },
              {
                path: "ver/:parienteId",
                element: <VerPariente />,
              },
            ],
          },
          {
            path: "editar/:estudianteId",
            loader: ({ params }) =>
              estudianteApi.obtener_estudiante(params.estudianteId!),
            element: <EditarEstudiante />,
          },
          {
            path: "ver/:estudianteId",
            loader: ({ params }) =>
              estudianteApi.obtener_estudiante(params.estudianteId!),
            element: <VerEstudiante />,
          },
        ],
      },

      /*
       * Rutas - Gestión Cursos
       */
      {
        path: "curso",
        id: "cursoRaiz",
        loader: async () => cursoApi.obtener_cursos(),
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const curso = JSON.parse(values);

              const response = await cursoApi
                .crear_curso(curso)
                .then((response: AxiosResponse | void) => {
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
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const curso = JSON.parse(values) as CursoGuardado;
              const cursoId = formData.get("cursoId") as string;

              const response = await cursoApi
                .actualizar_curso(curso, cursoId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 200) {
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
            case "DELETE": {
              const formData = await request.formData();
              const cursoId = formData.get("cursoId") as string;

              const response = await cursoApi
                .eliminar_curso(cursoId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
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
          return { ok: false };
        },
        element: <Curso />,
        children: [
          {
            path: "crear",
            element: <NuevoCurso />,
          },
          {
            path: "editar/:cursoId",
            loader: ({ params }) => cursoApi.obtener_curso(params.cursoId!),
            element: <EditarCurso />,
          },
          {
            path: "eliminar/:cursoId",
            loader: ({ params }) => cursoApi.obtener_curso(params.cursoId!),
            element: <EliminarCurso />,
          },
          {
            path: "ver/:cursoId",
            loader: ({ params }) => cursoApi.obtener_curso(params.cursoId!),
            element: <VerCurso />,
          },
        ],
      },

      /*
       * Rutas - Gestión Docentes
       */
      {
        path: "docente",
        id: "docenteRaiz",
        loader: async () => {
          const docentes = await docenteApi.obtener_docentes();
          const informacion = await docenteApi.obtener_datos_docente();
          return { docentes, informacion };
        },
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const docente = JSON.parse(values);

              const response = await docenteApi
                .crear_docente(docente)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 201) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error.response);
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
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const docente = JSON.parse(values) as DocenteEntidad;
              const docenteId = formData.get("docenteId") as string;

              if (values.length <= 0) return { ok: false };

              const response = await docenteApi
                .actualizar_docente(docente, docenteId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 200) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error.response)
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
            case "DELETE": {
              const formData = await request.formData();
              const docenteId = formData.get("docenteId") as string;

              const response = await docenteApi
                .eliminar_docente(docenteId)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error.response)
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
        element: <Docente />,
        children: [
          {
            path: "crear",
            element: <NuevoDocente />,
          },
          {
            path: "editar/:docenteId",
            loader: ({ params }) =>
              docenteApi.obtener_docente(params.docenteId!),
            element: <EditarDocente />,
          },
          {
            path: "ver/:docenteId",
            loader: ({ params }) =>
              docenteApi.obtener_docente(params.docenteId!),
            element: <VerDocente />,
          },
          {
            path: "eliminar/:docenteId",
            loader: ({ params }) =>
              docenteApi.obtener_docente(params.docenteId!),
            element: <EliminarDocente />,
          },
        ],
      },

      /*
       * Rutas - Gestión Horarios
       */

      {
        path: "horarios",
        id: "horarioRaiz",
        loader: () => horarioApi.obtener_horarios(),
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const horario = JSON.parse(values);

              const response = await horarioApi
                .crear_horario(horario)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 201) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  console.log(error.response);
                  if (error.response) {
                    return {
                      ok: false,
                      status: error.response.status,
                      errors: error.response.data as string,
                    };
                  }
                  return { ok: false };
                });
              return response;
            }

            case "DELETE": {
              const formData = await request.formData();
              const horarioId = formData.get("horarioId") as string;

              const response = await horarioApi
                .eliminar_horario(horarioId)
                .then((response) => {
                  if (response && response.status == 204) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  console.log(error.response);
                  if (error.response) {
                    return {
                      ok: false,
                      status: error.response.status,
                      errors: error.response.data as string,
                    };
                  }
                  return { ok: false };
                });
              return response;
            }
          }
        },
        element: <Horario />,
        children: [
          {
            path: "crear",
            element: <NuevoHorario />,
          },
          {
            path: "eliminar/:horarioId",
            element: <EliminarHorario />,
          },
        ],
      },

      {
        path: "horarios/ver/:id",
        id: "VerHorarios",
        element: <VerHorario />,
        loader: async ({ params }) => {
          const BloqueApi = await horarioApi.obtener_bloques();
          const DocenteApi = await docenteApi.obtener_docentes();
          const cursoDataApi = await cursoApi.obtener_cursos();
          const ActividadDataApi = await horarioApi.actividad_bloque();
          const Horario = await horarioApi.obtener_horario(params.id);
          return {
            Horario,
            BloqueApi,
            DocenteApi,
            cursoDataApi,
            ActividadDataApi,
          };
        },
        action: async ({ request }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const bloque = JSON.parse(values);

              console.log("Bloque", bloque);

              const response = await horarioApi
                .crear_bloque(bloque)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 201) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error);
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
            case "PATCH": {
              const formData = await request.formData();
              const values = formData.get("values") as string;
              const bloque = JSON.parse(values);
              const idBloque = formData.get("idBloque");

              const response = await horarioApi
                .actualizar_bloque(bloque, idBloque)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status === 200) {
                    return { ok: true, status: response.status };
                  }
                  return { ok: true };
                })
                .catch((error: AxiosError) => {
                  if (error.response) {
                    console.log(error);
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
            case "DELETE": {
              const formData = await request.formData();
              const idBloque = formData.get("idBloque") as string;

              const response = await horarioApi
                .eliminar_bloque(idBloque)
                .then((response: AxiosResponse | void) => {
                  if (response && response.status == 204) {
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
        children: [
          {
            path: "bloque/eliminar",
            element: <EliminarBloque />,
          },
          {
            path: "bloque/:tipo",
            element: <ConfigurarHorario />,
          },
        ],
      },
    ],
  },
]);

export function AdminRutas() {
  return <RouterProvider router={router} />;
}
