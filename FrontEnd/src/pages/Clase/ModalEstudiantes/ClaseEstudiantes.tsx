import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import "./ClaseEstudiantes.css";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import {
  AgregarEstudiante,
  InformacionClase,
} from "../../../utilities/ClaseTipos";

const ClaseEstudiantes = () => {
  const navigate = useNavigate();

  const { clase } = useLoaderData() as AgregarEstudiante;
  const { informacion } = useRouteLoaderData("claseRaiz") as InformacionClase;

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            ESTUDIANTES DE LA CLASE DE{" "}
            {informacion.grados.find((item) => item.id == clase?.grado_codigo)
              ?.grado + " - GRADO"}
          </h6>
        </div>
      </ModalHeader>
      <ModalBody>
        <Form.Group as={Row}>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <Form.Group as={Row} lg="2">
                  <Form.Label
                    column
                    style={{ fontWeight: "bold" }}
                    htmlFor="_claNroVer"
                  >
                    NRO. CLASE:
                  </Form.Label>
                  <Form.Label
                    column
                    id="_claNroVer"
                    style={{ textAlign: "right" }}
                  >
                    {clase?.clase}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_claNivVer"
                    style={{ fontWeight: "bold" }}
                  >
                    TUTOR:
                  </Form.Label>
                  <Form.Label column id="_claNivVer">
                    {
                      informacion.tutores.find(
                        (item) => item.id == clase?.tutor_codigo
                      )?.primer_nombre
                    }{" "}
                    {
                      informacion.tutores.find(
                        (item) => item.id == clase?.tutor_codigo
                      )?.segundo_nombre
                    }{" "}
                    {
                      informacion.tutores.find(
                        (item) => item.id == clase?.tutor_codigo
                      )?.apellido_paterno
                    }{" "}
                    {
                      informacion.tutores.find(
                        (item) => item.id == clase?.tutor_codigo
                      )?.apellido_materno
                    }
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_claNivVer"
                    style={{ fontWeight: "bold" }}
                  >
                    NIVEL:
                  </Form.Label>
                  <Form.Label column id="_claNivVer">
                    {
                      informacion.niveles.find(
                        (item) => item.id == clase?.nivel_codigo
                      )?.nivel
                    }
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_claGraVer"
                    style={{ fontWeight: "bold" }}
                  >
                    GRADO:
                  </Form.Label>
                  <Form.Label column id="_claGraVer">
                    {
                      informacion.grados.find(
                        (item) => item.id == clase?.grado_codigo
                      )?.grado
                    }
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Form.Group>

        <ListGroup className="mt-3">
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label column lg={6}>
                <h6 style={{ fontWeight: "bold" }}>
                  ESTUDIANTES INSCRITOS EN LA CLASE:
                </h6>
              </Form.Label>
              <Col
                lg={4}
                style={{ textAlign: "right" }}
                className="BotonGuardar"
              >
                <Button onClick={() => navigate(`agregar`)}>AÑADIR</Button>
              </Col>
              <Col style={{ textAlign: "right" }} className="BotonGuardar">
                <Button onClick={() => navigate(`quitar`)}>QUITAR</Button>
              </Col>

              <Table striped responsive>
                <thead>
                  <tr>
                    <th>DOCUMENTO</th>
                    <th>NOMBRES Y APELLIDOS</th>
                  </tr>
                </thead>
                <tbody>
                  {clase.estudiantes.length > 0 ? (
                    clase.estudiantes.map((estudiante, index) => (
                      <tr key={index}>
                        <td>{`${estudiante.documento}`}</td>
                        <td>
                          {`${estudiante.primer_nombre} ${estudiante.segundo_nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="sin-resultados-mensaje">
                        NO HAY ESTUDIANTES INSCRITOS EN LA CLASE
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button
            id="_claAgrEstBtnCan"
            onClick={() =>
              navigate(`/clase`, {
                replace: true,
              })
            }
          >
            SALIR
          </Button>
        </Form.Group>
      </ModalFooter>
      <Outlet />
    </Modal>
  );
};

export default ClaseEstudiantes;
