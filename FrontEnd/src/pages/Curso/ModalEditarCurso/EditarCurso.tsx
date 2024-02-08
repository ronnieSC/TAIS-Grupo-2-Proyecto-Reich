import "./EditarCurso.css"; // Importa el archivo de estilos personalizados
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { CursoEntidad } from "../../../utilities/CursoTipos";
import { useForm } from "react-hook-form";
import { Col, Row, Form } from "react-bootstrap";
import { dirtyValues } from "../../../utilities/utils";

const EditarCurso = () => {
  const curso = useLoaderData() as CursoEntidad;
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<CursoEntidad>({
    defaultValues: curso,
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      submit(
        { values: valuesSerialized, cursoId: curso!.id! },
        {
          action: "/curso",
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="docente_crear_form" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">EDITAR CURSO</h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Row className="mb-3">
            <Col>
              <Form.Group as={Row}>
                <Label
                  lg={5}
                  htmlFor="_curNomEdit"
                  style={{ fontWeight: "bold" }}
                >
                  NOMBRE DEL CURSO:
                </Label>

                <Col lg={7}>
                  <Form.Control
                    id="_curNomEdit"
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
          <FormGroup className="BotonGuardar">
            <Button type="submit">GUARDAR</Button>
          </FormGroup>
          <FormGroup className="BotonCancelar">
            <Button onClick={() => navigate(-1)}>CERRAR</Button>
          </FormGroup>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditarCurso;
