import { Modal, Button, Form, Row } from "react-bootstrap";
import {
  useNavigate,
  useSubmit
} from "react-router-dom";
import {
  NivelGuardado
} from "../../../utilities/ConfigracionTipos";
import "./NuevoNivel.css";
import { useForm } from "react-hook-form";

const NuevoNivel = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<NivelGuardado>();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const valuesNivel = getValues();
      const valuesSerialized = JSON.stringify(valuesNivel);
      submit({ valuesNivel: valuesSerialized }, {
        action: "/configuracion",
        method: "post",
      });
    }
  };


  return (

    <Modal show={true} >
      <Form id="nivelConfig_crear_form" onSubmit={(e) => onSubmit(e)}>
        <Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              NUEVO NIVEL
            </h6>
          </div>
        </Modal.Header>

        <Modal.Body>

          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              htmlFor="_numNivConfig"
              tyle={{ fontWeight: "bold" }}
            >
              Nombre del nivel
            </Form.Label>
            <Form.Control
              data-testid="_numNivel"
              id="_numNivelConfig"
              placeholder="Ingrese el nombre del nivel"
              {...register("nivel", {
                required: "*Requerido",
                pattern: {
                  value: /[A-Z][a-z]/,
                  message: "*Debe contener solamente letras",
                },
              })}
            />
            {errors.nivel && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.nivel?.message}
              </Form.Text>
            )}
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button
              id="_nivelCrearBtnCan"
              onClick={() => navigate("/configuracion", { replace: true })}
            >
              CERRAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button id="_nivelCrearBtnSub" type="submit">
              Guardar
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>

  );
};

export default NuevoNivel;