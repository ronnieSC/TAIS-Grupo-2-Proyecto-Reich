import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row, ListGroup } from "react-bootstrap";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import {
  DocenteEntidad,
  InformacionDocente,
} from "../../../utilities/DocenteTipos";
import Ubigeo from "ubigeos";
import { useState } from "react";
import docenteApi from "../../../api/docente.api";
import { Respuesta_contraseña } from "../../../utilities/UsuarioTipos";

const VerDocente = () => {
  const navigate = useNavigate();

  const { informacion } = useRouteLoaderData(
    "docenteRaiz"
  ) as InformacionDocente;

  const docente = useLoaderData() as DocenteEntidad;
  const ubigeo = Ubigeo.code(docente?.ubigeo);
  const [nuevaContraseña, setNuevaContraseña] = useState("");

  const generar_contraseña = async () => {
    const { data } = await docenteApi.generar_contraseña(docente?.id)
    const respuesta = data as Respuesta_contraseña
    setNuevaContraseña(respuesta.password);
  };  

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            VER DOCENTE
          </h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <ListGroup>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docTipDocVer"
                style={{ fontWeight: "bold" }}
              >
                DOCUMENTO:
              </Form.Label>

              <Form.Label column id="_docTipDocVer">
                {
                  informacion?.tipodocumentos.find(
                    (item) => item.id == docente?.tipo_documento
                  )?.TipDocDesCor
                }
              </Form.Label>

              <Form.Label column id="_docDocVer">
                {docente?.documento}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label column style={{ fontWeight: "bold" }}>
                NOMBRES:
              </Form.Label>

              <Form.Label id="_docPriNomVer" column>
                {docente?.primer_nombre.toUpperCase()}
              </Form.Label>

              <Form.Label column id="_docSegNomVer">
                {docente?.segundo_nombre ? docente?.segundo_nombre.toUpperCase() : ""}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docApePatVer"
                style={{ fontWeight: "bold" }}
              >
                APELLIDOS:
              </Form.Label>
              <Form.Label column id="_docApePatVer">
                {docente?.apellido_paterno.toUpperCase()}
              </Form.Label>

              <Form.Label column id="_docApeMatVer">
                {docente?.apellido_materno.toUpperCase()}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docFecNacVer"
                style={{ fontWeight: "bold" }}
              >
                FECHA DE NACIMIENTO:
              </Form.Label>
              <Form.Label column id="_docFecNacVer">
                {docente?.fecha_nacimiento
                  ? new Date(docente?.fecha_nacimiento.replace(/-/g, '\/'))
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
                htmlFor="_docTelVer"
                style={{ fontWeight: "bold" }}
              >
                TELÉFONOS:
              </Form.Label>
              <Form.Label column id="_docTelVer">
                {`${docente?.telefono} / ${docente.telefonos_alternativos.map(
                  (item) => {
                    return item.telefono + " / ";
                  }
                )}`}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docDirVer"
                style={{ fontWeight: "bold" }}
              >
                DIRECCIÓN:
              </Form.Label>
              <Form.Label column id="_docDirVer">
                {docente?.direccion.toUpperCase()}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docUbiVer"
                style={{ fontWeight: "bold" }}
              >
                UBIGEO:
              </Form.Label>
              <Form.Label column id="_docUbiVer">
                {`${docente?.ubigeo} - ${ubigeo.region} / ${ubigeo.province} / ${ubigeo.district}`.toUpperCase()}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="mt-2">
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docExpVer"
                style={{ fontWeight: "bold" }}
              >
                EXPERIENCIA:
              </Form.Label>
              <Form.Label column id="_docExpVer">
                {docente?.experiencia
                  ? docente?.experiencia.toUpperCase()
                  : "SIN REGISTRO"}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group as={Row}>
              <Form.Label
                column
                htmlFor="_docEspVer"
                style={{ fontWeight: "bold" }}
              >
                ESPECIALIDAD:
              </Form.Label>
              <Form.Label column id="_docEspVer">
                {docente?.especialidad
                  ? docente?.especialidad.toUpperCase()
                  : "SIN REGISTRO"}
              </Form.Label>
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="mt-2">
          <ListGroup.Item>
            <Form.Group>
              <Form.Label htmlFor="_docCurVer" style={{ fontWeight: "bold" }}>
                CURSOS:
              </Form.Label>
              <Row>
                <Col>
                  {informacion?.cursos?.map((curso, index) => {
                    if (index % 2 !== 0 && index % 3 !== 0) {
                      return (
                        <div key={index}>
                          <Form.Check
                            inline
                            disabled
                            id={`_docCur${index}`}
                            type="checkbox"
                            value={curso.id}
                            defaultChecked={docente.codigo_cursos.includes(
                              curso.id
                            )}
                          />
                          <span>{curso.curso}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </Col>
                <Col>
                  {informacion?.cursos?.map((curso, index) => {
                    if (index % 2 === 0 && index % 3 !== 0) {
                      return (
                        <div key={index}>
                          <Form.Check
                            inline
                            id={`_docCur${index}`}
                            disabled
                            type="checkbox"
                            value={curso.id}
                            defaultChecked={docente.codigo_cursos.includes(
                              curso.id
                            )}
                          />
                          <span>{curso.curso}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </Col>
                <Col>
                  {informacion?.cursos?.map((curso, index) => {
                    if (index % 3 === 0) {
                      return (
                        <div key={index}>
                          <Form.Check
                            inline
                            id={`_docCur${index}`}
                            disabled
                            type="checkbox"
                            value={curso.id}
                            defaultChecked={docente.codigo_cursos.includes(
                              curso.id
                            )}
                          />
                          <span>{curso.curso}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="mt-2">
          <ListGroup.Item>
            <Form.Group>
              <Form.Label htmlFor="_docCreSes" style={{ fontWeight: "bold" }}>
                CREDENCIALES DE SESIÓN:
              </Form.Label>
              <Row>
                <Col lg={12}>
                  <Form.Label
                    className="me-5"
                    htmlFor="_docCreSesUsu"
                    style={{ fontWeight: "bold" }}
                  >
                    USUARIO:
                  </Form.Label>
                  <Form.Label>
                    {docente?.usuario?.django_user?.nombre_usuario}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label
                    className="me-5"
                    htmlFor="_docCreSesCon"
                    style={{ fontWeight: "bold" }}
                  >
                    GENERAR CONTRASEÑA:
                  </Form.Label>
                  <Form.Label>
                    {nuevaContraseña.length > 0 ? nuevaContraseña : "*"}
                  </Form.Label>

                  <Form.Group className="BotonRegresar d-flex justify-content-start">
                    <Button
                      id="_docCreSesGenCon"
                      onClick={() => generar_contraseña()}
                    >
                      GENERAR
                    </Button>
                  </Form.Group>

                  <Form.Text style={{ color: "crimson" }}>
                    *Tenga en cuenta, que cuando cierre esta ventana la
                    contraseña generada no podra verse, y debera generar una
                    nueva si se le olvida
                  </Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
      </ModalBody>

      <ModalFooter
        className="d-flex justify-content-end"
        style={{ fontWeight: "bold" }}
      >
        <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
          <Button onClick={() => navigate(-1)}>CANCELAR</Button>
        </Form.Group>
      </ModalFooter>
    </Modal>
  );
};

export default VerDocente;
