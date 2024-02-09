import { AxiosError } from "axios";
import contratoApi from "./contrato.api";
import cabecera from "./sesion.api";

const crear_estudiante = async (estudiante: any) => {
  const response = await cabecera("/api/estudiantes/")
    .then(async (response) => {
      return response
        .post("/", estudiante)
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

const actualizar_estudiante = async (estudiante: any, id: string) => {
  const response = await cabecera(`/api/estudiantes/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", estudiante)
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

const obtener_tutores = async () => {
  const { data } = await cabecera("/api/docentes/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_secciones = async () => {
  const { data } = await cabecera("/api/estudiantes/seccion/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_estudiantes = async () => {
  const { data } = await cabecera("/api/estudiantes/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_estudiante = async (idEstudiante: string) => {
  const { data } = await cabecera(`/api/estudiantes/${idEstudiante}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const eliminar_estudiante = async (idEstudiante: string) => {
  const response = await cabecera(`/api/estudiantes/${idEstudiante}/`)
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

const obtener_datos_estudiante = async () => {
  const tipodocumentos = await contratoApi.obtener_tipo_documento();
  const grados = await contratoApi.obtener_grados();
  const niveles = await contratoApi.obtener_niveles();

  return { tipodocumentos, niveles, grados };
};

const informacion_relevante = async () => {
  const estudiantes = await obtener_estudiantes();
  const informacion = await obtener_datos_estudiante();

  return { estudiantes, informacion };
};

export default {
  informacion_relevante,
  actualizar_estudiante,
  obtener_secciones,
  obtener_tutores,
  crear_estudiante,
  obtener_estudiantes,
  obtener_estudiante,
  eliminar_estudiante,
  obtener_datos_estudiante,
};
