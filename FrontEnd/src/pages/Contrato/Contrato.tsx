import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import { Button } from "reactstrap";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import "./Contrato.css"; // Importa el archivo de estilos personalizados
import PagContrato from "../../components/Contrato/Pag_Contrato";
import { InformacionContrato } from "../../utilities/ContratoTipos";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Errors, NUMERO_REGISTROS } from "../../utilities/utils";
import toast from "react-hot-toast";
import contratoApi from "../../api/contrato.api";

const Contrato = () => {
  const { contratos, informacion } = useLoaderData() as InformacionContrato;
  const navigate = useNavigate();

  /*Para filtrar datos*/
  const [filtrarDatos, setFiltrarDatos] = useState(contratos);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroGrado, setFiltroGrado] = useState(0);
  const [filtroNivel, setFiltroNivel] = useState(0);

  /*Para la paginacion de datos*/
  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = NUMERO_REGISTROS;

  const actionData = useActionData() as Errors;

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el contrato");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el contrato");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el contrato");
          return;
        }
        default: {
          return;
        }
      }
    } else if (actionData !== undefined && !actionData.ok) {
      switch (actionData.status) {
        case 500: {
          for (const key in actionData.errors) {
            if (actionData.errors.hasOwnProperty(key)){
              const error = actionData.errors[key]
              toast.error(`Ocurrio algo en el servidor: ${error}`);
            }
          };
          return;
        }
        case 400: {
          for (const key in actionData.errors) {
            if (actionData.errors.hasOwnProperty(key)){
              const error = actionData.errors[key]
              toast.error(`No se pudo realizar: ${error}`);
            }
          };
          return;
        }
      }
    }
  }, [actionData]);
  useEffect(() => {
    setFiltrarDatos(contratos);
  }, [contratos]);

  useEffect(() => {
    filtrarDato();
  }, [filtroNombre, filtroDni, filtroGrado, filtroNivel]);

  const filtrarDato = () => {
    const filtrarFila = contratos.filter((contrato) => {
      // Cambiar "contratos" a "filtrarDatos"
      const nombreCompletoEst = contrato.estudiante.primer_nombre.concat(
        contrato.estudiante.segundo_nombre
          ? " " + contrato.estudiante.segundo_nombre
          : "",
        " " + contrato.estudiante.apellido_paterno,
        " " + contrato.estudiante.apellido_materno
      );
      const textMatch = nombreCompletoEst
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());
      const dniMatch = contrato.estudiante.documento
        .toLowerCase()
        .includes(filtroDni.toLowerCase());
      const nivelMatch =
        !filtroNivel || contrato.estudiante.nivel_codigo === filtroNivel;
      const gradoMatch =
        !filtroGrado || contrato.estudiante.grado_codigo === filtroGrado;
      return textMatch && dniMatch && nivelMatch && gradoMatch;
    });
    setFiltrarDatos(filtrarFila);
  };

  const cambiarPaginaRegistros = (paginaSeleccionada: number) => {
    setPaginaActual(paginaSeleccionada);
  };

  const descargar_contrato = async (idContrato: any) => {
    return await contratoApi.obtener_contrato_informe(idContrato);
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
              <div className="contratoTitulo">CONTRATO</div>
              <Button id="_conCrearBtn" onClick={() => navigate("crear")}>
                NUEVO CONTRATO
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" as={Row} controlId="_conNomFil">
              <Form.Label
                column
                lg="5"
                style={{ fontWeight: "bold", textAlign: "left" }}
              >
                NOMBRE DEL ESTUDIANTE:
              </Form.Label>
              <Col lg="7">
                <Form.Control
                  size="sm"
                  placeholder="DIGITE EL NOMBRE DEL ESTUDIANTE"
                  value={filtroNombre}
                  onChange={({ target }) => setFiltroNombre(target.value)}
                />
              </Col>
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="_conDocFil">
                <Form.Label style={{ fontWeight: "bold" }}>
                  DOCUMENTO:
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="DOCUMENTO"
                  value={filtroDni}
                  onChange={(e) => setFiltroDni(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="_conNivFil">
                <Form.Label style={{ fontWeight: "bold" }}>NIVEL:</Form.Label>
                <Form.Select
                  size="sm"
                  value={filtroNivel}
                  onChange={({ target }) =>
                    setFiltroNivel(parseInt(target.value))
                  }
                >
                  <option value="00">SELECCIONA</option>
                  {informacion?.niveles?.map((nivel, index) => (
                    <option key={index} value={nivel.id}>
                      {nivel.nivel.toUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="_conGraFil">
                <Form.Label style={{ fontWeight: "bold" }}>GRADO:</Form.Label>
                <Form.Select
                  size="sm"
                  value={filtroGrado}
                  onChange={({ target }) =>
                    setFiltroGrado(parseInt(target.value))
                  }
                >
                  <option value="00">SELECCIONA</option>
                  {informacion?.grados?.map((grado, index) => (
                    <option key={index} value={grado.id}>
                      {grado.grado + " - GRADO"}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form.Group>

          <Form.Group className="mt-3 Tabla">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>DOCUMENTO</th>
                  <th>NOMBRES Y APELLIDOS</th>
                  <th>NIVEL</th>
                  <th>GRADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtrarDatos.length != 0 ? (
                  filtrarDatos
                    .slice(
                      paginaActual * registrosPorPagina,
                      (paginaActual + 1) * registrosPorPagina
                    )
                    .map((contrato, index: number) => (
                      <tr key={index}>
                        <td>{contrato?.estudiante.documento}</td>
                        <td>{`${contrato?.estudiante?.primer_nombre}
                            ${
                              contrato?.estudiante?.segundo_nombre
                                ? contrato?.estudiante?.segundo_nombre
                                : ""
                            }
                            ${contrato?.estudiante?.apellido_paterno}
                            ${contrato?.estudiante.apellido_materno}`}</td>
                        <td>
                          {informacion?.niveles
                            ?.find(
                              (item) =>
                                item.id === contrato?.estudiante?.nivel_codigo
                            )
                            ?.nivel.toUpperCase()}
                        </td>
                        <td>
                          {
                            informacion?.grados?.find(
                              (item) =>
                                item.id === contrato?.estudiante?.grado_codigo
                            )?.grado
                          }
                        </td>
                        <td>
                          <Form.Group className="Boton">
                            <Button
                              onClick={() => navigate(`ver/${contrato?.id}`)}
                            >
                              <FaEye />
                            </Button>{" "}
                            <Button
                              onClick={() => navigate(`editar/${contrato?.id}`)}
                            >
                              <FaEdit />
                            </Button>{" "}
                            <Button
                              style={{ background: "#702828", color: "white" }}
                              onClick={() =>
                                navigate(`eliminar/${contrato?.id}`)
                              }
                            >
                              <FaTrash />
                            </Button>{" "}
                            <Button
                              style={{ color: "white" }}
                              onClick={() => descargar_contrato(contrato?.id)}
                            >
                              <FaDownload />
                            </Button>
                          </Form.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5}> No se encontraron resultados </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Col className="col-12">
              <div className="paginacion d-flex justify-content-center">
                <PagContrato
                  datos={filtrarDatos}
                  registrosPorPagina={registrosPorPagina}
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
export default Contrato;
