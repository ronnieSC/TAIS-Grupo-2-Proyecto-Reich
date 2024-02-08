import { Modal, Button, Form, Row } from "react-bootstrap";
import {
    useNavigate,
    useRouteLoaderData,
    useSubmit
} from "react-router-dom";
import {  PrecioGuardado, ConfiguracionEntidad} from "../../../utilities/ConfigracionTipos";
import "./NuevoPrecio.css";
import { useForm } from "react-hook-form";

const NuevoPrecio = () => {
    const {aniosAcademicos, niveles, razones} = useRouteLoaderData("configuracionRaiz") as ConfiguracionEntidad;
    const navigate = useNavigate();
    const submit = useSubmit();

    const {
        register,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<PrecioGuardado>(); // Ajusta el tipo según tus necesidades

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const valuesPrecio = getValues();
            const valuesSerialized = JSON.stringify(valuesPrecio);
            submit(
                { valuesPrecio: valuesSerialized },
                {
                    action: "/configuracion", // Ajusta la acción según tu API
                    method: "post",
                }
            );
        }
    };

    return (
        <Modal show={true}>
            <Form id="precioConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
                <Modal.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                            NUEVO PRECIO
                        </h6>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_anoCodigo"
                            style={{ fontWeight: "bold" }}
                        >
                            Año
                        </Form.Label>
                        {/* Aquí deberías mostrar los últimos 5 años en un select */}
                        <Form.Control
                            as="select"
                            {...register("ano_codigo", {
                                required: "*Requerido",
                            })}
                        >
                            {aniosAcademicos && aniosAcademicos.map((anio) => (
                                <option key={anio.id} value={anio.id}>
                                    {anio.AnoAcaNum}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_nivelCodigo"
                            style={{ fontWeight: "bold" }}
                        >
                            Nivel
                        </Form.Label>
                        <Form.Control
                            as="select"
                            {...register("nivel_codigo", {
                                required: "*Requerido",
                            })}
                        >
                            {niveles && niveles.map((nivel) => (
                                <option key={nivel.id} value={nivel.id}>
                                    {nivel.nivel}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Label
                            column
                            htmlFor="_razonCodigo"
                            style={{ fontWeight: "bold" }}
                        >
                            Razón
                        </Form.Label>
                        <Form.Control
                            as="select"
                            {...register("razon_codigo", {
                                required: "*Requerido",
                            })}
                        >
                            {razones && razones.map((razon) => (
                                <option key={razon.id} value={razon.id}>
                                    {razon.razon}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label
                            column
                            htmlFor="_monto"
                            style={{ fontWeight: "bold" }}
                        >
                            Monto
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej 175.50  o 125 (no use . )"
                            {...register("monto", {
                                required: "*Requerido",
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                    message: "*Formato de monto inválido (Ej. 100.00)",
                                },
                            })}
                        />
                        {errors.monto && (
                            <Form.Text style={{ color: "crimson" }}>
                                {errors.monto?.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
                        <Button
                            id="_precioCrearBtnCan"
                            onClick={() => navigate("/configuracion", { replace: true })}
                        >
                            CERRAR
                        </Button>
                    </Form.Group>
                    <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
                        <Button id="_precioCrearBtnSub" type="submit">
                            GUARDAR
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NuevoPrecio;