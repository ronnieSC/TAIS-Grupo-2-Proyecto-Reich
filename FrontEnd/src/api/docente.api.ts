import { AxiosError } from "axios";
import contratoApi from "./contrato.api";
import cursoApi from "./curso.api";
import cabecera from "./sesion.api";

const crear_docente = async (docente: any) => {
  const response = await cabecera("/api/docentes/")
    .then(async (response) => {
      return response
        .post("/", docente)
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

const obtener_docentes = async () => {
  const { data } = await cabecera("/api/docentes/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_docente = async (idDocente: string) => {
  const { data } = await cabecera(`/api/docentes/${idDocente}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const actualizar_docente = async (docente: any, idDocente: string) => {
  const response = await cabecera(`/api/docentes/${idDocente}/`)
    .then(async (response) => {
      return response
        .patch("/", docente)
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

const eliminar_docente = async (idDocente: string) => {
  const response = await cabecera(`/api/docentes/${idDocente}/`)
    .then(async (response) => {
      return response
        .delete("/")
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

const obtener_datos_docente = async () => {
  const tipodocumentos = await contratoApi.obtener_tipo_documento();
  const cursos = await cursoApi.obtener_cursos();
  return { tipodocumentos, cursos };
};

const informacion_relevante = async () => {
  const docentes = await obtener_docentes();
  const informacion = await obtener_datos_docente();

  return { docentes, informacion };
};

const generar_contraseña = async (idDocente: any) => {
  const { data } = await cabecera(
    `/api/docentes/generar-password/${idDocente}/`
  )
    .then(async (response) => {
      return response
        .post("/")
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
  return data;
};

const obtener_cursos_asignados = async () => {
  const { data } = await cabecera(`/api/docentes/cursosAsignados/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_listado_alumnos = async (idListado: string) => {
  const { data } = await cabecera(`/api/docentes/listadoAlumnos/${idListado}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

export default {
  actualizar_docente,
  informacion_relevante,
  obtener_datos_docente,
  crear_docente,
  generar_contraseña,
  obtener_docentes,
  obtener_docente,
  eliminar_docente,
  obtener_cursos_asignados,
  obtener_listado_alumnos,
};
