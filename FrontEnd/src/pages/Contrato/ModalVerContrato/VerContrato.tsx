import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./VerContrato.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  ContratoEntidad,
  InformacionContrato,
} from "../../../utilities/ContratoTipos";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { Col, Row, Form, Image, ListGroup } from "react-bootstrap";
import Ubigeo from "ubigeos";

const VerContrato = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);

  const contrato = useLoaderData() as ContratoEntidad;
  const { informacion } = useRouteLoaderData(
    "contratoRaiz"
  ) as InformacionContrato;
  const [imagenSeleccionada] = useState<string>(contrato?.estudiante?.foto!);

  const apoderado = contrato?.parentescos?.find(
    (item) => item.apoderado.apoderado
  );
  const ubigeoApo = Ubigeo.code(apoderado?.apoderado?.ubigeo!);

  const handleTabSelect = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            VER INFORMACIÓN DEL CONTRATO
          </h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
          <TabList className="custom-tab-list">
            <Tab
              className={`custom-tab ${
                activeTab === 0 ? "custom-tab--selected" : ""
              }`}
            >
              Archivos Ingresados por el Estudiante
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 1 ? "custom-tab--selected" : ""
              }`}
            >
              Datos del Estudiante
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 2 ? "custom-tab--selected" : ""
              }`}
            >
              Datos del Apoderado
            </Tab>
          </TabList>

          <TabPanel>
            <Row className="m-3">
              <Col>
                <ListGroup>
                  {informacion?.documentos?.map((documento, index) => {
                    if (index % 2 === 0) {
                      return (
                        <ListGroup.Item key={index}>
                          <Form.Check
                            className="m-2"
                            disabled
                            inline
                            id={`_conApoDocCon${index}`}
                            type="checkbox"
                            defaultChecked={
                              contrato.documentos.find(
                                (item) => documento.id === item.id
                              )?.entregado
                            }
                          />
                          <span>{documento.tipo_documento}</span>
                        </ListGroup.Item>
                      );
                    }
                    return null;
                  })}
                </ListGroup>
              </Col>

              <Col>
                <ListGroup>
                  {informacion?.documentos?.map((documento, index) => {
                    if (index % 2 !== 0) {
                      return (
                        <ListGroup.Item key={index}>
                          <Form.Check
                            className="m-2"
                            disabled
                            inline
                            id={`_conApoDocCon${index}`}
                            type="checkbox"
                            defaultChecked={
                              contrato.documentos.find(
                                (item) => documento.id === item.id
                              )?.entregado
                            }
                          />
                          <span>{documento.tipo_documento}</span>
                        </ListGroup.Item>
                      );
                    }
                    return null;
                  })}
                </ListGroup>
              </Col>
            </Row>
          </TabPanel>

          {/*--------------------------------PANEL ESTUDIANTE--------------------------------------------------*/}

          <TabPanel>
            <Row style={{ textAlign: "center" }} className="mt-3">
              <span className="label-with-margin"> DATOS DEL ESTUDIANTE</span>
            </Row>

            <Row className="ms-3 me-3">
              <Col>
                <Form.Group className="mb-3">
                  {imagenSeleccionada.length > 0 ? (
                    <Image
                      id="_conEstFotVer"
                      src={imagenSeleccionada}
                      alt="Fotografía del estudiante"
                      thumbnail
                    />
                  ) : (
                    <p>No se encontró imagen</p>
                  )}
                </Form.Group>

                <ListGroup>
                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstAliVer"
                        style={{ fontWeight: "bold" }}
                      >
                        ALIAS:
                      </Form.Label>

                      <Form.Label column id="_conEstAliVer">
                        {contrato?.estudiante?.alias
                          ? contrato?.estudiante?.alias
                          : "No registrado"}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        lg="6"
                        htmlFor="_conEstCorVer"
                        style={{ fontWeight: "bold" }}
                      >
                        CORREO ELECTRÓNICO:
                      </Form.Label>

                      <Form.Label column id="_conEstCorVer">
                        {contrato?.estudiante?.correo
                          ? contrato?.estudiante?.correo
                          : "No registrado"}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        lg="6"
                        htmlFor="_conEstFecNacVer"
                        style={{ fontWeight: "bold" }}
                      >
                        FECHA NACIMIENTO:
                      </Form.Label>

                      <Form.Label column id="_conEstFecNacVer">
                        {contrato?.estudiante?.fecha_nacimiento
                          ? new Date(contrato?.estudiante?.fecha_nacimiento)
                              .toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                              .toUpperCase()
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
                        column
                        id="_conEstTipDocVer"
                        style={{ fontWeight: "bold" }}
                      >
                        {
                          informacion.tipo_doc.find(
                            (item) =>
                              item.id == contrato?.estudiante?.tipo_documento
                          )?.TipDocDesCor
                        }
                        :
                      </Form.Label>

                      <Form.Label column id="_conEstDocVer">
                        {contrato?.estudiante?.documento}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstNomVer"
                        style={{ fontWeight: "bold" }}
                      >
                        NOMBRES:
                      </Form.Label>

                      <Form.Label column id="_conEstNomVer">
                        {contrato?.estudiante?.primer_nombre?.toUpperCase()},{" "}
                        {contrato?.estudiante?.segundo_nombre?.toUpperCase()}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstApeVer"
                        style={{ fontWeight: "bold" }}
                      >
                        APELLIDOS:
                      </Form.Label>
                      <Form.Label column id="_conEstApeVer">
                        {contrato?.estudiante?.apellido_paterno?.toUpperCase()},{" "}
                        {contrato?.estudiante?.apellido_materno?.toUpperCase()}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstTelVer"
                        style={{ fontWeight: "bold" }}
                      >
                        TELÉFONO:
                      </Form.Label>
                      <Form.Label column id="_conEstTelVer">
                        {contrato?.estudiante?.telefono
                          ? contrato?.estudiante?.telefono
                          : "Sin registro"}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstDirVer"
                        style={{ fontWeight: "bold" }}
                      >
                        DIRECCIÓN:
                      </Form.Label>
                      <Form.Label column id="_conEstDirVer">
                        {contrato?.estudiante?.direccion?.toUpperCase()}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        column
                        htmlFor="_conEstColVer"
                        style={{ fontWeight: "bold" }}
                      >
                        COLEGIO DE PROCEDENCIA:
                      </Form.Label>
                      <Form.Label column id="_conEstColVer">
                        {contrato?.estudiante?.colegio_procedencia?.toUpperCase()}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group as={Row}>
                      <Form.Label
                        htmlFor="_conEstDesVer"
                        style={{ fontWeight: "bold" }}
                      >
                        DESTREZAS:
                      </Form.Label>
                      <Form.Label id="_conEstDesVer">
                        {contrato?.estudiante?.destreza?.toUpperCase()}
                      </Form.Label>
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </TabPanel>

          {/*--------------------------------PANEL 4--------------------------------------------------*/}

          <TabPanel>
            <Row style={{ textAlign: "center" }} className="mt-3">
              <span className="label-with-margin"> DATOS DEL APODERADO </span>
            </Row>

            {!apoderado ? (
              <>No hay registros</>
            ) : (
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
                          {" "}
                          PARENTESCO:
                        </Form.Label>
                        <Form.Label
                          column
                          id="_conApoPar"
                          style={{ textAlign: "right" }}
                        >
                          {apoderado!.parentesco.toUpperCase()}
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
                          {apoderado!.apoderado.primer_nombre?.toUpperCase()}
                          {", "}
                          {apoderado!.apoderado.segundo_nombre
                            ? apoderado!.apoderado.segundo_nombre.toUpperCase()
                            : ""}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          htmlFor="_conApoTelVer"
                          style={{ fontWeight: "bold" }}
                        >
                          TELÉFONO:
                        </Form.Label>
                        <Form.Label
                          column
                          style={{ textAlign: "right" }}
                          id="_conApoTelVer"
                        >
                          {apoderado!.apoderado.telefono}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          lg={4}
                          htmlFor="_conApoDirVer"
                          style={{ fontWeight: "bold" }}
                        >
                          DIRECCIÓN:
                        </Form.Label>
                        <Form.Label
                          column
                          style={{ textAlign: "right" }}
                          id="_conApoDirVer"
                        >
                          {apoderado!.apoderado.direccion
                            ? apoderado!.apoderado.direccion?.toUpperCase()
                            : "Sin registro"}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          lg="12"
                          htmlFor="_conApoNivEstVer"
                          style={{ fontWeight: "bold" }}
                        >
                          NIVEL DE ESTUDIOS:
                        </Form.Label>
                        <Form.Label
                          style={{ textAlign: "right" }}
                          column
                          id="_conApoNivEstVer"
                        >
                          {apoderado!.apoderado.nivel_estudios
                            ? apoderado!.apoderado.nivel_estudios
                            : "SIN REGISTRO"}
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
                          id="_conApoTipDocVer"
                          style={{ fontWeight: "bold" }}
                        >
                          {
                            informacion?.tipo_doc?.find(
                              (item) =>
                                item.id === apoderado?.apoderado.tipo_documento
                            )?.TipDocDesCor
                          }
                          :
                        </Form.Label>

                        <Form.Label
                          column
                          id="_conApoDocVer"
                          style={{ textAlign: "right" }}
                        >
                          {apoderado!.apoderado.documento}
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
                          {apoderado!.apoderado.apellido_paterno?.toUpperCase()}
                          {", "}
                          {apoderado!.apoderado.apellido_materno?.toUpperCase()}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          htmlFor="_conApoFecNacVer"
                          style={{ fontWeight: "bold" }}
                        >
                          FECHA DE NACIMIENTO
                        </Form.Label>
                        <Form.Label
                          column
                          style={{ textAlign: "right" }}
                          id="_conApoFecNacVer"
                        >
                          {apoderado!.apoderado.fecha_nacimiento
                            ? new Date(apoderado!.apoderado.fecha_nacimiento)
                                .toLocaleDateString(undefined, {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                                .toUpperCase()
                            : "Sin registro"}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          lg="2"
                          htmlFor="_conApoUbiVer"
                          style={{ fontWeight: "bold" }}
                        >
                          UBIGEO:
                        </Form.Label>
                        <Form.Label
                          column
                          lg="3"
                          style={{ textAlign: "right" }}
                          id="_conApoUbiVer"
                        >
                          {apoderado!.apoderado.ubigeo
                            ? apoderado!.apoderado.ubigeo
                            : ""}
                        </Form.Label>
                        <Form.Label
                          column
                          style={{ textAlign: "right" }}
                          lg="7"
                          id="_conApoDRDVer"
                        >
                          {ubigeoApo.region} {ubigeoApo.province}{" "}
                          {ubigeoApo.district}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          lg="12"
                          htmlFor="_conApoCenVer"
                          style={{ fontWeight: "bold" }}
                        >
                          CENTRO DE TRABAJO:
                        </Form.Label>
                        <Form.Label
                          style={{ textAlign: "right" }}
                          column
                          id="_conApoCenVer"
                        >
                          {apoderado!.apoderado.centro_trabajo
                            ? apoderado!.apoderado.centro_trabajo
                            : "SIN REGISTRO"}
                        </Form.Label>
                      </Form.Group>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            )}
          </TabPanel>
        </Tabs>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button
            onClick={() =>
              navigate(`/contrato`, {
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

export default VerContrato;
