import { Modal, Button, Form, Row } from "react-bootstrap";
import { 
    useLoaderData,
    useNavigate,
     useSubmit 
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { DocumentoContratoGuardado } from "../../../utilities/ConfigracionTipos";
import "./EditarDocumentoContrato.css";

const EditarDocumentoContrato = () => {
  const documento = useLoaderData() as DocumentoContratoGuardado;
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<DocumentoContratoGuardado>({
    defaultValues: documento,
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const valuesContratoDocumento = getValues();
      const valuesSerialized = JSON.stringify(valuesContratoDocumento);
      submit(
        { valuesContratoDocumento: valuesSerialized, documentoContratoId: documento!.id!},
        {
          action: "/configuracion",
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal show={true}>
      <Form id="docContrato_editar_form" onSubmit={(e) => onSubmit(e)}>
        <Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              EDITAR DOCUMENTO CONTRATO
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
                defaultValue={documento?.tipo_documento}
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
              id="_docContratoEditarBtnCan"
              onClick={() => navigate("/configuracion", { replace: true })}
            >
              CERRAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button id="_docContratoEditarBtnSub" type="submit">
              Guardar
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditarDocumentoContrato;
