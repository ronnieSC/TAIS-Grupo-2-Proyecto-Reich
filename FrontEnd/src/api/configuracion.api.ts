import { AxiosError, AxiosResponse } from "axios";
import cabecera  from "./sesion.api";

/* --------------------- API PARA LOS NIVELES EN LA COFIGURACION --------------------- */
/* OBTENER LOS NIVELES */
const obtener_niveles = async () => {
  const { data } = await cabecera!.get("/api/clases/nivel/");
  return data;
};

/* CREAR UN NIVEL */
const crear_nivel = async (nivel: any) => {
  const response = await cabecera!
    .post("/api/clases/nivel/", nivel)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UN NIVEL */
const obtener_nivel = async (idNivel: string) => {
  const { data } = await cabecera!.get(`/api/clases/nivel/${idNivel}/`);

  return data;
};

/* ELIMINAR UN NIVEL */
const eliminar_nivel = async (idNivel: string) => {
  const response = await cabecera!
    .delete(`/api/clases/nivel/${idNivel}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* --------------------- API PARA LOS TIPOS DE DOCUMENTOS EN LA COFIGURACION --------------------- */
/* OBTENER LOS TIPOS DOCUMENTOS */
const obtener_tipoDocumentos = async () => {
  const { data } = await cabecera!.get("/api/personas/tipodocumentos/");
  return data;
};

/* CREAR UN TIPO DOCUMENTO */
const crear_tipoDocumento = async (tipoDocumento: any) => {
  const response = await cabecera!
    .post("/api/personas/tipodocumentos/", tipoDocumento)

    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ACTUALIZAR UN TIPO DOCUMENTO */
const actualizar_tipoDocumento = async (tipoDocumento: any, id: string) => {
  const response = await cabecera!
    .put(`/api/personas/tipodocumentos/${id}/`, tipoDocumento)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UN TIPO DOCUMENTO */
const obtener_tipoDocumento = async (idTipoDocumento: string) => {
  const { data } = await cabecera!.get(
    `/api/personas/tipodocumentos/${idTipoDocumento}/`
  );

  return data;
};

/* ELIMINAR UN TIPO DOCUMENTO */
const eliminar_tipoDocumento = async (idTipoDocumento: string) => {
  const response = await cabecera!
    .delete(`/api/personas/tipodocumentos/${idTipoDocumento}`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* --------------------- API PARA LAS ACTIVIDADES EN LA COFIGURACION --------------------- */
/* OBTENER LAS ACTIVIDADES */
const obtener_actividades = async () => {
  const { data } = await cabecera!.get("/api/docentes/actividad/");

  return data;
};

/* CREAR UNA ACTIVIDAD */
const crear_actividad = async (actividad: any) => {
  const response = await cabecera!
    .post("/api/docentes/actividad/", actividad)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UNA ACTIVIDAD */
const obtener_actividad = async (idActividad: string) => {
  const { data } = await cabecera!.get(`/api/docentes/actividad/${idActividad}`);
  return data;
};

/* ELIMINAR UNA ACTIVIDAD */
const eliminar_actividad = async (idActividad: string) => {
  const response = await cabecera!
    .delete(`/api/docentes/actividad/${idActividad}`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* --------------------- API PARA LOS PRECIOS EN LA COFIGURACION --------------------- */
/* OBTENER TODOS LOS PRECIOS */
const obtener_precios = async () => {
  const { data } = await cabecera!.get("/api/precios/");
  return data;
};

/* CREAR UN PRECIO */
const crear_precio = async (precio: any) => {
  const response = await cabecera!
    .post("/api/precios/", precio)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ACTUALIZAR UN PRECIO */
const actualizar_precio = async (precio: any, id: string) => {
  const response = await cabecera!
    .patch(`/api/precios/${id}/`, precio)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UN PRECIO */
const obtener_precio = async (idPrecio: string) => {
  const { data } = await cabecera!.get(`/api/precios/${idPrecio}/`);

  return data;
};

/* ELIMINAR UN PRECIO */
const eliminar_precio = async (idPrecio: string) => {
  const response = await cabecera!
    .delete(`/api/precios/${idPrecio}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* --------------------- API PARA LOS GRADOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS GRADOS */
const obtener_grados = async () => {
  const { data } = await cabecera!.get("/api/clases/grado/");
  return data;
};

/* CREAR UN NUEVO GRADO */
const crear_grado = async (grado: any) => {
  const response = await cabecera!
    .post("/api/clases/grado/", grado)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ELIMINAR UN GRADO */
const eliminar_grado = async (idGrado: string) => {
  const response = await cabecera!
    .delete(`/api/clases/grado/${idGrado}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
  return response;
};

/* OBTENER UN GRADO */
const obtener_grado = async (idGrado: string) => {
  const { data } = await cabecera!.get(`/api/clases/grado/${idGrado}/`);
  return data;
};

/* --------------------- API PARA LOS AÑOS ACADEMICOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS AÑOS ACADEMICOS */
const obtener_aniosAcademicos = async () => {
  const { data } = await cabecera!.get("/api/fechaAcademica/anosAcademicos/");
  return data;
};

/* CREAR UN NUEVO AÑO ACADEMICO */
const crear_anioAcademico = async (anioAcademico: any) => {
  const response = await cabecera!
    .post("/api/fechaAcademica/anosAcademicos/", anioAcademico)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ELIMINAR UN AÑO ACADEMICO */
const eliminar_anioAcademico = async (idAnioAcademico: string) => {
  const response = await cabecera!
    .delete(`/api/fechaAcademica/anosAcademicos/${idAnioAcademico}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UN AÑO ACADEMICO */
const obtener_anioAcademico = async (idAnioAcademico: string) => {
  const { data } = await cabecera!.get(
    `/api/fechaAcademica/anosAcademicos/${idAnioAcademico}/`
  );
  return data;
};

/* --------------------- API PARA LOS ENCARGADOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS GRADOS */
const obtener_encargados = async () => {
  const { data } = await cabecera!.get("/api/responsables/");
  return data;
};

/* CREAR UN NUEVO ENCARGADO */
const crear_encargado = async (encargado: any) => {
  const response = await cabecera!("/api/responsables/", encargado)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ELIMINAR UN ENCARGADO */
const eliminar_encargado = async (idEncargado: string) => {
  const response = await cabecera!
    .delete(`/api/responsables/${idEncargado}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ACTUALIZAR UN ENCARGADO */
const actualizar_encargado = async (encargado: any, id: string) => {
  const response = await cabecera!
    .put(`/api/responsables/${id}/`, encargado)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* OBTENER UN ENCARGADO */
const obtener_encargado = async (idEncargado: string) => {
  const { data } = await cabecera!.get(`/api/responsables/${idEncargado}/`);
  return data;
};

/* --------------------- API PARA DOCUMENTOS CONTRATO --------------------- */
/* OBTENER TODOS LOS DOCUMENTOS CONTRATO */
const obtener_contratoDocumentos = async () => {
  const { data } = await cabecera!.get("/api/contratos/documentos/");
  return data;
};

/* OBTENER UN DOCUMENTO CONTRATO */
const obtener_contratoDocumento = async (idContratoDocumento: string) => {
  const { data } = await cabecera!.get(
    `/api/contratos/documentos/${idContratoDocumento}/`
  );
  return data;
};

/* ELIMINAR UN ENCARGADO */
const eliminar_contratoDocumento = async (idContratoDocumento: string) => {
  const response = await cabecera!
    .delete(`/api/contratos/documentos/${idContratoDocumento}/`)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* ACTUALIZAR UN DOCUMENTO CONTRATO */
const actualizar_contratoDocumento = async (
  contratoDocumento: any,
  id: string
) => {
  const response = await cabecera!
    .put(`/api/contratos/documentos/${id}/`, contratoDocumento)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* CREAR UN DOCUMENTO CONTRATO */
const crear_contratoDocumento = async (documentoContrato: any) => {
  const response = await cabecera!
    .post("/api/contratos/documentos/", documentoContrato)
    .then((response) => {
      return response as AxiosResponse;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
  return response;
};

/* --------------------- API PARA RAZONES --------------------- */

/* OBTENER TODOS LAS RAZONES */
const obtener_razones = async () => {
  const { data } = await cabecera!.get("/api/precios/razon/");
  return data;
};

/* --------------------- API PARA TODA LA COFIGURACION --------------------- */

const informacion_relevante = async () => {
  const niveles = await obtener_niveles();
  const tipodocumentos = await obtener_tipoDocumentos();
  const actividades = await obtener_actividades();
  const precios = await obtener_precios();
  const grados = await obtener_grados();
  const aniosAcademicos = await obtener_aniosAcademicos();
  const encargados = await obtener_encargados();
  const razones = await obtener_razones();
  const contratoDocumentos = await obtener_contratoDocumentos();
  return {
    niveles,
    tipodocumentos,
    actividades,
    precios,
    grados,
    aniosAcademicos,
    encargados,
    razones,
    contratoDocumentos,
  };
};

export default {
  obtener_niveles,
  crear_nivel,
  obtener_nivel,
  eliminar_nivel,
  obtener_tipoDocumentos,
  crear_tipoDocumento,
  actualizar_tipoDocumento,
  obtener_tipoDocumento,
  eliminar_tipoDocumento,
  obtener_actividades,
  crear_actividad,
  obtener_actividad,
  eliminar_actividad,
  obtener_precios,
  crear_precio,
  actualizar_precio,
  obtener_precio,
  eliminar_precio,
  obtener_grados,
  crear_grado,
  eliminar_grado,
  obtener_grado,
  obtener_aniosAcademicos,
  crear_anioAcademico,
  eliminar_anioAcademico,
  obtener_anioAcademico,
  obtener_encargados,
  crear_encargado,
  eliminar_encargado,
  actualizar_encargado,
  obtener_encargado,
  obtener_contratoDocumentos,
  obtener_contratoDocumento,
  eliminar_contratoDocumento,
  actualizar_contratoDocumento,
  crear_contratoDocumento,
  obtener_razones,
  informacion_relevante,
};
