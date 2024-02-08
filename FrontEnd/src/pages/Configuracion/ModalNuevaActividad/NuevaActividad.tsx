import { Modal, Button, Form, Row } from "react-bootstrap";
import {
    useNavigate,
    useSubmit
} from "react-router-dom";
import {
    ActividadGuardada
} from "../../../utilities/ConfigracionTipos"
import "./NuevaActividad.css";
import { useForm } from "react-hook-form";

const NuevaActividad = () => {
    const navigate = useNavigate();
    const submit = useSubmit();

    const {
        register,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<ActividadGuardada>();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const valuesActividad = getValues();
            const valuesSerialized = JSON.stringify(valuesActividad);
            submit(
                { valuesActividad: valuesSerialized },
                {
                    action: "/configuracion",
                    method: "post",
                }
            );
        }
    };

    return (
        <Modal show={true}>
            <Form id="activConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            NUEVA ACTIVIDAD
                        </h6>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_nomActivConfig"
                            style={{ fontWeight: "bold" }}
                        >
                            Nombre de la Actividad
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la actividad"
                            {...register("actividad", {
                                required: "*Requerido",
                                pattern: {
                                    value: /[A-Z][a-z]/,
                                    message: "*Debe contener solamente letras",
                                },
                            })}
                        />
                        {errors.actividad && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.actividad?.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
                        <Button
                            id="_activCrearBtnCan"
                            onClick={() => navigate("/configuracion", { replace: true })}
                        >
                            CERRAR
                        </Button>
                    </Form.Group>
                    <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
                        <Button id="_activCrearBtnSub" type="submit">
                            Guardar
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NuevaActividad;