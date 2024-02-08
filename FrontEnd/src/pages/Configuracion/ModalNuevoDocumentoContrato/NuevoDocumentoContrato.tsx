import { Modal, Button, Form, Row } from "react-bootstrap";
import { 
    useNavigate,
     useSubmit 
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { DocumentoContratoGuardado } from "../../../utilities/ConfigracionTipos";
import "./NuevoDocumentoContrato.css";

const NuevoDocumentoContrato = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<DocumentoContratoGuardado>();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const valueDocumentoContrato = getValues();
      const valuesSerialized = JSON.stringify(valueDocumentoContrato);
      submit(
        { valueDocumentoContrato: valuesSerialized },
        {
          action: "/configuracion",
          method: "post",
        }
      );
    }
  };

  return (
    <Modal show={true}>
      <Form id="docContrato_crear_form" onSubmit={(e) => onSubmit(e)}>
        <Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              NUEVO DOCUMENTO DE CONTRATO
            </h6>
          </div>
        </Modal.Header>
        <Modal.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label
                column
                htmlFor="_nomDocContrato"
                style={{ fontWeight: "bold" }}
              >
                Nombre del Documento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del documento"
                {...register("tipo_documento", {
                  required: "*Requerido",
                  minLength: {
                    value: 2,
                    message: "*Mínimo 2 caracteres",
                  },
                  maxLength: {
                    value: 32,
                    message: "*Máximo 32 caracteres",
                  },
                })}
              />
              {errors.tipo_documento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.tipo_documento?.message}
                </Form.Text>
              )}
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button
              id="_docContratoCrearBtnCan"
              onClick={() => navigate("/configuracion", { replace: true })}
            >
              CERRAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button id="_docContratoCrearBtnSub" type="submit">
              Guardar
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NuevoDocumentoContrato;
