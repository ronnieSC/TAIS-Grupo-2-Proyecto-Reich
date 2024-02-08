import { Modal, Button, Form, Row } from "react-bootstrap";
import {
    useLoaderData,
    useNavigate,
    useSubmit
} from "react-router-dom";
import {
    EncargadoGuardado
} from "../../../utilities/ConfigracionTipos"; // Ajusta la importación según tus necesidades
import { useForm } from "react-hook-form";

const EditarEncargado = () => {
    const encargado = useLoaderData() as EncargadoGuardado;
    const navigate = useNavigate();
    const submit = useSubmit();

    const {
        register,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<EncargadoGuardado>({
        defaultValues: encargado,
    }); // Ajusta el tipo según tus necesidades

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const valuesEncargado = getValues();
            const valuesSerialized = JSON.stringify(valuesEncargado);
            submit(
                { valuesEncargado: valuesSerialized, encargadoId: encargado!.id! },
                {
                    action: "/configuracion",
                    method: "patch",
                }
            );
        }
    };

    return (
        <Modal show={true}>
            <Form id="encargConfig_editar_form" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            EDITAR ENCARGADO
                        </h6>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_nomEncargConfig"
                            style={{ fontWeight: "bold" }}
                        >
                            Primer Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={encargado?.primer_nombre}
                            placeholder="Ingrese el primer nombre"
                            {...register("primer_nombre", {
                                required: "*Requerido",
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                                    message: "*Debe contener solamente letras",
                                },
                            })}
                        />
                        {errors.primer_nombre && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.primer_nombre?.message}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_segNomEncargConfig"
                            style={{ fontWeight: "bold" }}
                        >
                            Segundo Nombre (opcional)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={encargado?.segundo_nombre}
                            placeholder="Ingrese el segundo nombre (opcional)"
                            {...register("segundo_nombre", {
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/,
                                    message: "*Debe contener solamente letras",
                                },
                            })}
                        />
                        {errors.segundo_nombre && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.segundo_nombre?.message}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_apePatEncargConfig"
                            style={{ fontWeight: "bold" }}
                        >
                            Apellido Paterno
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={encargado?.apellido_paterno}
                            placeholder="Ingrese el apellido paterno"
                            {...register("apellido_paterno", {
                                required: "*Requerido",
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                                    message: "*Debe contener solamente letras",
                                },
                            })}
                        />
                        {errors.apellido_paterno && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.apellido_paterno?.message}
                            </Form.Text>
                        )}

                        <Form.Label
                            column
                            htmlFor="_apeMatEncargConfig"
                            style={{ fontWeight: "bold" }}
                        >
                            Apellido Materno
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={encargado?.apellido_materno}
                            placeholder="Ingrese el apellido materno"
                            {...register("apellido_materno", {
                                required: "*Requerido",
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                                    message: "*Debe contener solamente letras",
                                },
                            })}
                        />
                        {errors.apellido_materno && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.apellido_materno?.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
                        <Button
                            id="_encargEditarBtnCan"
                            onClick={() => navigate("/configuracion", { replace: true })}
                        >
                            CERRAR
                        </Button>
                    </Form.Group>
                    <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
                        <Button id="_encargEditarBtnSub" type="submit">
                            GUARDAR
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditarEncargado;