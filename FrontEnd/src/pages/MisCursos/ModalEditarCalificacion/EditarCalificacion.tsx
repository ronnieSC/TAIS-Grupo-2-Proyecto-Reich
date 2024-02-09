import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import {
  CalificacionEdit,
  CalificacionNueva,
} from "../../../utilities/CalificacionTipos";
import { Controller, useForm } from "react-hook-form";
import { parseDateToString } from "../../../utilities/utils";
import DatePicker from "react-datepicker";
import { useState } from "react";

const EditarCalificacion = () => {
  const navigate = useNavigate();
  const calificacion = useLoaderData() as CalificacionEdit;
  const submit = useSubmit();
  let location = useLocation();

  const {
    register,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<CalificacionNueva>({
    defaultValues: calificacion,
  });

  const [fecCalEdit, setFecCalEdit] = useState(
    new Date(
      calificacion.fecha !== "" ? new Date(calificacion.fecha.replace(/-/g, '\/')) : new Date()
    )
  );

  const onsubmit = async (e: any) => {
    e.preventDefault(); //para no renderizar
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(values);      
      submit(
        { values: valuesSerialized, idCalificacion: calificacion.id },
        {
          action: `/misCursos/${location.state.codigo_bloque}/registro_Completo/${calificacion.codigo_curso}/`,
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form onSubmit={(e) => onsubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Editar</h6>
          </div>
        </ModalHeader>

        <ModalBody style={{ paddingLeft: "8%", paddingRight: "8%" }}>
          <Form.Group as={Row}>
            <Form.Label
              column
              lg={4}
              htmlFor="_calFecEdit"
              style={{
                fontWeight: "bold",
                paddingRight: "10%",
                backgroundColor: "#e9ecef",
              }}
              className="mr-2"
            >
              FECHA:
            </Form.Label>
            <Col>
              <Controller
                name="fecha"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="form-control"
                    wrapperClassName="pickers"
                    id="_calFecEdit"
                    maxDate={new Date()}
                    selected={fecCalEdit}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFecCalEdit(date!);
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
                  required: "*Requerido",
                  max: { value: 20, message: "*Calificación entre 0-20" },
                  min: { value: 0, message: "*Calificación entre 0-20" },
                  pattern: {
                    message: "*Solo números",
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
        </ModalBody>

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonCrear">
            <Button id="crear_Calificacion" type="submit">
              ACTUALIZAR
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

export default EditarCalificacion;
