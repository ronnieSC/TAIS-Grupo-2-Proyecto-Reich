import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Nav,
  Tab,
  Button,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import PagContrato from "../../components/Contrato/Pag_Contrato";
import {
  Outlet,
  useNavigate,
  useLoaderData,
  useActionData,
} from "react-router-dom";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import "./Configuracion.css";
import { ConfiguracionEntidad } from "../../utilities/ConfigracionTipos";
import { Errors } from "../../utilities/utils";
import toast from "react-hot-toast";

const Configuracion: React.FC = () => {
  const {
    niveles,
    tipodocumentos,
    actividades,
    precios,
    grados,
    aniosAcademicos,
    encargados,
    razones,
    contratoDocumentos,
  } = useLoaderData() as ConfiguracionEntidad;

  // Variables para la pestaña de Grado
  const navigate = useNavigate();
  const [paginaActualGrado, setPaginaActualGrado] = useState(0);
  const registrosPorPaginaGrado = 10;

  // Variables para la pestaña de Año académico
  const [paginaActualAnio, setPaginaActualAnio] = useState(0);
  const registrosPorPaginaAnio = 4;

  // Variables para la pestaña de Encargados
  const [paginaActualEncargados, setPaginaActualEncargados] = useState(0);
  const registrosPorPaginaEncargados = 4;

  // Variables para la pestaña de Tipos de Documentos
  const [paginaActualTiposDocumentos, setPaginaActualTiposDocumentos] =
    useState(0);
  const registrosPorPaginaTiposDocumentos = 4;

  // Variables para la pestaña de Tipos de Actividades
  const [paginaActualActividades, setPaginaActualActividades] = useState(0);
  const registrosPorPaginaActividades = 10;
  // Variables para la pestaña de Precios
  const [paginaActualPrecios, setPaginaActualPrecios] = useState(0);
  const registrosPorPaginaPrecios = 4;
  // Variables para la pestaña de Niveles
  const [paginaActualNiveles, setPaginaActualNiveles] = useState(0);
  const registrosPorPaginaNiveles = 10;
  // Variables para la pestaña de Documentos Contratos
  const [paginaActualDocumentosContrato, setPaginaActualDocumentosContrato] =
    useState(0);
  const registrosPorPaginaDocumentosContrato = 10;

  const actionData = useActionData() as Errors;

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente");
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
            `No se pudo guardar: ${actionData.errors?.message}`
          );
          return;
        }
      }
    }
  }, [actionData]);

  const cambiarPaginaRegistros = (paginaSeleccionada: number, tipo: string) => {
    switch (tipo) {
      case "grado":
        setPaginaActualGrado(paginaSeleccionada);
        break;
      case "anio":
        setPaginaActualAnio(paginaSeleccionada);
        break;
      case "encargados":
        setPaginaActualEncargados(paginaSeleccionada);
        break;
      case "tipoDocumento":
        setPaginaActualTiposDocumentos(paginaSeleccionada);
        break;
      case "actividad":
        setPaginaActualActividades(paginaSeleccionada);
        break;
      case "precio":
        setPaginaActualPrecios(paginaSeleccionada);
        break;
      case "nivel":
        setPaginaActualNiveles(paginaSeleccionada);
        break;
      case "documentosContrato":
        setPaginaActualDocumentosContrato(paginaSeleccionada);
        break;
      default:
        break;
    }
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
          <Tab.Container id="configuraciones-tabs" defaultActiveKey="precio">
            <Form.Group className="Titulo pt-4">
              <div className="configuracionTitulo">CONFIGURACIÓN</div>
            </Form.Group>
            <Form.Group className="Formulario">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="precio">Precio</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="grado">Grado</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="nivel">Nivel</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="anio">Año académico</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="encargados">Encargados</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tipoDocumento">Tipo Documento</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="actividad">Actividad</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="documentosContrato">
                    Documentos del Contrato
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* ... Otras pestañas ... */}
                <Tab.Pane eventKey="precio">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoPrecio">
                      <Button onClick={() => navigate("crearPrecio")}>
                        Nuevo Precio
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Año del Precio</th>
                          <th>Nivel</th>
                          <th>Razon</th>
                          <th>Monto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {precios
                          ?.slice(
                            paginaActualPrecios * registrosPorPaginaPrecios,
                            (paginaActualPrecios + 1) *
                              registrosPorPaginaPrecios
                          )
                          .map((dato: any) => {
                            // Buscar el objeto correspondiente en datosAnioAcademico
                            const anioAcademico = aniosAcademicos.find(
                              (anio: any) => anio.id === dato.ano_codigo
                            );
                            const codigoNivel = niveles.find(
                              (nivel: any) => nivel.id === dato.nivel_codigo
                            );
                            const razonCodigo = razones.find(
                              (razon: any) => razon.id === dato.razon_codigo
                            );

                            return (
                              <tr key={dato.id}>
                                <td>
                                  {anioAcademico
                                    ? anioAcademico.AnoAcaNum
                                    : "Año no encontrado"}
                                </td>
                                <td>
                                  {codigoNivel
                                    ? codigoNivel.nivel
                                    : "Nivel no encontrado"}
                                </td>
                                <td>
                                  {razonCodigo
                                    ? razonCodigo.razon
                                    : "Razon no encontrada"}
                                </td>
                                <td>{dato.monto}</td>
                                <td>
                                  <Form.Group className="Boton">
                                    <Button
                                      id="_docEditBtn"
                                      data-testid="_docEditBtn"
                                      onClick={() =>
                                        navigate(`editarPrecio/${dato?.id}`)
                                      }
                                    >
                                      <FaEdit />
                                    </Button>{" "}
                                    <Button
                                      id="_docEliBtn"
                                      data-testid="_docEliBtn"
                                      style={{
                                        background: "#702828",
                                        color: "white",
                                      }}
                                      onClick={() =>
                                        navigate(`eliminarPrecio/${dato?.id}`)
                                      }
                                    >
                                      <FaTrash />
                                    </Button>{" "}
                                  </Form.Group>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={precios}
                        registrosPorPagina={registrosPorPaginaPrecios}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "precio")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>
                {/* ... PESTAÑA AÑO ACADÉMICO ... */}
                <Tab.Pane eventKey="anio">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoAnioAcademico">
                      <Button onClick={() => navigate("crearAnioAcademico")}>
                        Nuevo Año Academico
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Año Académico</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aniosAcademicos
                          ?.slice(
                            paginaActualAnio * registrosPorPaginaAnio,
                            (paginaActualAnio + 1) * registrosPorPaginaAnio
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{dato.AnoAcaNum}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `eliminarAnioAcademico/${dato?.id}`
                                      )
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={aniosAcademicos}
                        registrosPorPagina={registrosPorPaginaAnio}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "anio")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>
                {/* ... PESTAÑA GRADO ... */}
                <Tab.Pane eventKey="grado">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoGrado">
                      <Button onClick={() => navigate("crearGrado")}>
                        Nuevo Grado
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Grado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grados
                          ?.slice(
                            paginaActualGrado * registrosPorPaginaGrado,
                            (paginaActualGrado + 1) * registrosPorPaginaGrado
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{dato.grado}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(`eliminarGrado/${dato?.id}`)
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={grados}
                        registrosPorPagina={registrosPorPaginaGrado}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "grado")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>
                {/* ... PESTAÑA ENCARGADOS ... */}
                <Tab.Pane eventKey="encargados">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoEncargado">
                      <Button onClick={() => navigate("crearEncargado")}>
                        Nuevo Encargado
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {encargados
                          ?.slice(
                            paginaActualEncargados *
                              registrosPorPaginaEncargados,
                            (paginaActualEncargados + 1) *
                              registrosPorPaginaEncargados
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{`${dato.primer_nombre} ${
                                dato.segundo_nombre ? dato.segundo_nombre : ""
                              }`}</td>
                              <td>{`${dato.apellido_paterno} ${dato.apellido_materno}`}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEditBtn"
                                    data-testid="_docEditBtn"
                                    onClick={() =>
                                      navigate(`editarEncargado/${dato?.id}`)
                                    }
                                  >
                                    <FaEdit />
                                  </Button>{" "}
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(`eliminarEncargado/${dato?.id}`)
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={encargados}
                        registrosPorPagina={registrosPorPaginaEncargados}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "encargados")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>

                {/* ... PESTAÑA NIVEL... */}
                <Tab.Pane eventKey="nivel">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoNivel">
                      <Button onClick={() => navigate("crearNivel")}>
                        Nuevo Nivel
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Nivel</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {niveles
                          ?.slice(
                            paginaActualNiveles * registrosPorPaginaNiveles,
                            (paginaActualNiveles + 1) *
                              registrosPorPaginaNiveles
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{dato.nivel}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(`eliminarNivel/${dato?.id}`)
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={niveles}
                        registrosPorPagina={registrosPorPaginaNiveles}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "nivel")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>

                {/* ... PESTAÑA ACTIVIDAD... */}
                <Tab.Pane eventKey="actividad">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevaActividad">
                      <Button onClick={() => navigate("crearActividad")}>
                        Nueva Actividad
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Actividad</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {actividades
                          ?.slice(
                            paginaActualActividades *
                              registrosPorPaginaActividades,
                            (paginaActualActividades + 1) *
                              registrosPorPaginaActividades
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{dato.actividad}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(`eliminarActividad/${dato?.id}`)
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={actividades}
                        registrosPorPagina={registrosPorPaginaActividades}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "actividad")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>

                {/* ... PESTAÑA TIPO DOCUMENTO... */}
                <Tab.Pane eventKey="tipoDocumento">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoTipoDocumento">
                      <Button onClick={() => navigate("crearTipoDocumento")}>
                        Nuevo Tipo Documento
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Tipo Documento</th>
                          <th>Descripción Corta</th>
                          <th>Descripción Larga</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tipodocumentos
                          ?.slice(
                            paginaActualTiposDocumentos *
                              registrosPorPaginaTiposDocumentos,
                            (paginaActualTiposDocumentos + 1) *
                              registrosPorPaginaTiposDocumentos
                          )
                          .map((dato: any) => (
                            <tr key={dato.id}>
                              <td>{dato.TipDocTip}</td>
                              <td>{dato.TipDocDesCor}</td>
                              <td>{dato.TipDocDesLar}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEditBtn"
                                    data-testid="_docEditBtn"
                                    onClick={() =>
                                      navigate(
                                        `editarTipoDocumento/${dato?.id}`
                                      )
                                    }
                                  >
                                    <FaEdit />
                                  </Button>{" "}
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `eliminarTipoDocumento/${dato?.id}`
                                      )
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={tipodocumentos}
                        registrosPorPagina={registrosPorPaginaTiposDocumentos}
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "tipoDocumento")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>
                {/* ... PESTAÑA DOCUMENTOS CONTRATO ... */}
                <Tab.Pane eventKey="documentosContrato">
                  <Form.Group className="mt-3 Tabla">
                    <Form.Group className="BotonNuevoDocumentoContrato">
                      <Button
                        onClick={() => navigate("crearDocumentoContrato")}
                      >
                        Nuevo Documento Contrato
                      </Button>
                    </Form.Group>

                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Nombre del Documento</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contratoDocumentos
                          ?.slice(
                            paginaActualDocumentosContrato *
                              registrosPorPaginaDocumentosContrato,
                            (paginaActualDocumentosContrato + 1) *
                              registrosPorPaginaDocumentosContrato
                          )
                          .map((documento: any) => (
                            <tr key={documento?.id}>
                              <td>{documento?.tipo_documento}</td>
                              <td>
                                <Form.Group className="Boton">
                                  <Button
                                    id="_docEditBtn"
                                    data-testid="_docEditBtn"
                                    onClick={() =>
                                      navigate(
                                        `editarDocumentoContrato/${documento?.id}`
                                      )
                                    }
                                  >
                                    <FaEdit />
                                  </Button>{" "}
                                  <Button
                                    id="_docEliBtn"
                                    data-testid="_docEliBtn"
                                    style={{
                                      background: "#702828",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `eliminarDocumentoContrato/${documento?.id}`
                                      )
                                    }
                                  >
                                    <FaTrash />
                                  </Button>{" "}
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <div className="paginacion d-flex justify-content-center">
                      <PagContrato
                        datos={contratoDocumentos}
                        registrosPorPagina={
                          registrosPorPaginaDocumentosContrato
                        }
                        onPageChange={(pagina) =>
                          cambiarPaginaRegistros(pagina, "documentosContrato")
                        }
                      />
                    </div>
                  </Form.Group>
                </Tab.Pane>
              </Tab.Content>
            </Form.Group>
          </Tab.Container>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Configuracion;
