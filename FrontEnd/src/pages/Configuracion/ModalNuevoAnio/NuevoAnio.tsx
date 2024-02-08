import { Modal, Button, Form, Row } from "react-bootstrap";
import {
    useNavigate,
    useSubmit
} from "react-router-dom";
import {
    AnioAcademicoGuardado
} from "../../../utilities/ConfigracionTipos"
import "./NuevoAnio.css"
import { useForm } from "react-hook-form";

const NuevoAnioAcademico = () => {
    const navigate = useNavigate();
    const submit = useSubmit();

    const {
        register,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<AnioAcademicoGuardado>();


    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const valuesAnio = getValues();
            const valuesSerialized = JSON.stringify(valuesAnio);
            submit(
                { valuesAnio: valuesSerialized },
                {
                    action: "/configuracion",
                    method: "post",
                }
            );
        }
    };

    return (
        <>
            <Modal show={true}>
                <Form id="anioConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
                    <Modal.Header>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                                NUEVO AÑO ACADÉMICO
                            </h6>
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                htmlFor="_numAnioConfig"
                                style={{ fontWeight: "bold" }}
                            >
                                Inserte Año Académico
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserte año en números"
                                {...register("AnoAcaNum", {
                                    required: "*Requerido",
                                    minLength: { value: 4, message: "*Numero  de año inválido" },
                                    maxLength: { value: 4, message: "*Numero  de año inválido" },
                                    pattern: {
                                        value: /^(202[3-9]|20[3-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3}|[1-9][0-9]{4})$/,
                                        message: "*El año debe ser mayor a 2023",
                                    },
                                })}

                            />
                            {errors.AnoAcaNum && (
                                <Form.Text style={{ color: "crimson" }}>
                                    {errors.AnoAcaNum?.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
                            <Button
                                id="_anioCrearBtnCan"
                                onClick={() => navigate("/configuracion", { replace: true })}
                            >
                                CERRAR
                            </Button>
                        </Form.Group>
                        <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
                            <Button id="_anioCrearBtnSub" type="submit">
                                Guardar
                            </Button>
                        </Form.Group>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default NuevoAnioAcademico;