import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "react-bootstrap"; // Reemplaza con la librería de botones que estés utilizando
import {
  ActividadEntidad,
  BloqueHorario,
  HoraIniciov1,
} from "../../../utilities/HorarioTipo";
import { DocenteEntidad } from "../../../utilities/DocenteTipos";
import { CursoEntidad } from "../../../utilities/CursoTipos";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { DAYS } from "../../../utilities/utils";

interface PrimerHorarioProps {
  idHorario: number;
  bloquesData: BloqueHorario[];
  docenteData: DocenteEntidad[];
  cursoData: CursoEntidad[];
  actividadData: ActividadEntidad[];
}

const PrimerHorario: React.FC<PrimerHorarioProps> = ({
  idHorario,
  bloquesData,
  docenteData,
  cursoData,
  actividadData,
}) => {
  const navigate = useNavigate();

  const bloques_horarios = bloquesData.filter(
    (bloque) => bloque.codigo_horario === idHorario
  );

  const renderTable = () => {
    const hours = [
      "08:00 - 08:20",
      "08:20 - 08:35",
      "08:35 - 09:30",
      "09:30 - 10:25",
      "10:25 - 10:55",
      "10:55 - 11:50",
      "11:50 - 12:40",
      "12:40 - 13:20",
      "13:20 - 14:15",
      "14:15 - 15:05",
    ];

    const getBloqueData = (
      dayIndex: number,
      hourIndex: number
    ): BloqueHorario | null => {
      const codigo_hora = HoraIniciov1[hourIndex];
      const foundBloque = bloques_horarios.find(
        (bloque) =>
          bloque.codigo_dia - 1 === dayIndex &&
          bloque.hora_inicio === codigo_hora
      );
      return foundBloque ?? null;
    };

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {DAYS.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex} className="botonCrear1">
              <td>{hour}</td>
              {DAYS.map((_, dayIndex) => (
                <td key={dayIndex}>
                  {getBloqueData(dayIndex, hourIndex) ? (
                    <div className="tdWithBorder" style={{ height: "5rem" }}>
                      <div>
                        <div className="w-70 botonEditarBloque">
                          <Button
                            className="w-55 rounded-0"
                            onClick={() =>
                              navigate("bloque/editar", {
                                state: {
                                  day: dayIndex,
                                  hour: hourIndex,
                                  idHorario: idHorario,
                                  tipoAccion: 2,
                                },
                              })
                            }
                            style={{
                              backgroundColor: "#224a73",
                              borderColor: "#1f3d55",
                              height: "10%",
                              borderBottomLeftRadius: "0rem",
                              borderBottomRightRadius: "0.3rem",
                              borderTopRightRadius: "0rem",
                              borderTopLeftRadius: "0rem",
                              padding: " 4px 4px 4px 4px",
                              borderWidth: "0px 0px 0px 0px",
                              width: "33px",
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            className="w-55"
                            onClick={() =>
                              navigate("bloque/eliminar", {
                                state: {
                                  day: dayIndex,
                                  hour: hourIndex,
                                  idHorario: idHorario,
                                },
                              })
                            }
                            style={{
                              backgroundColor: "#622425",
                              borderColor: "#4d1b1c",
                              height: "10%",
                              borderBottomLeftRadius: "0rem",
                              borderBottomRightRadius: "0.3rem",
                              borderTopRightRadius: "0rem",
                              borderTopLeftRadius: "0rem",
                              padding: " 4px 4px 4px 4px",
                              borderWidth: "0px 0px 0px 0px",
                              width: "33px",
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                      <div style={{ fontSize: "13px" }}>
                        <>
                          {actividadData?.find(
                            (actividad: any) =>
                              actividad.id ===
                              getBloqueData(dayIndex, hourIndex)
                                ?.codigo_actividad
                          )?.id === 1 ||
                          actividadData?.find(
                            (actividad: any) =>
                              actividad.id ===
                              getBloqueData(dayIndex, hourIndex)
                                ?.codigo_actividad
                          )?.id === 6 ? (
                            <p style={{ paddingTop: "22px" }}>
                              {actividadData?.find(
                                (actividad: any) =>
                                  actividad.id ===
                                  getBloqueData(dayIndex, hourIndex)
                                    ?.codigo_actividad
                              )?.actividad || "Docente no encontrado"}
                            </p>
                          ) : (
                            <p style={{ marginBottom: "0px" }}>
                              {actividadData?.find(
                                (actividad: any) =>
                                  actividad.id ===
                                  getBloqueData(dayIndex, hourIndex)
                                    ?.codigo_actividad
                              )?.actividad || "Docente no encontrado"}
                              <br />
                              {cursoData?.find(
                                (curso) =>
                                  curso.id ===
                                  getBloqueData(dayIndex, hourIndex)
                                    ?.codigo_curso
                              )?.curso || "Docente no encontrado"}

                              <br />
                              <p style={{ marginBottom: "0px" }}>
                                {docenteData?.find(
                                  (docente) =>
                                    docente.id ===
                                    getBloqueData(dayIndex, hourIndex)
                                      ?.codigo_docente
                                )?.primer_nombre
                                  ? `${
                                      docenteData?.find(
                                        (docente) =>
                                          docente.id ===
                                          getBloqueData(dayIndex, hourIndex)
                                            ?.codigo_docente
                                      )?.primer_nombre
                                    } ${
                                      docenteData?.find(
                                        (docente) =>
                                          docente.id ===
                                          getBloqueData(dayIndex, hourIndex)
                                            ?.codigo_docente
                                      )?.apellido_materno
                                    } ${
                                      docenteData?.find(
                                        (docente) =>
                                          docente.id ===
                                          getBloqueData(dayIndex, hourIndex)
                                            ?.codigo_docente
                                      )?.apellido_paterno
                                    }`
                                  : "Docente no encontrado"}
                              </p>
                            </p>
                          )}
                        </>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() =>
                        navigate("bloque/crear", {
                          state: {
                            day: dayIndex,
                            hour: hourIndex,
                            idHorario: idHorario,
                            tipoAccion: 1,
                          },
                        })
                      }
                    >
                      <IoMdAdd />
                    </Button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
};

export default PrimerHorario;
