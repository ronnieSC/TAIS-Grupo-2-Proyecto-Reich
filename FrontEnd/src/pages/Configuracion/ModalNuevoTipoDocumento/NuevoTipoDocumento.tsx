import { Modal, Button, Form, Row } from "react-bootstrap";
import {
    useNavigate,
    useSubmit
} from "react-router-dom";
import {
    TipoDocumentoGuardado
} from "../../../utilities/ConfigracionTipos";
import "./NuevoTipoDocumento.css";
import { useForm } from "react-hook-form";


const NuevoDocumentoTipo = () => {
    const navigate = useNavigate();
    const submit = useSubmit();

    const {
        register,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<TipoDocumentoGuardado>();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const valueTipoDocumento = getValues();
            const valuesSerialized = JSON.stringify(valueTipoDocumento);
            submit({ valueTipoDocumento: valuesSerialized }, {
                action: "/configuracion",
                method: "post",
            });
        }
    };

    return (
        <Modal show={true}>
            <Form id="nivelConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <Modal.Title>Nuevo Documento Tipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label
                                column
                                htmlFor="_nomTipDocConfig"
                                tyle={{ fontWeight: "bold" }}
                            >
                                Tipo de Documento
                            </Form.Label>
                            <Form.Control
                                type="text"
                                maxLength={2}
                                id="_nomTipDocConfig"
                                placeholder="Ingrese abreviatura"
                                {...register("TipDocTip", {
                                    required: "* Requerido",
                                    pattern: {
                                        value: /^[A-Z]{1,2}$/,
                                        message: "*Debe contener máximo dos letras mayúsculas",
                                    },
                                    validate: (value) => /^[A-Z]{1,2}$/.test(value) || "No debe contener números",
                                })}
                            />
                            {errors.TipDocTip && (
                                <Form.Text style={{ color: "crimson" }}>
                                    {errors.TipDocTip?.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label
                                column
                                htmlFor="_nomDesCorConfig"
                                tyle={{ fontWeight: "bold" }}
                            >
                                Descripción Corta (Abreviatura)
                            </Form.Label>
                            <Form.Control
                                type="text"
                                maxLength={20}
                                id="_nomDesCorConfig"
                                placeholder="Ingrese descripción corta (pref en Mayúsculas)"
                                {...register("TipDocDesCor", {
                                    required: "* Requerido",
                                    maxLength: {
                                        value: 20,
                                        message: "*Debe contener máximo 20 caracteres",
                                    },
                                    validate: (value) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value) || "No debe contener números ni puntos (.)",
                                })}
                            />
                            {errors.TipDocDesCor && (
                                <Form.Text style={{ color: "crimson" }}>
                                    {errors.TipDocDesCor?.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label
                                column
                                htmlFor="_nomDesLarConfig"
                                tyle={{ fontWeight: "bold" }}
                            >
                                Descripción Larga
                            </Form.Label>
                            <Form.Control
                                type="text"
                                maxLength={50}
                                id="_nomDesLarConfig"
                                placeholder="Ingrese descripción larga"
                                {...register("TipDocDesLar", {
                                    required: "* Requerido",
                                    maxLength: {
                                        value: 50,
                                        message: "*Debe contener máximo 50 caracteres",
                                    },
                                    validate: (value) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value) || "No debe contener números",
                                })}
                            />
                            {errors.TipDocDesLar && (
                                <Form.Text style={{ color: "crimson" }}>
                                    {errors.TipDocDesLar?.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
                        <Button
                            id="_tipoDocCrearBtnCan"
                            onClick={() => navigate("/configuracion", { replace: true })}
                        >CERRAR</Button>
                    </Form.Group>
                    <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
                        <Button id="_tipoDocCreanBtnSub" type="submit">
                            Guardar
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NuevoDocumentoTipo;