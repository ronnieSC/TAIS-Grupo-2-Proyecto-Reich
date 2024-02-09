import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  BloqueHorario,
  HoraFinv1,
  HoraIniciov1,
  InformacionBloques,
} from "../../../../utilities/HorarioTipo";
import { bloqueService } from "../../../../utilities/bloque.service";
import {
  useLocation,
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";

const ConfigurarHorario2 = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const params = useParams();

  const { BloqueApi, DocenteApi, cursoDataApi, ActividadDataApi } =
    useRouteLoaderData("VerHorarios") as InformacionBloques;

  bloqueService.guardarBloqueHora(state.hour);

  const [docenteB, setDocenteB] = useState(0);
  const [cursoB, setCursoB] = useState(0);
  const [diaB, setDiaB] = useState(state.day);
  const [actividadB, setActividadB] = useState(0);
  const [horarioB, setHorarioB] = useState(0);
  const [horaInicioB, setHoraInicioB] = useState("");
  const [horaFinB, setHoraFinB] = useState("");
  const [idBloque, setIdBloque] = useState<number>();

  const [bloquesData, setBloquesData] = useState<BloqueHorario>();

  useEffect(() => {
    setDiaB(state.day + 1);
    setHorarioB(state.idHorario);
    setHoraInicioB(HoraIniciov1[state.hour]);
    setHoraFinB(HoraFinv1[state.hour]);

    const fetchData = async () => {
      if (state.tipoAccion === 2) {
        const codigo_hora = HoraIniciov1[state.hour];
        const matchingBlock = BloqueApi.find(
          (block: any) =>
            block.codigo_dia - 1 === state.day &&
            block.hora_inicio === codigo_hora &&
            block.codigo_horario === state.idHorario
        );

        if (matchingBlock) {
          setBloquesData(matchingBlock);
          setActividadB(matchingBlock.codigo_actividad);
          setDocenteB(matchingBlock.codigo_docente);
          setCursoB(matchingBlock.codigo_curso);
          setIdBloque(matchingBlock.id);
        }
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    let bloqueNuevo: any = {
      codigo_dia: diaB,
      codigo_actividad: actividadB,
      codigo_horario: horarioB,
      hora_inicio: horaInicioB,
      hora_fin: horaFinB,
      hora_id: state.hour,
      id: idBloque!,
    };

    if (actividadB !== 1 && actividadB !== 6) {
      bloqueNuevo["codigo_docente"] = docenteB;
      bloqueNuevo["codigo_curso"] = cursoB;
    }

    const valuesSerializes = JSON.stringify(bloqueNuevo);
    console.log(bloqueNuevo);

    if (params.tipo === "editar") {
      submit(
        { values: valuesSerializes, idBloque: idBloque! },
        {
          action: `/horarios/ver/${state.idHorario}`,
          method: "patch",
        }
      );
    }
    if (params.tipo === "crear") {
      submit(
        { values: valuesSerializes },
        {
          action: `/horarios/ver/${state.idHorario}`,
          method: "post",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="sm" centered>
      <Form id="form_crear_bloque" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">ANADIR ACTIVIDAD</h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form.Group className="BotonNuevoHorario">
            <Row>
              {/* Tipo de Actividad */}
              <Col md={12}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Tipo de Actividad:
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={
                    state.TipoAccion === 2
                      ? (bloquesData && bloquesData.codigo_actividad) || 0
                      : actividadB
                  }
                  onChange={({ target }) => {
                    const selectedActividad = parseInt(target.value);
                    setActividadB(selectedActividad);

                    // Si el tipo de actividad es 6 o 1, resetea los valores de curso y docente a 0
                    if (selectedActividad === 6 || selectedActividad === 1) {
                      setCursoB(0);
                      setDocenteB(0);
                    }
                  }}
                >
                  <option value={0}>SELECCIONAR</option>
                  {ActividadDataApi &&
                    ActividadDataApi.map((actividad) => (
                      <option key={actividad.id} value={actividad.id}>
                        {actividad.actividad}
                      </option>
                    ))}
                </Form.Select>
              </Col>

              {/* Curso */}
              <Col md={12}>
                <Form.Label style={{ fontWeight: "bold" }}>Curso:</Form.Label>
                <Form.Select
                  size="sm"
                  value={
                    state.TipoAccion === 2
                      ? bloquesData && bloquesData?.codigo_curso
                      : cursoB
                  }
                  onChange={({ target }) => setCursoB(parseInt(target.value))}
                  disabled={actividadB === 6 || actividadB === 1}
                >
                  <option value={0}>SELECCIONAR</option>
                  {cursoDataApi &&
                    cursoDataApi.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.curso}
                      </option>
                    ))}
                </Form.Select>
              </Col>

              {/* Docente */}
              <Col md={12}>
                <Form.Label style={{ fontWeight: "bold" }}>Docente:</Form.Label>
                <Form.Select
                  size="sm"
                  value={
                    state.tipoAccion === 2
                      ? bloquesData && bloquesData?.codigo_docente
                      : docenteB
                  }
                  onChange={({ target }) => setDocenteB(parseInt(target.value))}
                  disabled={actividadB === 6 || actividadB === 1}
                >
                  <option value={0}>SELECCIONAR</option>
                  {DocenteApi?.map((docente) => (
                    <option key={docente.id} value={docente.id}>
                      {docente.primer_nombre.concat(
                        docente.segundo_nombre
                          ? " " + docente.segundo_nombre
                          : "",
                        " " + docente.apellido_paterno,
                        " " + docente.apellido_materno
                      )}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            GUARDAR
          </Button>
          <Button
            variant="danger"
            className="close"
            onClick={() => navigate(-1)}
          >
            CERRAR
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ConfigurarHorario2;
