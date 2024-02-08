import {
    useLoaderData,
    useNavigate,
    useParams,
    useSubmit,
} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./EliminarGrado.css"
import { GradoGuardado } from "../../../utilities/ConfigracionTipos";

const EliminarGrado = () => {
    const grado = useLoaderData() as GradoGuardado;
    const navigate = useNavigate();
    const submit = useSubmit();
    let params = useParams();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
            { gradoId: params.gradoId! },
            {
                action: `/configuracion`,
                method: "delete",
            }
        );
    };

    return (

        <Modal show={true} >
            <Form id="form_eliminar_grado" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            ELIMINAR GRADO
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Desea Eliminar el Grado {grado?.grado}?</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancel">
                        <Button onClick={() => navigate("/configuracion", { replace: true })}>CANCELAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonEliminar">
                        <Button type="submit">
                            SI, ELIMINAR GRADO
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>

    );
};

export default EliminarGrado;