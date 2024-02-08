import {
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import "./EliminarCurso.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CursoEntidad } from "../../../utilities/CursoTipos";
import { Form } from "react-bootstrap";

const EliminarCurso = () => {
  const curso = useLoaderData() as CursoEntidad;
  const navigate = useNavigate();

  const submit = useSubmit();
  let params = useParams();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submit(
      { cursoId: params.cursoId! },
      {
        action: `/curso`,
        method: "delete",
      }
    );
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_curso" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR CURSO
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>¿Seguro que desea eliminar el curso {curso.curso}?</span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button
              id="_curEliBtnCan"
              onClick={() =>
                navigate(`/curso`, {
                  replace: true,
                })
              }
            >
              CANCELAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button id="_curEliBtnSub" type="submit">
              SÍ, ELIMINAR CURSO
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarCurso;
