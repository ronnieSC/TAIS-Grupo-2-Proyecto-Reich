import {
  useLoaderData,
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import "./EliminarClase.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";
import { ClaseEntidad, InformacionClase } from "../../../utilities/ClaseTipos";

const EliminarClase = () => {
  const clase = useLoaderData() as ClaseEntidad;
  const { informacion } = useRouteLoaderData("claseRaiz") as InformacionClase;
  const navigate = useNavigate();

  const submit = useSubmit();
  let params = useParams();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submit(
      { claseId: params.claseId! },
      {
        action: `/clase`,
        method: "delete",
      }
    );
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_clase" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR CLASE
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>
            ¿Seguro que quieres eliminar la clase del{" "}
            {
              informacion?.grados?.find(
                (item) => item.id === clase?.grado_codigo
              )?.grado
            }
            ?
          </span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button
              id="_claEliBtnCan"
              onClick={() =>
                navigate(`/clase`, {
                  replace: true,
                })
              }
            >
              CANCELAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button id="_claEliBtnSub" type="submit">
              SI, ELIMINAR CLASE
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarClase;
