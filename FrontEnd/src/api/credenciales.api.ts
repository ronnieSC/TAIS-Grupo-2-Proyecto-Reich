import axios, { AxiosError, AxiosResponse } from "axios";
import cabecera, { BASEURL, obtener_tokens } from "./sesion.api";

export interface Token {
  access: string;
  refresh: string;
}
export interface Usuario {
  usuario: string;
  contraseña: string;
}

const obtener_credenciales = async (usuario: Usuario) => {
  const credencialesEndPoint = axios.create({
    baseURL: BASEURL + "/api/usuarios/ingresar/",
  });
  await credencialesEndPoint
    .post("/", {
      username: usuario.usuario,
      password: usuario.contraseña,
    })
    .then((response: AxiosResponse) => {
      window.localStorage.setItem("tokens", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error: AxiosError | void) => {
      throw error;
    });
};

const refrescar_credenciales = async () => {
  const tokens = obtener_tokens();
  const credencialesEndPoint = axios.create({
    baseURL: BASEURL + "/api/usuarios/refrescar/",
  });

  credencialesEndPoint.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          window.localStorage.removeItem("tokens");
          window.location.reload();
          return;
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
  );

  const response = await credencialesEndPoint.post("/", {
    refresh: tokens.refresh,
  });
  return response;
};

const obtener_datos = async () => {
  const { data } = await cabecera("/api/usuarios/perfil/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

export default {
  refrescar_credenciales,
  obtener_credenciales,
  obtener_datos,
};
