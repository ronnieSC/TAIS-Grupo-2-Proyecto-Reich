import { TipoDocumento } from "./ClaseTipos";

export type ParienteEntidad = {
  parentesco: string;
  apoderado: {
    usuario?: {
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
    tipo_documento: number;
    documento: string;
    primer_nombre: string;
    segundo_nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    fecha_nacimiento: string;
    direccion: string;
    telefono: string;
    ubigeo: string;
    nivel_estudios?: string;
    centro_trabajo?: string;
    comentarios?: string
    apoderado: boolean;
    id: number;
  };
  contrato_codigo?: number;
  id: number;
};

export type ParienteGuardado = {
  parentesco: string;
  apoderado: {
    tipo_documento: number;
    documento: string;
    primer_nombre: string;
    segundo_nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    fecha_nacimiento: string;
    direccion: string;
    telefono: string;
    ubigeo: string;
    nivel_estudios: string;
    centro_trabajo: string;
    apoderado: boolean;
    comentarios: string
  };
  contrato_codigo: number;
};

export interface InformacionPariente {
  estudiantes: ParienteEntidad[];
  informacion: {
    tipodocumentos: TipoDocumento[];
  };
}
