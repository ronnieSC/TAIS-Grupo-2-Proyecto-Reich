import { useState } from "react";
import "./VerEstudiante.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import {
  EstudianteEntidad,
  InformacionEstudiante,
} from "../../../utilities/EstudianteTipos";
import {
  Col,
  Row,
  Form,
  Image,
  ListGroup,
} from "react-bootstrap";
import Ubigeo from "ubigeos";

const VerEstudiante = () => {
  const estudiante = useLoaderData() as EstudianteEntidad;
  const { informacion } = useRouteLoaderData(
    "estudianteRaiz"
  ) as InformacionEstudiante;

  const navigate = useNavigate();
  const [imagenSeleccionada] = useState<string>(estudiante?.foto!);
  const ubigeoEst = Ubigeo.code(estudiante.ubigeo!);

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            VER ESTUDIANTE
          </h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <Row style={{ textAlign: "center" }} className="mt-2">
          <span className="label-with-margin"> DATOS DEL ESTUDIANTE</span>
        </Row>

        <Row>
          <Col>
            <ListGroup>
              <Form.Group className="mb-3 text-center">
                {imagenSeleccionada.length > 0 ? (
                  <div
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      overflow: "auto",
                      display: "inline-block",
                    }}
                  >
                    <Image
                      id="_estFotVer"
                      src={imagenSeleccionada}
                      alt="Fotografía del estudiante - Vista previa"
                      fluid
                      thumbnail
                    />
                  </div>
                ) : (
                  <p>No se encontró imagen</p>
                )}
              </Form.Group>

              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estAliVer"
                    style={{ fontWeight: "bold" }}
                  >
                    ALIAS:
                  </Form.Label>

                  <Form.Label column id="_estAliVer">
                    {estudiante?.alias
                      ? estudiante?.alias.toUpperCase()
                      : "No registrado"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estCorVer"
                    style={{ fontWeight: "bold" }}
                  >
                    CORREO ELECTRÓNICO:
                  </Form.Label>

                  <Form.Label column id="_estCorVer">
                    {estudiante?.usuario?.django_user.nombre_usuario ??
                      "No registrado"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    lg="6"
                    htmlFor="_estFecNacVer"
                    style={{ fontWeight: "bold" }}
                  >
                    FECHA NACIMIENTO:
                  </Form.Label>

                  <Form.Label column id="_estFecNacVer">
                    {estudiante?.fecha_nacimiento
                      ? new Date(estudiante?.fecha_nacimiento)
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
          </Col>

          <Col lg={6}>
            <ListGroup>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    id="_estTipDocVer"
                    style={{ fontWeight: "bold" }}
                  >
                    {
                      informacion.tipodocumentos.find(
                        (item) => item.id == estudiante?.tipo_documento
                      )?.TipDocDesCor
                    }
                    :
                  </Form.Label>

                  <Form.Label column id="_estDocVer">
                    {estudiante?.documento}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estNomVer"
                    style={{ fontWeight: "bold" }}
                  >
                    NOMBRES:
                  </Form.Label>

                  <Form.Label column id="_estNomVer">
                    {estudiante?.primer_nombre?.toUpperCase()},{" "}
                    {estudiante?.segundo_nombre?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estApeVer"
                    style={{ fontWeight: "bold" }}
                  >
                    APELLIDOS:
                  </Form.Label>
                  <Form.Label column id="_estApeVer">
                    {estudiante?.apellido_paterno?.toUpperCase()},{" "}
                    {estudiante?.apellido_materno?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estTelVer"
                    style={{ fontWeight: "bold" }}
                  >
                    TELÉFONO:
                  </Form.Label>
                  <Form.Label column id="_estTelVer">
                    {estudiante?.telefono
                      ? estudiante?.telefono
                      : "Sin registro"}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
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
                    {estudiante.ubigeo ? estudiante.ubigeo : ""}
                  </Form.Label>
                  <Form.Label style={{ textAlign: "right" }} id="_conApoDRDVer">
                    {`${ubigeoEst.region}/${ubigeoEst.province}/${ubigeoEst.district}`.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estDirVer"
                    style={{ fontWeight: "bold" }}
                  >
                    DIRECCIÓN:
                  </Form.Label>
                  <Form.Label column id="_estDirVer">
                    {estudiante?.direccion?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    htmlFor="_estColVer"
                    style={{ fontWeight: "bold" }}
                  >
                    COLEGIO DE PROCEDENCIA:
                  </Form.Label>
                  <Form.Label column id="_estColVer">
                    {estudiante?.colegio_procedencia?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group as={Row}>
                  <Form.Label
                    htmlFor="_estDesVer"
                    style={{ fontWeight: "bold" }}
                  >
                    DESTREZAS:
                  </Form.Label>
                  <Form.Label id="_estDesVer">
                    {estudiante?.destreza?.toUpperCase()}
                  </Form.Label>
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button onClick={() => navigate(-1)}>CERRAR</Button>
        </Form.Group>
      </ModalFooter>
    </Modal>
  );
};

export default VerEstudiante;
