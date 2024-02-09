import { AxiosError, AxiosResponse } from "axios";
import { ContratoGuardado } from "../utilities/ContratoTipos";
import cabecera from "./sesion.api";

const crear_contrato = async (contrato: ContratoGuardado) => {
  const response = await cabecera("/api/contratos/")
    .then(async (response) => {
      return response
        .post("/", contrato)
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

const actualizar_contrato = async (contrato: ContratoGuardado, id: string) => {
  const response = await cabecera(`/api/contratos/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", contrato)
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

const obtener_contratos = async () => {
  const { data } = await cabecera("/api/contratos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_contrato = async (idContrato: string) => {
  const { data } = await cabecera(`/api/contratos/${idContrato}/`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const eliminar_contrato = async (idContrato: string) => {
  const response = await cabecera(`/api/contratos/${idContrato}/`)
    .then((response) => {
      return response.delete("/");
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

const obtener_tipo_documento = async () => {
  const { data } = await cabecera("/api/personas/tipodocumentos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

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

const obtener_annos_academicos = async () => {
  const { data } = await cabecera("/api/fechaAcademica/anosAcademicos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

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

const obtener_responsables = async () => {
  const { data } = await cabecera("/api/responsables/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_documentos = async () => {
  const { data } = await cabecera("/api/contratos/documentos/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_contrato_informe = async (idContrato: any) => {
  const response = await cabecera(`/api/contratos/reporte/${idContrato}/`)
    .then((response) => {
      return response
        .get("/", {
          responseType: "blob",
        })
        .then((response: AxiosResponse) => {
          let url = window.URL.createObjectURL(new Blob([response.data]));
          //const contentDisposition = response.headers['content-disposition'];
          //const filename = contentDisposition.split('filename=')[1].trim();
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "contrato.pdf");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          return error;
        });
    })
    .catch((error) => {
      throw error;
    });

  return response;
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
  obtener_contrato_informe,
};
