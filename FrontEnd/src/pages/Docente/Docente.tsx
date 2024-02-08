import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import { Button } from "reactstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import PagContrato from "../../components/Contrato/Pag_Contrato";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { InformacionDocente } from "../../utilities/DocenteTipos";
import { Errors, NUMERO_REGISTROS } from "../../utilities/utils";
import toast from "react-hot-toast";

const Docente = () => {
  const { docentes, informacion } = useLoaderData() as InformacionDocente;
  const navigate = useNavigate();
  const actionData = useActionData() as Errors;

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el docente");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el docente");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el docente");
          return;
        }
        default: {
          return;
        }
      }
    } else if (actionData !== undefined && !actionData.ok) {
      switch (actionData.status) {
        case 500: {
          toast.error(
            `Ocurrio algo en el servidor: ${actionData.errors?.message}`
          );
          return;
        }
        case 400: {
          toast.error(
            `No se pudo guardar el docente: ${actionData.errors?.message}`
          );
          return;
        }
      }
    }
  }, [actionData]);

  /*Para filtrar datos*/
  const [filtrarDatos, setFiltrarDatos] = useState(docentes);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDoc, setFiltroDoc] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    if (docentes != null) filtrarDato();
  }, [filtroNombre, filtroDoc]);

  const filtrarDato = () => {
    const filtrarFila = docentes?.filter((docente) => {
      const textMatch =
        docente?.primer_nombre
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        docente?.segundo_nombre
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        docente?.apellido_paterno
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        docente?.apellido_materno
          .toLowerCase()
          .includes(filtroNombre.toLowerCase());
      const DocMatch = docente?.documento.includes(filtroDoc.toLowerCase());
      return textMatch && DocMatch;
    });
    setFiltrarDatos(filtrarFila);
  };

  const cambiarPaginaRegistros = (paginaSeleccionada: number) => {
    setPaginaActual(paginaSeleccionada);
  };

  return (
    <Container fluid className="vh-100">
      <Cabecera />
      <Row className="vh-100">
        <Menu />
        <Col
          lg="10"
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "2%" }}
        >
          <Form.Group className="Formulario">
            <Form.Group className="BotonNuevoContrato">
              <div className="contratoTitulo">DOCENTES</div>
              <Button id="_docCrearBtn" onClick={() => navigate("crear")}>
                NUEVO DOCENTE
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" as={Row} controlId="_docNomFil">
              <Form.Label
                column
                lg="5"
                style={{ fontWeight: "bold", textAlign: "left" }}
              >
                NOMBRE DEL DOCENTE:
              </Form.Label>
              <Col lg="7">
                <Form.Control
                  size="sm"
                  data-testid="_docNomFil"
                  placeholder="DIGITE EL NOMBRE DEL DOCENTE"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row} controlId="_docDocFil">
              <Form.Label
                column
                lg="5"
                style={{ fontWeight: "bold", textAlign: "left" }}
              >
                DOCUMENTO:
              </Form.Label>
              <Col lg="7">
                <Form.Control
                  size="sm"
                  data-testid="_docDocFil"
                  placeholder="DOCUMENTO DE IDENTIDAD"
                  value={filtroDoc}
                  onChange={(e) => setFiltroDoc(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mt-3 Tabla">
            <Table id="_docTabInf" striped responsive>
              <thead>
                <tr>
                  <th>DOCUMENTO</th>
                  <th>NOMBRES Y APELLIDOS</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtrarDatos.length != 0 ? (
                  filtrarDatos
                    ?.slice(
                      paginaActual * NUMERO_REGISTROS,
                      (paginaActual + 1) * NUMERO_REGISTROS
                    )
                    .map((docente, index) => (
                      <tr key={index}>
                        <td>
                          {
                            informacion?.tipodocumentos?.find(
                              (item) => item.id === docente.tipo_documento
                            )?.TipDocDesCor
                          }{" "}
                          - {docente?.documento}
                        </td>
                        <td>{`${docente?.primer_nombre ?? ""}
                        ${docente?.segundo_nombre ?? ""} 
                        ${docente?.apellido_paterno ?? ""}
                        ${docente?.apellido_materno ?? ""}`}</td>
                        <td>
                          <Form.Group className="Boton">
                            <Button
                              id="_docVerBtn"
                              data-testid="_docVerBtn"
                              onClick={() => navigate(`ver/${docente?.id}`)}
                            >
                              <FaEye />
                            </Button>{" "}
                            <Button
                              id="_docEditBtn"
                              data-testid="_docEditBtn"
                              onClick={() => navigate(`editar/${docente?.id}`)}
                            >
                              <FaEdit />
                            </Button>{" "}
                            <Button
                              id="_docEliBtn"
                              data-testid="_docEliBtn"
                              style={{ background: "#702828", color: "white" }}
                              onClick={() =>
                                navigate(`eliminar/${docente?.id}`)
                              }
                            >
                              <FaTrash />
                            </Button>{" "}
                          </Form.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3}> No se encontraron resultados </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Col className="col-12">
              <div className="paginacion d-flex justify-content-center">
                <PagContrato
                  datos={filtrarDatos}
                  registrosPorPagina={NUMERO_REGISTROS}
                  onPageChange={cambiarPaginaRegistros}
                />
              </div>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Outlet />
    </Container>
  );
};
export default Docente;
