export type Usuario = {
  usuario: {
    rol: {
      nombre: string;
      descripcion: string;
      id: number;
    };
    django_user: {
      nombre_usuario: string;
      ultima_sesion: string;
      fecha_registro: string;
      id: number;
    };
    id: number;
  };
};

export interface Respuesta_contraseña {
  detail: string,
  password: string
}

export interface Respuesta_Error_Credenciales {
  detail: string
}