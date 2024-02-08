import { EstudianteEntidad } from "./EstudianteTipos";

export type ClaseGuardada = {
  tutor_codigo: number;
  nivel_codigo: number;
  grado_codigo: number;
  clase: string;
};
export type ClaseEntidad = {
  id: number;
  nivel_codigo: number;
  grado_codigo: number;
  clase: string;
  tutor_codigo: number;
  estudiantes: [
    {
      id: number;
      primer_nombre: string;
      segundo_nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      documento: string;
    }
  ];
};

export type Tutor = {
  tipo_documento: number;
  documento: string;
  apellido_paterno: string;
  apellido_materno: string;
  primer_nombre: string;
  segundo_nombre: string;
  direccion: string;
  ubigeo: string;
  fecha_nacimiento: string;
  telefono: string;
  id: number;
};

export type Estudiante_Clase = {
  estudiante_codigo: number;
  clase_codigo: number;
  semana_codigo: number;
  id: number;
};

export type Seccion = {
  seccion: string;
  id: number;
};

export type Nivel = {
  nivel: string;
  id: number;
};

export type Grado = {
  grado: string;
  id: number;
};

export type TipoDocumento = {
  id: number;
  TipDocTip: string;
  TipDocDesCor: string;
  TipDocDesLar: string;
};

export type InformacionClase = {
  clases: ClaseEntidad[];
  informacion: {
    secciones: Seccion[];
    niveles: Nivel[];
    tutores: Tutor[];
    grados: Grado[];
  };
};

export type InformacionExtraClase = {
  niveles: Nivel[];
  grados: Grado[];
  secciones: Seccion[];
  tutores: Tutor[];
};

export type AgregarEstudiante = {
  clase: ClaseEntidad;
  estudiantes: EstudianteEntidad[];
  clase_estudiantes: Estudiante_Clase[]
};
