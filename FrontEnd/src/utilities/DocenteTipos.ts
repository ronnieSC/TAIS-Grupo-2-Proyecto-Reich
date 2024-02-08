import { TipoDocumento } from "./ClaseTipos";
import { CursoEntidad } from "./CursoTipos";

export type DocenteGuardado = {
  tipo_documento: number;
  documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  fecha_nacimiento: string;
  direccion: string;
  ubigeo: string;
  telefono: string;
  telefonos_alternativos: string;
  experiencia: string;
  especialidad: string;
  codigo_cursos: number[];
};

export type DocenteEntidad = {
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
  ubigeo: string;
  telefono: string;
  telefonos_alternativos: { telefono: string }[];
  id: number;
  especialidad: string;
  experiencia: string;
  codigo_cursos: number[];
};

export interface InformacionDocente {
  docentes: DocenteEntidad[];
  informacion: InformacionDocente;
}

export interface InformacionDocente {
  tipodocumentos: TipoDocumento[];
  cursos: CursoEntidad[];
}
