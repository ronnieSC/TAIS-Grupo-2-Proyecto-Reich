import { AxiosError, AxiosResponse } from "axios";
import contratoApi from "./contrato.api";
import cabecera  from "./sesion.api";

const crear_estudiante = async (estudiante: any) => {
  const response = await cabecera!
    .post("/api/estudiantes/", estudiante)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const actualizar_estudiante = async (estudiante: any, id: string) => {
  const response = await cabecera!
    .patch(`/api/estudiantes/${id}/`, estudiante)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const obtener_tutores = async () => {
  const { data } = await cabecera!.get("/api/docentes/");
  return data;
};

const obtener_secciones = async () => {
  const { data } = await cabecera!.get("/api/estudiantes/seccion/");
  return data;
};

const obtener_estudiantes = async () => {
  const { data } = await cabecera!.get("/api/estudiantes/");
  return data;
};

const obtener_estudiante = async (idEstudiante: string) => {
  const { data } = await cabecera!.get(`/api/estudiantes/${idEstudiante}/`);
  return data;
};

const eliminar_estudiante = async (idEstudiante: string) => {
  const response = await cabecera!
    .delete(`/api/estudiantes/${idEstudiante}/`)
    .then((response) => {
      return response as AxiosResponse;
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
