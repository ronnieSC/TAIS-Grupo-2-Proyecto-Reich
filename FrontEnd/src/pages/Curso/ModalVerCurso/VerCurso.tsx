import "./VerCurso.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CursoEntidad } from "../../../utilities/CursoTipos";
import { Form, Row, Col } from "react-bootstrap";

const VerCurso = () => {
  const navigate = useNavigate();
  const curso = useLoaderData() as CursoEntidad;

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            VER CURSO
          </h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <Row>
          <Form.Group as={Col} lg="7">
            <Form.Label
              column
              lg="6"
              style={{ fontWeight: "bold" }}
              htmlFor="_curNomVer"
            >
              NOMBRE DEL CURSO:
            </Form.Label>
            <Form.Label
              column
              lg="6"
              style={{ fontSize: "20px", textAlign: "right" }}
              id="_curNomVer"
            >
              {curso.curso}
            </Form.Label>
          </Form.Group>

          <Form.Group as={Col} lg="5">
            <Form.Label
              column
              lg="6"
              style={{ fontWeight: "bold" }}
              htmlFor="_curCodVer"
            >
              CÓDIGO:
            </Form.Label>
            <Form.Label
              column
              lg="6"
              style={{ fontSize: "20px", textAlign: "right" }}
              id="_curCodVer"
            >
              {curso.id}
            </Form.Label>
          </Form.Group>
        </Row>
      </ModalBody>

      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button
            id="_curVerBtnCan"
            onClick={() =>
              navigate(`/curso`, {
                replace: true,
              })
            }
          >
            CERRAR
          </Button>
        </Form.Group>
      </ModalFooter>
    </Modal>
  );
};

export default VerCurso;
