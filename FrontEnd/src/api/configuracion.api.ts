import { AxiosError } from "axios";
import cabecera from "./sesion.api";

/* --------------------- API PARA LOS NIVELES EN LA COFIGURACION --------------------- */
/* OBTENER LOS NIVELES */
const obtener_niveles = async () => {
  const { data } = await cabecera("/api/clases/nivel/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN NIVEL */
const crear_nivel = async (nivel: any) => {
  const response = await cabecera("/api/clases/nivel/")
    .then(async (response) => {
      return response
        .post("/", nivel)
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

/* OBTENER UN NIVEL */
const obtener_nivel = async (idNivel: string) => {
  const { data } = await cabecera(`/api/clases/nivel/${idNivel}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* ELIMINAR UN NIVEL */
const eliminar_nivel = async (idNivel: string) => {
  const response = await cabecera(`/api/clases/nivel/${idNivel}/`)
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

/* --------------------- API PARA LOS TIPOS DE DOCUMENTOS EN LA COFIGURACION --------------------- */
/* OBTENER LOS TIPOS DOCUMENTOS */
const obtener_tipoDocumentos = async () => {
  const { data } = await cabecera("/api/personas/tipodocumentos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN TIPO DOCUMENTO */
const crear_tipoDocumento = async (tipoDocumento: any) => {
  const response = await cabecera("/api/personas/tipodocumentos/")
    .then(async (response) => {
      return response
        .post("/", tipoDocumento)
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

/* ACTUALIZAR UN TIPO DOCUMENTO */
const actualizar_tipoDocumento = async (tipoDocumento: any, id: string) => {
  const response = await cabecera(`/api/personas/tipodocumentos/${id}/`)
    .then(async (response) => {
      return response
        .put("/", tipoDocumento)
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

/* OBTENER UN TIPO DOCUMENTO */
const obtener_tipoDocumento = async (idTipoDocumento: string) => {
  const { data } = await cabecera(
    `/api/personas/tipodocumentos/${idTipoDocumento}/`
  )
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* ELIMINAR UN TIPO DOCUMENTO */
const eliminar_tipoDocumento = async (idTipoDocumento: string) => {
  const response = await cabecera(
    `/api/personas/tipodocumentos/${idTipoDocumento}`
  )
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

/* --------------------- API PARA LAS ACTIVIDADES EN LA COFIGURACION --------------------- */
/* OBTENER LAS ACTIVIDADES */
const obtener_actividades = async () => {
  const { data } = await cabecera("/api/docentes/actividad/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UNA ACTIVIDAD */
const crear_actividad = async (actividad: any) => {
  const response = await cabecera("/api/docentes/actividad/")
    .then(async (response) => {
      return response
        .post("/", actividad)
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

/* OBTENER UNA ACTIVIDAD */
const obtener_actividad = async (idActividad: string) => {
  const { data } = await cabecera(`/api/docentes/actividad/${idActividad}`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* ELIMINAR UNA ACTIVIDAD */
const eliminar_actividad = async (idActividad: string) => {
  const response = await cabecera(`/api/docentes/actividad/${idActividad}`)
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

/* --------------------- API PARA LOS PRECIOS EN LA COFIGURACION --------------------- */
/* OBTENER TODOS LOS PRECIOS */
const obtener_precios = async () => {
  const { data } = await cabecera("/api/precios/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN PRECIO */
const crear_precio = async (precio: any) => {
  const response = await cabecera("/api/precios/")
    .then(async (response) => {
      return response
        .post("/", precio)
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

/* ACTUALIZAR UN PRECIO */
const actualizar_precio = async (precio: any, id: string) => {
  const response = await cabecera(`/api/precios/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", precio)
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

/* OBTENER UN PRECIO */
const obtener_precio = async (idPrecio: string) => {
  const { data } = await cabecera(`/api/precios/${idPrecio}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* ELIMINAR UN PRECIO */
const eliminar_precio = async (idPrecio: string) => {
  const response = await cabecera(`/api/precios/${idPrecio}/`)
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

/* --------------------- API PARA LOS GRADOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS GRADOS */
const obtener_grados = async () => {
  const { data } = await cabecera("/api/clases/grado/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN NUEVO GRADO */
const crear_grado = async (grado: any) => {
  const response = await cabecera("/api/clases/grado/")
    .then(async (response) => {
      return response
        .post("/", grado)
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

/* ELIMINAR UN GRADO */
const eliminar_grado = async (idGrado: string) => {
  const response = await cabecera(`/api/clases/grado/${idGrado}/`)
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

/* OBTENER UN GRADO */
const obtener_grado = async (idGrado: string) => {
  const { data } = await cabecera(`/api/clases/grado/${idGrado}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* --------------------- API PARA LOS AÑOS ACADEMICOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS AÑOS ACADEMICOS */
const obtener_aniosAcademicos = async () => {
  const { data } = await cabecera("/api/fechaAcademica/anosAcademicos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN NUEVO AÑO ACADEMICO */
const crear_anioAcademico = async (anioAcademico: any) => {
  const response = await cabecera("/api/fechaAcademica/anosAcademicos/")
    .then(async (response) => {
      return response
        .post("/", anioAcademico)
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

/* ELIMINAR UN AÑO ACADEMICO */
const eliminar_anioAcademico = async (idAnioAcademico: string) => {
  const response = await cabecera(
    `/api/fechaAcademica/anosAcademicos/${idAnioAcademico}/`
  )
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

/* OBTENER UN AÑO ACADEMICO */
const obtener_anioAcademico = async (idAnioAcademico: string) => {
  const { data } = await cabecera(
    `/api/fechaAcademica/anosAcademicos/${idAnioAcademico}/`
  )
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* --------------------- API PARA LOS ENCARGADOS EN LA COFIGURACION --------------------- */

/* OBTENER TODOS LOS GRADOS */
const obtener_encargados = async () => {
  const { data } = await cabecera("/api/responsables/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* CREAR UN NUEVO ENCARGADO */
const crear_encargado = async (encargado: any) => {
  const response = await cabecera("/api/responsables/")
    .then(async (response) => {
      return response
        .post("/", encargado)
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

/* ELIMINAR UN ENCARGADO */
const eliminar_encargado = async (idEncargado: string) => {
  const response = await cabecera(`/api/responsables/${idEncargado}/`)
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

/* ACTUALIZAR UN ENCARGADO */
const actualizar_encargado = async (encargado: any, id: string) => {
  const response = await cabecera(`/api/responsables/${id}/`)
    .then(async (response) => {
      return response
        .put("/", encargado)
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

/* OBTENER UN ENCARGADO */
const obtener_encargado = async (idEncargado: string) => {
  const { data } = await cabecera(`/api/responsables/${idEncargado}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* --------------------- API PARA DOCUMENTOS CONTRATO --------------------- */
/* OBTENER TODOS LOS DOCUMENTOS CONTRATO */
const obtener_contratoDocumentos = async () => {
  const { data } = await cabecera("/api/contratos/documentos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* OBTENER UN DOCUMENTO CONTRATO */
const obtener_contratoDocumento = async (idContratoDocumento: string) => {
  const { data } = await cabecera(
    `/api/contratos/documentos/${idContratoDocumento}/`
  )
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

/* ELIMINAR UN ENCARGADO */
const eliminar_contratoDocumento = async (idContratoDocumento: string) => {
  const response = await cabecera(
    `/api/contratos/documentos/${idContratoDocumento}/`
  )
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

/* ACTUALIZAR UN DOCUMENTO CONTRATO */
const actualizar_contratoDocumento = async (
  contratoDocumento: any,
  id: string
) => {
  const response = await cabecera(`/api/contratos/documentos/${id}/`)
    .then(async (response) => {
      return response
        .put("/", contratoDocumento)
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

/* CREAR UN DOCUMENTO CONTRATO */
const crear_contratoDocumento = async (documentoContrato: any) => {
  const response = await cabecera("/api/contratos/documentos/")
    .then(async (response) => {
      return response
        .post("/", documentoContrato)
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

/* --------------------- API PARA RAZONES --------------------- */

/* OBTENER TODOS LAS RAZONES */
const obtener_razones = async () => {
  const { data } = await cabecera("/api/precios/razon/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
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
