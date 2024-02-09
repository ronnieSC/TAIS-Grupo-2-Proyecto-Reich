import { AxiosError } from "axios";
import { Grado, Nivel, Seccion } from "../utilities/ClaseTipos";
import claseApi from "./clase.api";
import contratoApi from "./contrato.api";
import cabecera from "./sesion.api";

const crear_curso = async (curso: any) => {
  const response = await cabecera("/api/cursos/")
    .then(async (response) => {
      return response
        .post("/", curso)
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

const actualizar_curso = async (curso: any, id: string) => {
  const response = await cabecera(`/api/cursos/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", curso)
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

const obtener_cursos = async () => {
  const { data } = await cabecera("/api/cursos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_curso = async (idCurso: string) => {
  const { data } = await cabecera(`/api/cursos/${idCurso}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const eliminar_curso = async (idCurso: string) => {
  const response = await cabecera(`/api/cursos/${idCurso}/`)
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

const obtener_datos_curso = async () => {
  const grados = await contratoApi.obtener_grados();
  const niveles = await contratoApi.obtener_niveles();
  const secciones = await claseApi.obtener_secciones();

  return { niveles, grados, secciones }; //, distritos }
};

const informacion_relevante = async () => {
  const cursos = await obtener_cursos();
  const informacion = await obtener_datos_curso();

  return { cursos, informacion };
};

export interface InformacionCurso {
  niveles: Nivel[];
  grados: Grado[];
  secciones: Seccion[];
}

export default {
  informacion_relevante,
  actualizar_curso,
  crear_curso,
  obtener_cursos,
  obtener_curso,
  eliminar_curso,
  obtener_datos_curso,
};
