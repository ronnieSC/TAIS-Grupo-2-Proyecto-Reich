import {
    useLoaderData,
    useNavigate,
    useParams,
    useSubmit,
} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./EliminarEncargado.css"
import { EncargadoGuardado } from "../../../utilities/ConfigracionTipos";

const EliminarEncargado = () => {
    const encargado = useLoaderData() as EncargadoGuardado;
    const navigate = useNavigate();
    const submit = useSubmit();
    let params = useParams();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
            { encargadoId: params.encargadoId! },
            {
                action: `/configuracion`,
                method: "delete",
            }
        );
    };

    return (
        <Modal show={true} >
            <Form id="form_eliminar_encargado" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            ELIMINAR ENCARGADO
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Desea Eliminar el Encargado {encargado?.primer_nombre} {encargado?.apellido_paterno} {encargado?.apellido_materno}?</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancel">
                        <Button onClick={() => navigate("/configuracion", { replace: true })}>CANCELAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonEliminar">
                        <Button type="submit">
                            SI, ELIMINAR ENCARGADO
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EliminarEncargado;