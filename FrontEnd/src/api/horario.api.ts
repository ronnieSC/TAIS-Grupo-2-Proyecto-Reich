import { AxiosError } from "axios";
import { HorarioGuardado, HorarioNuevo } from "../utilities/HorarioTipo";
import cabecera from "./sesion.api";

/*  CREAR UN NUEVO HORARIO */
const crear_horario = async (horario: HorarioNuevo) => {
  const response = await cabecera("/api/docentes/horario/")
    .then(async (response) => {
      return response
        .post("/", horario)
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

/* ACTUALIZAR UN HORARIO */
const actuallizar_horario = async (horario: HorarioGuardado, id: number) => {
  const response = await cabecera(`/api/docentes/horario/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", horario)
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

const obtener_horarios = async () => {
  const { data } = await cabecera("/api/docentes/horario/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const obtener_bloques = async () => {
  const { data } = await cabecera("/api/docentes/bloques/")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const eliminar_horario = async (idHorario: string) => {
  const response = await cabecera(`/api/docentes/horario/${idHorario}/`)
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

const eliminar_bloque = async (idBloque: any) => {
  const response = await cabecera(`/api/docentes/bloques/${idBloque}/`)
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

const obtener_actividades = async () => {
  const { data } = await cabecera("/api/docentes/actividad")
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};
const obtener_horario = async (idHorario: any) => {
  const { data } = await cabecera(`/api/docentes/horario/${idHorario}`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const crear_bloque = async (bloque: any) => {
  const response = await cabecera("/api/docentes/bloques/")
    .then(async (response) => {
      return response
        .post("/", bloque)
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

const actividad_bloque = async () => {
  const { data } = await cabecera(`/api/docentes/actividad`)
    .then((response) => {
      return response.get("/");
    })
    .catch((error) => {
      throw error;
    });
  return data;
};

const actualizar_bloque = async (bloque: any, id: any) => {
  const response = await cabecera(`/api/docentes/bloques/${id}/`)
    .then(async (response) => {
      return response
        .patch("/", bloque)
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

export default {
  crear_horario,
  actuallizar_horario,
  obtener_horarios,
  obtener_bloques,
  eliminar_horario,
  eliminar_bloque,
  obtener_actividades,
  obtener_horario,
  crear_bloque,
  actividad_bloque,
  actualizar_bloque,
};
