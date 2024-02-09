import { AxiosError } from "axios";
import contratoApi from "./contrato.api";
import cabecera from "./sesion.api";

const crear_pariente = async (pariente: any) => {
  const response = await cabecera("/api/apoderados/parentescos/")
    .then(async (response) => {
      return response
        .post("/", pariente)
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

const actualizar_pariente = async (pariente: any, id: string) => {
  const response = await cabecera(`/api/apoderados/parentescos/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", pariente)
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

const obtener_parientes = async (idEstudiante: string) => {
  const { data } = await cabecera(`/api/contratos/${idEstudiante}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data.parentescos;
};

const eliminar_pariente = async (idPariente: string) => {
  const response = await cabecera(`/api/apoderados/parentescos/${idPariente}/`)
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
