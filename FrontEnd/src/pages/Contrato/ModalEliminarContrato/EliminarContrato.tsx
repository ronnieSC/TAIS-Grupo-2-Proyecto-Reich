import "./EliminarContrato.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { ContratoEntidad } from "../../../utilities/ContratoTipos";
import { Form } from "react-bootstrap";

const EliminarContrato = () => {
  const contrato = useLoaderData() as ContratoEntidad;
  const navigate = useNavigate();
  const submit = useSubmit();
  let params = useParams();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submit(
      { contratoId: params.contratoId! },
      {
        action: `/contrato`,
        method: "delete",
      }
    );
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_contrato" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR CONTRATO
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>
            ¿Seguro que quieres eliminar el contrato y matrícula de{" "}
            {contrato.estudiante.primer_nombre}{" "}
            {contrato.estudiante.apellido_paterno} ?
          </span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button id="_conEliBtnCan" onClick={() => navigate(-1)}>
              CANCELAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button id="_conEliBtnSub" type="submit">
              SÍ, ELIMINAR CONTRATO
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarContrato;
