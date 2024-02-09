import { Estudiantes } from "./DocenteTipos";

export interface CalificacionNueva {
  codigo_estudiante: number;
  codigo_curso: number;
  codigo_docente: number;
  nota_participacion: string;
  nota_tarea: number;
  nota_examen: number;
  fecha: string;
}

export interface CalificacionEdit extends CalificacionNueva {
  id: number;
}

export interface Calificaciones {
  codigo_estudiante: number;
  codigo_curso: number;
  codigo_docente: number;
  nota_participacion: string;
  nota_tarea: number;
  nota_examen: number;
  fecha: string;
  id: number;
  informacionEstudiante: Estudiantes[];
}
