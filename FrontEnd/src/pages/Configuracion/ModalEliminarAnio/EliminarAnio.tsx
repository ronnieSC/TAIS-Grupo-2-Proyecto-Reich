import {
    useLoaderData,
    useNavigate,
    useParams,
    useSubmit,
} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./EliminarAnio.css"
import { AnioAcademicoGuardado } from "../../../utilities/ConfigracionTipos";

const EliminarAnio = () => {
    const anioAcademico = useLoaderData() as AnioAcademicoGuardado;
    const navigate = useNavigate();
    const submit = useSubmit();
    let params = useParams();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
            { anioId: params.anioId! },
            {
                action: `/configuracion`,
                method: "delete",
            }
        );
    };

    return (
        <Modal show={true} >
            <Form id="form_eliminar_anio" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            ELIMINAR AÑO ACADÉMICO
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Desea Eliminar el Año Académico {anioAcademico?.AnoAcaNum}?</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancel">
                        <Button onClick={() => navigate("/configuracion", { replace: true })}>CANCELAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonEliminar">
                        <Button type="submit">
                            SI, ELIMINAR AÑO ACADÉMICO
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
export default EliminarAnio;