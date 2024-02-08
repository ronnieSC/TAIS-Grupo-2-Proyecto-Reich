import {
    useLoaderData,
    useNavigate,
    useParams,
    useSubmit,
} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./EliminarTipoDocumento.css";
import { TipoDocumentoGuardado } from "../../../utilities/ConfigracionTipos";

const EliminarTipoDocumento = () => {
    const tipoDocumento = useLoaderData() as TipoDocumentoGuardado;
    const navigate = useNavigate();
    const submit = useSubmit();
    let params = useParams();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        submit(
            { tipoDocId: params.tipoDocId! },
            {
                action: `/configuracion`,
                method: "delete",
            }
        );
    };

    return (
        <Modal show={true} >
            <Form id="form_eliminar_tipoDoc" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            ELIMINAR TIPO DE DOCUMENTO
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Desea Eliminar el Documento {tipoDocumento?.TipDocDesCor}?</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancel">
                        <Button onClick={() => navigate("/configuracion", { replace: true })}>CANCELAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonEliminar">
                        <Button type="submit">
                            SI, ELIMINAR TIPO DE DOCUMENTO
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>

    );
};

export default EliminarTipoDocumento;