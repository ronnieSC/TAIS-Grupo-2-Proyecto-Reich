import { useNavigate, useParams, useSubmit } from "react-router-dom";
import "./EliminarPariente.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";

const EliminarPariente = () => {
  const navigate = useNavigate();
  const submit = useSubmit();
  let params = useParams();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submit(
      { parienteId: params.parienteId! },
      {
        action: `/estudiante/parientes/${params.contratoId!}`,
        method: "delete",
      }
    );
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_pariente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR PARIENTE
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>¿Seguro que quieres eliminar al pariente?</span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button
              id="_estParEliBtnCan"
              onClick={() =>
                navigate(`/estudiante/parientes/${params.contratoId!}`, {
                  replace: true,
                })
              }
            >
              CANCELAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button id="_estParEliBtnSub" type="submit">
              SÍ, ELIMINAR PARIENTE
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarPariente;
