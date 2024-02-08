import { Grado, Nivel, Seccion, TipoDocumento } from "./ClaseTipos";

export type EstudianteGuardado = {
  tipo_documento: number;
  documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  fecha_nacimiento: string;
  colegio_procedencia: string;
  destreza: string;
  direccion: string;
  ubigeo: string;
  grado_codigo: number;
  nivel_codigo: number;
  telefono: string;
  alias: string;
  foto: string;
};

export type EstudianteEntidad = {
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
  colegio_procedencia: string;
  destreza: string;
  grado_codigo: number;
  nivel_codigo: number;
  direccion: string;
  ubigeo: string;
  telefono?: string;
  alias?: string;
  foto?: string;
  id: number;
  contrato_codigo?: number;
  correo: string;
};

export interface InformacionEstudiante {
  estudiantes: EstudianteEntidad[];
  informacion: {
    secciones: Seccion[];
    niveles: Nivel[];
    tipodocumentos: TipoDocumento[];
    grados: Grado[];
  };
}
