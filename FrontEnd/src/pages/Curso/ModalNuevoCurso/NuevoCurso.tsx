import "./NuevoCurso.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate, useSubmit } from "react-router-dom";
import { CursoGuardado } from "../../../utilities/CursoTipos";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const NuevoCurso = () => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CursoGuardado>();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(values);
      submit(
        { values: valuesSerialized },
        {
          action: "/curso",
          method: "post",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="docente_crear_form" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader
          className="modal-header-custom"
          style={{ fontWeight: "bold" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              NUEVO CURSO
            </h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Row} controlId="_curNom">
                <Form.Label lg="5" column style={{ fontWeight: "bold" }}>
                  NOMBRE DEL CURSO:
                </Form.Label>

                <Col lg="7">
                  <Form.Control
                    placeholder="Nombre del Curso"
                    {...register("curso", {
                      required: "*Requerido",
                      minLength: { value: 1, message: "*Nombre muy corto" },
                      maxLength: { value: 50, message: "*Nombre muy largo" },
                    })}
                  />
                  {errors.curso && (
                    <Form.Text style={{ color: "crimson" }}>
                      {errors.curso?.message}
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonGuardar">
            <Button id="_curCreartBtnSub" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button
              id="_curCrearBtnCan"
              onClick={() =>
                navigate(`/curso`, {
                  replace: true,
                })
              }
            >
              CANCELAR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default NuevoCurso;
