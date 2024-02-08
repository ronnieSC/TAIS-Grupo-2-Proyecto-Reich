import { AxiosError } from "axios";
import contratoApi from "./contrato.api";
import cursoApi from "./curso.api";
import cabecera  from "./sesion.api";

const crear_docente = async (docente: any) => {
  const response = await cabecera!
    .post("/api/docentes/", docente)
    .then((response) => {
      return response;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const obtener_docentes = async () => {
  const { data } = await cabecera!.get("/api/docentes/");
  return data;
};

const obtener_docente = async (idDocente: string) => {
  const { data } = await cabecera!.get(`/api/docentes/${idDocente}/`);
  return data;
};

const actualizar_docente = async (docente: any, idDocente: string) => {
  const response = await cabecera!
    .patch(`/api/docentes/${idDocente}/`, docente)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

const eliminar_docente = async (idDocente: string) => {
  const response = await cabecera!
    .delete(`/api/docentes/${idDocente}/`)
    .then((response) => {
      console.log(response);
      return response;
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
  const { data } = await cabecera!.post(
    `/api/docentes/generar-password/${idDocente}/`
  );
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
};
