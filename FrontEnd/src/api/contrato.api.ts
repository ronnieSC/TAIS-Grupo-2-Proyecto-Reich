import { AxiosError, AxiosResponse } from "axios";
import { ContratoGuardado } from "../utilities/ContratoTipos";
import cabecera  from "./sesion.api";

const crear_contrato = async (contrato: ContratoGuardado) => {
  const response = await cabecera!
    .post("/api/contratos/", contrato)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const actualizar_contrato = async (contrato: ContratoGuardado, id: string) => {
  const response = await cabecera!
    .patch(`/api/contratos/${id}/`, contrato)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
    return response
};

const obtener_contratos = async () => {
  const { data } = await cabecera!.get("/api/contratos/");
  return data;
};

const obtener_contrato = async (idContrato: string) => {
  const { data } = await cabecera!.get(`/api/contratos/${idContrato}/`);
  return data;
};

const eliminar_contrato = async (idContrato: string) => {
  const response = await cabecera!
    .delete(`/api/contratos/${idContrato}/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("api", error);
      throw error;
    });
    return response
};

const obtener_tipo_documento = async () => {
  const { data } = await cabecera!.get("/api/personas/tipodocumentos/");
  return data;
};

const obtener_grados = async () => {
  const { data } = await cabecera!.get("/api/clases/grado/");
  return data;
};

const obtener_niveles = async () => {
  const { data } = await cabecera!.get("/api/clases/nivel/");
  return data;
};

const obtener_precios = async () => {
  const { data } = await cabecera!.get("/api/precios/");
  return data;
};

const obtener_annos_academicos = async () => {
  const { data } = await cabecera!.get("/api/fechaAcademica/anosAcademicos/");
  return data;
};

const obtener_razones = async () => {
  const { data } = await cabecera!.get("/api/precios/razon/");
  return data;
};

const obtener_responsables = async () => {
  const { data } = await cabecera!.get("/api/responsables/");
  return data;
};

const obtener_documentos = async () => {
  const { data } = await cabecera!.get("/api/contratos/documentos/");
  return data;
};

const obtener_datos_nuevocontrato = async () => {
  const tipo_doc = await obtener_tipo_documento();
  const grados = await obtener_grados();
  const niveles = await obtener_niveles();
  const annos_academicos = await obtener_annos_academicos();
  const precios = await obtener_precios();
  const razones = await obtener_razones();
  const responsables = await obtener_responsables();
  const documentos = await obtener_documentos();

  return {
    tipo_doc,
    niveles,
    grados,
    precios,
    annos_academicos,
    razones,
    responsables,
    documentos,
  };
};

const informacion_relevante = async () => {
  const contratos = await obtener_contratos();
  const informacion = await obtener_datos_nuevocontrato();

  return { contratos, informacion };
};

export default {
  informacion_relevante,
  actualizar_contrato,
  obtener_grados,
  obtener_niveles,
  obtener_tipo_documento,
  crear_contrato,
  obtener_contratos,
  obtener_contrato,
  eliminar_contrato,
  obtener_datos_nuevocontrato,
};
