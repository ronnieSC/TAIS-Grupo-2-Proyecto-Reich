import "./EditarClase.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row } from "react-bootstrap";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { ClaseEntidad, InformacionClase } from "../../../utilities/ClaseTipos";
import { useForm } from "react-hook-form";
import { dirtyValues } from "../../../utilities/utils";

const EditarClase = () => {
  const navigate = useNavigate();
  const clase = useLoaderData() as ClaseEntidad;
  const { informacion } = useRouteLoaderData("claseRaiz") as InformacionClase;

  const {
    register,
    trigger,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm<ClaseEntidad>({
    defaultValues: clase,
  });
  const submit = useSubmit();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      submit(
        { values: valuesSerialized, claseId: clase!.id! },
        {
          action: `/clase`,
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="form_actualizar_clase" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              EDITAR CLASE
            </h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Form.Group as={Row} controlId="_claNroEdit" className="mb-3">
            <Form.Label column style={{ fontWeight: "bold" }}>
              NRO. CLASE:
            </Form.Label>
            <Col lg="9">
              <Form.Control {...register("clase", {
                required: "*Requerido",
                maxLength: { value: 10, message: "*Números inferiores a 10 cifras" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "*Solo debe contener números",
                },
              })} />
              {errors.clase && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.clase?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_claTutEdit">
              <Form.Label style={{ fontWeight: "bold" }}>TUTOR:</Form.Label>
              <Form.Select {...register("tutor_codigo")}>
                {informacion?.tutores?.map((tutor, index) => (
                  <option key={index} value={tutor.id}>
                    {tutor.primer_nombre} {tutor.apellido_paterno}{" "}
                    {tutor.apellido_materno}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="_claNivEdit">
              <Form.Label style={{ fontWeight: "bold" }}>NIVEL:</Form.Label>
              <Form.Select {...register("nivel_codigo")}>
                {informacion?.niveles?.map((nivel, index) => (
                  <option key={index} value={nivel.id}>
                    {nivel.nivel.toUpperCase()}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="_claGraEdit">
              <Form.Label style={{ fontWeight: "bold" }}>GRADO:</Form.Label>
              <Form.Select {...register("grado_codigo")}>
                {informacion?.grados?.map((grado, index) => (
                  <option key={index} value={grado.id}>
                    {grado.grado}
                    {" - Grado"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonGuardar">
            <Button id="_claEditBtnSub" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button
              id="_claEditBtnCan"
              onClick={() =>
                navigate(`/clase`, {
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

export default EditarClase;
