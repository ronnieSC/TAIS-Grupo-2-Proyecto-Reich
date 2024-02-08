import { Modal, Button, Form, Row } from "react-bootstrap";
import {
  useNavigate,
  useSubmit
} from "react-router-dom";
import {
  GradoGuardado
} from "../../../utilities/ConfigracionTipos"
import "./NuevoGrado.css";
import { useForm } from "react-hook-form";

const NuevoGrado = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<GradoGuardado>();


  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const valuesGrado = getValues();
      const valuesSerialized = JSON.stringify(valuesGrado);
      submit(
        { valuesGrado: valuesSerialized },
        {
          action: "/configuracion",
          method: "post",
        }
      );
    }
  };

  return (

    <Modal show={true} >
      <Form id="gradoConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
        <Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              NUEVO GRADO
            </h6>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form.Group as={Row}  className="mb-3">
            <Form.Label
              column
              htmlFor="_numGradConfig"
              style={{ fontWeight: "bold" }}
            >
              Número de Grado
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa un número (1-6)"
              {...register("grado", {
                required: "*Requerido",
                minLength: { value: 1, message: "*Numero  de grado inválido" },
                maxLength: { value: 1, message: "*Numero  de grado inválido" },
                pattern: {
                  value: /[1-6]{1}/,
                  message: "*Debe contener solo número del 1 al 6",
                },
              })}
            />
            {errors.grado && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.grado?.message}
              </Form.Text>
            )}

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button
              id="_gradCrearBtnCan"
              onClick={() => navigate("/configuracion", { replace: true })}
            >
              CERRAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button id="_gradCrearBtnSub" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NuevoGrado;