//HorarioTipo.ts
import { Grado, Nivel } from "./ClaseTipos";
import { CursoEntidad } from "./CursoTipos";
import { DocenteEntidad } from "./DocenteTipos";

export interface HorarioGuardado {
  id: number;
  codigo_nivel: number;
  codigo_grado: number;
  alarma: boolean;
  bloques: BloqueHorario[];
}

export interface HorarioNuevo {
  codigo_nivel: number;
  codigo_grado: number;
  alarma: boolean;
}

export interface InformacionHorario {
  informacion: {
    cursos: CursoEntidad[];
    Grado: Grado[];
    Nivel: Nivel[];
    Actividad: ActividadEntidad[];
  };
  Horario: HorarioGuardado[];
}

export interface InformacionBloques {
  BloqueApi: BloqueHorario[];
  DocenteApi: DocenteEntidad[];
  cursoDataApi: CursoEntidad[];
  ActividadDataApi: ActividadEntidad[];
  Horario: HorarioGuardado;
}

export interface BloqueHorario {
  codigo_docente: number;
  codigo_curso: number;
  codigo_dia: number;
  codigo_actividad: number;
  codigo_horario: number;
  hora_inicio: string;
  hora_fin: string;
  hora_id: number;
  id: number;
}

export interface BloqueHorarioNuevo {
  codigo_docente: number;
  codigo_curso: number;
  codigo_dia: number;
  codigo_actividad: number;
  codigo_horario: number;
  hora_inicio: string;
  hora_fin: string;
  hora_id: number;
}

export interface BloqueHorarioNuevoSin {
  codigo_dia: number;
  codigo_actividad: number;
  codigo_horario: number;
  hora_inicio: string;
  hora_fin: string;
  hora_id: number;
}

export interface ActividadEntidad {
  actividad: string;
  id: number;
}

export const HoraIniciov1 = [
  "08:00",
  "08:20",
  "08:35",
  "09:30",
  "10:25",
  "10:55",
  "11:50",
  "12:40",
  "13:20",
  "14:15",
];

export const HoraFinv1 = [
  "08:20",
  "08:35",
  "09:30",
  "10:25",
  "10:55",
  "11:50",
  "12:40",
  "13:20",
  "14:15",
  "15:05",
];

export const HoraIniciov2 = [
  "08:00",
  "8:20",
  "8:35",
  "9:30",
  "10:25",
  "10:50",
  "11:20",
  "11:50",
  "12:45",
  "13:35",
  "14:15",
];

export const HoraFinv2 = [
  "08:20",
  "08:35",
  "09:30",
  "10:25",
  "10:50",
  "11:20",
  "11:50",
  "12:45",
  "13:35",
  "14:15",
  "15:05",
];
