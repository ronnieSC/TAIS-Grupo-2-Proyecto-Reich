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

export type CursoAsignado = {
  codigo_bloque: number;
  curso: string;
  nivel: string;
  grado: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

export type ListaAlumnos = {
  codigo_bloque: number;
  codigo_curso: number;
  codigo_docente: number;
  curso: string;
  nivel: string;
  grado: number
  estudiantes: Estudiantes[];
}

export type Estudiantes = {
  codigo_estudiante: number;
  dni: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
}

export type Codigos = {
  codigo_estudiante: number;
}