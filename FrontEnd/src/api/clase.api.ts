import { AxiosError, AxiosResponse } from "axios";
import cabecera from "./sesion.api";

const crear_clase = async (clase: any) => {
  const response = await cabecera!
    .post("/api/clases/", clase)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
    return response
};

const actualizar_clase = async (clase: any, id: string) => {
  const response = await cabecera!
    .patch(`/api/clases/${id}/`, clase)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const agregar_estudiante = async (estudiante_clase: any) => {
  const response = await cabecera!
    .post("/api/clases/estudianteclase/", estudiante_clase)
    .then((response) => {
      return response;
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
  const { data } = await cabecera!.get("/api/clases/seccion");
  return data;
};

const obtener_clases = async () => {
  const { data } = await cabecera!.get("/api/clases/");
  return data;
};

const obtener_clase = async (idClase: string) => {
  const { data } = await cabecera!.get(`/api/clases/${idClase}/`);
  return data;
};

const eliminar_clase = async (idClase: string) => {
  const response = await cabecera!
    .delete(`/api/clases/${idClase}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const obtener_grados = async () => {
  const { data } = await cabecera!.get("/api/clases/grado/");
  return data;
};

const obtener_niveles = async () => {
  const { data } = await cabecera!.get("/api/clases/nivel/");
  return data;
};

const obtener_datos_clase = async () => {
  const grados = await obtener_grados();
  const niveles = await obtener_niveles();
  const tutores = await obtener_tutores();

  return { niveles, grados, tutores };
};

const obtener_estudiante_clase = async () => {
  const { data } = await cabecera!.get("/api/clases/estudianteclase/");
  return data;
};

const eliminar_estudiante_clase = async (idClase: any) => {
  const response = await cabecera!
    .delete(`/api/clases/estudianteclase/${idClase}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

const informacion_relevante = async () => {
  const clases = await obtener_clases();
  const informacion = await obtener_datos_clase();

  return { clases, informacion };
};

export default {
  informacion_relevante,
  actualizar_clase,
  agregar_estudiante,
  obtener_secciones,
  obtener_tutores,
  crear_clase,
  obtener_clases,
  obtener_clase,
  eliminar_clase,
  obtener_datos_clase,
  obtener_estudiante_clase,
  eliminar_estudiante_clase,
  obtener_grados,
};
