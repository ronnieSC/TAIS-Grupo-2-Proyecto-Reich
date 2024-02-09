import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { Form } from "react-bootstrap";


const EliminarHorario =  ()=> {
    const submit = useSubmit();
    let params = useParams();
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
        { horarioId: params.horarioId! },
        {
            action: `/horarios`,
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
                    ELIMINAR HORARIO
                    </h6>
                </div>
                </ModalHeader>
                <ModalBody>
                <span>
                    ¿Seguro que quieres eliminar este Horario?
                </span>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-end">
                <Form.Group>
                    <Button id="_conEliBtnCan"
                    onClick={() => navigate(-1)}
                    >
                    CANCELAR
                    </Button>
                </Form.Group>
                <Form.Group className="BotonCancelar">
                    <Button id="_conEliBtnSub" type="submit">
                        SÍ, ELIMINAR HORARIO
                    </Button>
                </Form.Group>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EliminarHorario;