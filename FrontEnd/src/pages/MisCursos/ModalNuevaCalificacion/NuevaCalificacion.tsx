import {
  useLocation,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import "./NuevaCalificacion.css";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Table, Row, Col } from "react-bootstrap";
import { CalificacionNueva } from "../../../utilities/CalificacionTipos";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { parseDateToString } from "../../../utilities/utils";
import DatePicker from "react-datepicker";

const NuevaCalificacion = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();

  const submit = useSubmit();

  const obtenerFechaActual = () => {
    const now = new Date();
    const dia = now.getDate().toString();
    const mes = (now.getMonth() + 1).toString(); // Se suma 1 porque en JavaScript los meses van de 0 a 11
    const anio = now.getFullYear();

    const fechaActualFormateada = `${anio}-${mes}-${dia}`;

    return fechaActualFormateada;
  };

  const [fecCal, setFecCal] = useState(new Date());

  const {
    register,
    trigger,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<CalificacionNueva>({
    defaultValues: { fecha: obtenerFechaActual() },
  });

  const onsubmit = async (e: any) => {
    e.preventDefault(); //para no renderizar
    const isValid = await trigger();
    if (isValid) {
      setValue("codigo_curso", state.idCurso);
      setValue("codigo_estudiante", parseInt(params!.idEstudiante!));
      setValue("codigo_docente", state.idDocente);
      const values = getValues();
      const valuesSerialized = JSON.stringify(values);
      submit(
        { values: valuesSerialized },
        {
          action: `/misCursos/${params.idBloque}`,
          method: "post",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form onSubmit={(e) => onsubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Nueva Calificacion</h6>
          </div>
        </ModalHeader>

        <ModalBody style={{ paddingLeft: "8%", paddingRight: "8%" }}>
          <Form.Group as={Row}>
            <Form.Label
              column
              lg={4}
              htmlFor="_calNueFec"
              style={{
                fontWeight: "bold",
                paddingRight: "10%",
                backgroundColor: "#e9ecef",
              }}
              className="mr-2"
            >
              Fecha:
            </Form.Label>
            <Col>
              <Controller
                name="fecha"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="form-control"
                    wrapperClassName="pickers"
                    id="_calNueFec"
                    maxDate={new Date()}
                    selected={fecCal}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFecCal(date!);
                      field.onChange(parseDateToString(date!));
                    }}
                  />
                )}
                rules={{
                  required: "*Requerido",
                }}
              />
              {errors.fecha && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.fecha?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Row className="pt-3">
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>
                Participación en Clase :
              </Form.Label>
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>Tarea : </Form.Label>
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>Examen : </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                style={{ width: "50%" }}
                type="text"
                {...register("nota_participacion", {
                  required: "Requerido",
                  max: { value: 20, message: "*Calificación entre 0-20" },
                  min: { value: 0, message: "*Calificación entre 0-20" },
                  pattern: {
                    message: "Solo números",
                    value: /^-?\d+(\.\d+)?$/,
                  },
                })}
              />{" "}
              {errors.nota_participacion && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.nota_participacion?.message}
                </Form.Text>
              )}
            </Col>
            <Col>
              <Form.Control
                style={{ width: "50%" }}
                type="text"
                {...register("nota_tarea", {
                  required: "Requerido",
                  max: { value: 20, message: "*Calificación entre 0-20" },
                  min: { value: 0, message: "*Calificación entre 0-20" },
                  pattern: {
                    message: "Solo números",
                    value: /^-?\d+(\.\d+)?$/,
                  },
                })}
              />
              {errors.nota_tarea && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.nota_tarea?.message}
                </Form.Text>
              )}
            </Col>
            <Col style={{ width: "auto" }}>
              <Form.Control
                style={{ width: "50%" }}
                type="text"
                {...register("nota_examen", {
                  required: "Requerido",
                  max: { value: 20, message: "*Calificación entre 0-20" },
                  min: { value: 0, message: "*Calificación entre 0-20" },
                  pattern: {
                    message: "Solo números",
                    value: /^-?\d+(\.\d+)?$/,
                  },
                })}
              />
              {errors.nota_examen && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.nota_examen?.message}
                </Form.Text>
              )}
            </Col>
          </Row>

          <Row className="pt-3">
            <Col>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th
                      className="texto-centrado"
                      style={{ backgroundColor: "#e9ecef" }}
                    >
                      Nota P. en Clase
                    </th>
                    <th
                      className="texto-centrado"
                      style={{ backgroundColor: "#e9ecef" }}
                    >
                      Nota Tarea
                    </th>
                    <th
                      className="texto-centrado"
                      style={{ backgroundColor: "#e9ecef" }}
                    >
                      Nota Examen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="texto-centrado">
                      {getValues("nota_participacion")}
                    </td>
                    <td className="texto-centrado">
                      {getValues("nota_tarea")}
                    </td>
                    <td className="texto-centrado">
                      {getValues("nota_examen")}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonCrear">
            <Button id="crear_Calificacion" type="submit">
              REGISTRAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button onClick={() => navigate(-1)}>CERRAR</Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default NuevaCalificacion;
