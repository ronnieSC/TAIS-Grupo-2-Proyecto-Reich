// AgregarAlumnos.tsx
import "./VerPariente.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { ParienteEntidad } from "../../../../utilities/ParienteTipos";
import { InformacionEstudiante } from "../../../../utilities/EstudianteTipos";
import Ubigeo from "ubigeos";

const VerPariente = () => {
  const navigate = useNavigate();

  let params = useParams();
  const parientes = useRouteLoaderData("parienteRaiz") as ParienteEntidad[];
  const pariente = parientes?.find(
    ({ apoderado }) => apoderado.id === parseInt(params.parienteId!)
  );
  const { informacion } = useRouteLoaderData(
    "estudianteRaiz"
  ) as InformacionEstudiante;

  const ubigeoApo = Ubigeo.code(pariente?.apoderado?.ubigeo!);

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">VER PARIENTE</h6>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_conApoPar"
                    style={{ fontWeight: "bold" }}
                  >
                    PARENTESCO:
                  </Form.Label>
                  <Form.Label
                    column
                    id="_conApoPar"
                    style={{ textAlign: "right" }}
                  >
                    {pariente?.parentesco.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoPrim"
                    style={{ fontWeight: "bold" }}
                  >
                    APODERADO:
                  </Form.Label>
                  <Form.Label id="_conApoPrim" style={{ textAlign: "right" }}>
                    {pariente?.apoderado.apoderado
                      ? "SÍ, ES EL APODERADO PRINCIPAL"
                      : "NO ES EL APODERADO PRINCIPAL"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    id="_conApoTipDocVer"
                    style={{ fontWeight: "bold" }}
                  >
                    {
                      informacion?.tipodocumentos?.find(
                        (item) => item.id === pariente?.apoderado.tipo_documento
                      )?.TipDocDesCor
                    }
                    :
                  </Form.Label>

                  <Form.Label
                    column
                    id="_conApoDocVer"
                    style={{ textAlign: "right" }}
                  >
                    {pariente?.apoderado.documento}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_conApoNomVer"
                    style={{ fontWeight: "bold" }}
                  >
                    NOMBRES:
                  </Form.Label>
                  <Form.Label
                    column
                    style={{ textAlign: "right" }}
                    id="_conApoNomVer"
                  >
                    {pariente?.apoderado.primer_nombre?.toUpperCase()}
                    {", "}
                    {pariente?.apoderado.segundo_nombre
                      ? pariente?.apoderado.segundo_nombre.toUpperCase()
                      : ""}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_conApoApeVer"
                    style={{ fontWeight: "bold" }}
                  >
                    APELLIDOS:
                  </Form.Label>
                  <Form.Label
                    column
                    id="_conApoApeVer"
                    style={{ textAlign: "right" }}
                  >
                    {pariente?.apoderado.apellido_paterno?.toUpperCase()}
                    {", "}
                    {pariente?.apoderado.apellido_materno?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoFecNacVer"
                    style={{ fontWeight: "bold" }}
                  >
                    FECHA DE NACIMIENTO:
                  </Form.Label>
                  <Form.Label
                    style={{ textAlign: "right" }}
                    id="_conApoFecNacVer"
                  >
                    {pariente?.apoderado.fecha_nacimiento
                      ? new Date(pariente?.apoderado.fecha_nacimiento)
                          .toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          .toUpperCase()
                      : "Sin registro".toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_conApoUbiVer"
                    style={{ fontWeight: "bold" }}
                  >
                    UBIGEO:
                  </Form.Label>
                  <Form.Label
                    column
                    style={{ textAlign: "right" }}
                    id="_conApoUbiVer"
                  >
                    {pariente?.apoderado.ubigeo
                      ? pariente?.apoderado.ubigeo
                      : ""}
                  </Form.Label>
                  <Form.Label style={{ textAlign: "right" }} id="_conApoDRDVer">
                    {`${ubigeoApo.region}/${ubigeoApo.province}/${ubigeoApo.district}`.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoDirVer"
                    style={{ fontWeight: "bold" }}
                  >
                    DIRECCIÓN:
                  </Form.Label>
                  <Form.Label style={{ textAlign: "right" }} id="_conApoDirVer">
                    {pariente?.apoderado.direccion
                      ? pariente?.apoderado.direccion?.toUpperCase()
                      : "Sin registro"}
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
                    htmlFor="_conApoTelVer"
                    column
                    style={{ fontWeight: "bold" }}
                  >
                    TELÉFONO:
                  </Form.Label>
                  <Form.Label
                    column
                    style={{ textAlign: "right" }}
                    id="_conApoTelVer"
                  >
                    {pariente?.apoderado.telefono}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoNivEstVer"
                    style={{ fontWeight: "bold" }}
                  >
                    NIVEL DE ESTUDIOS:
                  </Form.Label>
                  <Form.Label
                    style={{ textAlign: "right" }}
                    id="_conApoNivEstVer"
                  >
                    {pariente?.apoderado.nivel_estudios
                      ? pariente?.apoderado.nivel_estudios.toUpperCase()
                      : "SIN REGISTRO"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoCenVer"
                    style={{ fontWeight: "bold" }}
                  >
                    CENTRO DE TRABAJO:
                  </Form.Label>
                  <Form.Label style={{ textAlign: "right" }} id="_conApoCenVer">
                    {pariente?.apoderado.centro_trabajo
                      ? pariente?.apoderado.centro_trabajo.toUpperCase()
                      : "SIN REGISTRO"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_conApoComVer"
                    style={{ fontWeight: "bold" }}
                  >
                    COMENTARIOS:
                  </Form.Label>
                  <Form.Label style={{ textAlign: "right" }} id="_conApoComVer">
                    {pariente?.apoderado.comentarios
                      ? pariente?.apoderado.comentarios
                      : "SIN COMENTARIOS"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button
            onClick={() =>
              navigate(`/estudiante/parientes/${pariente?.contrato_codigo!}`, {
                replace: true,
              })
            }
          >
            CANCELAR
          </Button>
        </Form.Group>
      </ModalFooter>
    </Modal>
  );
};

export default VerPariente;
