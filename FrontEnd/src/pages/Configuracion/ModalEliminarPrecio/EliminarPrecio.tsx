import {
    useNavigate,
    useParams,
    useSubmit,
} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./EliminarPrecio.css";

const EliminarPrecio = () => {

    const navigate = useNavigate();
    const submit = useSubmit();
    let params = useParams();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
            { precioId: params.precioId! },
            {
                action: `/configuracion`,
                method: "delete",
            }
        );
    };




    return (
        <Modal show={true} >
            <Form id="form_eliminar_precio" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            ELIMINAR PRECIO
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Estás seguro que deseas eliminar este precio?</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancel">
                        <Button onClick={() => navigate("/configuracion", { replace: true })}>CANCELAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonEliminar">
                        <Button type="submit">
                            SÍ, ELIMINAR PRECIO
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal >
    );
};

export default EliminarPrecio;