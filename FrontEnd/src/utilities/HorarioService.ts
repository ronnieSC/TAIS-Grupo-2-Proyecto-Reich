// HorarioService.ts

import { InformacionHorario, ActividadEntidad, HorarioGuardado } from "./HorarioTipo";
import horarioApi from "../api/horario.api"; // Ajusta la importación según la ubicación de tu API
import cursoApi from "../api/curso.api";
import { CursoEntidad } from "./CursoTipos";
import claseApi from "../api/clase.api";
import {Grado, Nivel} from "./ClaseTipos";

export const obtenerBloquesDesdeAPI = async (): Promise<InformacionHorario> => {
  try {
    const cursos: CursoEntidad[] = await cursoApi.obtener_cursos();
    const grados: Grado[] = await claseApi.obtener_grados();
    const niveles: Nivel[] = await claseApi.obtener_niveles();
    const actividades: ActividadEntidad[] = await horarioApi.obtener_actividades();
    const horarios: HorarioGuardado[] = await horarioApi.obtener_horarios();
    return {  informacion: { cursos: cursos, Grado: grados, Nivel: niveles, Actividad: actividades },Horario: horarios };
  } catch (error) {
    console.error("Error al obtener bloques desde la API:", error);
    throw error;
  }
};