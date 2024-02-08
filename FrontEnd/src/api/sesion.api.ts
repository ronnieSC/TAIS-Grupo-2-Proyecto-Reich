import axios from "axios";
import credencialesApi, { Token } from "./credenciales.api";

export const BASEURL = "https://api.colegio-reich.com";

export const obtener_tokens = () => {
  const tokenJSON = window.localStorage.getItem("tokens");
  const token: Token = JSON.parse(tokenJSON!);
  return token ?? null;
};

export const TK = obtener_tokens();
const cabecera = TK
  ? axios.create({
      baseURL: BASEURL,
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + TK.access,
        "Content-Type": "application/json",
      },
    })
  : null;

cabecera
  ? cabecera.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await credencialesApi.refrescar_credenciales();
            if (response.status === 200) {
              window.localStorage.setItem(
                "tokens",
                JSON.stringify({
                  access: response.data.access,
                  refresh: TK.refresh,
                })
              );
              originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
              return cabecera(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    )
  : null;

export default cabecera;
