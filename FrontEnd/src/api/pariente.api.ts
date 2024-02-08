import { AxiosError, AxiosResponse } from "axios";
import contratoApi from "./contrato.api";
import cabecera  from "./sesion.api";

const crear_pariente = async (pariente: any) => {
  const response = await cabecera!
    .post("/api/apoderados/parentescos/", pariente)
    .then((response) => {
      return response;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const actualizar_pariente = async (pariente: any, id: string) => {
  const response = await cabecera!
    .patch(`/api/apoderados/parentescos/${id}/`, pariente)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const obtener_parientes = async (idEstudiante: string) => {
  const { data } = await cabecera!.get(`/api/contratos/${idEstudiante}/`);
  return data.parentescos;
};

const eliminar_pariente = async (idPariente: string) => {
  const response = await cabecera!
    .delete(`/api/apoderados/parentescos/${idPariente}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const obtener_datos_pariente = async () => {
  const tipodocumentos = await contratoApi.obtener_tipo_documento();
  return tipodocumentos;
};

export default {
  crear_pariente,
  actualizar_pariente,
  obtener_parientes,
  eliminar_pariente,
  obtener_datos_pariente,
};
