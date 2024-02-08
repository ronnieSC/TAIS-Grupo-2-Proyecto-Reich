import {
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form } from "react-bootstrap";
import { DocenteEntidad } from "../../../utilities/DocenteTipos";


const EliminarDocente = () => {
  const docente = useLoaderData() as DocenteEntidad;
  const navigate = useNavigate();
  const submit = useSubmit();
  let params = useParams();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submit(
      { docenteId: params.docenteId! },
      {
        action: `/docente`,
        method: "delete",
      }
    );
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_docente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR DOCENTE
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>
            ¿Seguro que desea eliminar los datos del docente{" "}
            {docente?.primer_nombre} {docente?.apellido_paterno}{" "}
            {docente?.apellido_materno}?
          </span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button onClick={() => navigate(-1)}>CANCELAR</Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button type="submit">SÍ, ELIMINAR DOCENTE</Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarDocente;
