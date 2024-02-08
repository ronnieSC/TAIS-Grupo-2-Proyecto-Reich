import "./Estudiante.css"; // Importa el archivo de estilos personalizados
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import { Button } from "reactstrap";
import { FaEye, FaEdit, FaUserFriends } from "react-icons/fa";
import PagContrato from "../../components/Contrato/Pag_Contrato";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { InformacionEstudiante } from "../../utilities/EstudianteTipos";
import { Errors } from "../../utilities/utils";
import toast from "react-hot-toast";

const Clase = () => {
  const { estudiantes, informacion } = useLoaderData() as InformacionEstudiante;
  const navigate = useNavigate();
  const actionData = useActionData() as Errors;

  /*Para filtrar datos*/
  const [filtrarDatos, setFiltrarDatos] = useState(estudiantes);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroGrado, setFiltroGrado] = useState(0);
  const [filtroNivel, setFiltroNivel] = useState(0);

  /*Para la paginacion de datos*/
  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 4; // Número de registros por página

  console.log(actionData)

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el estudiante");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el estudiante");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el estudiante");
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
            `No se pudo guardar el estudiante: ${actionData.errors?.message}`
          );
          return;
        }
      }
    }
  }, [actionData]);

  useEffect(() => {
    filtrarDato();
  }, [filtroNombre, filtroGrado, filtroNivel]);

  const filtrarDato = () => {
    const filtrarFila = estudiantes.filter((estudiante) => {
      const textMatch =
        estudiante?.primer_nombre
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        estudiante?.segundo_nombre
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        estudiante?.apellido_paterno
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) ||
        estudiante?.apellido_materno
          .toLowerCase()
          .includes(filtroNombre.toLowerCase());
      const nivelMatch =
        !filtroNivel || estudiante?.nivel_codigo === filtroNivel;
      const gradoMatch =
        !filtroGrado || estudiante?.grado_codigo === filtroGrado;
      return textMatch && nivelMatch && gradoMatch;
    });
    setFiltrarDatos(filtrarFila);
  };

  /*PARA LA PAGINACION DE LOS REGISTROS*/

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
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "4%" }}
        >
          <Form.Group className="Formulario">
            <Form.Group className="BotonEstudiante">
              <div className="estudianteTitulo">ESTUDIANTES</div>
            </Form.Group>

            {/* FILTRAR POR NOMBRE*/}
            <Form.Group className="mb-3" as={Row} controlId="_estNomFil">
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
                  onChange={(e) => setFiltroNombre(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="_estNivFil">
                <Form.Label style={{ fontWeight: "bold" }}>NIVEL:</Form.Label>
                <Form.Select
                  size="sm"
                  value={filtroNivel}
                  onChange={({ target }) =>
                    setFiltroNivel(parseInt(target.value))
                  }
                >
                  <option value={0}>SELECCIONAR</option>
                  {informacion?.niveles?.map((nivel, index) => (
                    <option key={index} value={nivel.id}>
                      {nivel.nivel}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="_estGraFil">
                <Form.Label style={{ fontWeight: "bold" }}>GRADO:</Form.Label>
                <Form.Select
                  size="sm"
                  value={filtroGrado}
                  onChange={({ target }) =>
                    setFiltroGrado(parseInt(target.value))
                  }
                >
                  <option value={0}>SELECCIONAR</option>
                  {informacion?.grados?.map((grado, index) => (
                    <option key={index} value={grado.id}>
                      {grado.grado}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form.Group>

          <Form.Group className="Tabla mt-3">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>NOMBRES Y APELLIDOS</th>
                  <th>GRADO Y NIVEL</th>
                  <th>ALIAS</th>
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
                    .map((estudiante, index) => (
                      <tr key={index}>
                        <td>{`${estudiante?.primer_nombre} 
                        ${
                          estudiante?.segundo_nombre
                            ? " " + estudiante?.segundo_nombre
                            : ""
                        } 
                        ${estudiante?.apellido_paterno} 
                        ${estudiante?.apellido_materno}`}</td>
                        <td>{`${
                          informacion?.grados?.find(
                            (item) => item.id === estudiante.grado_codigo
                          )?.grado
                        }-${informacion?.niveles
                          ?.find((item) => item.id === estudiante.nivel_codigo)
                          ?.nivel.toUpperCase()}`}</td>
                        <td>
                          {estudiante?.alias == undefined
                            ? "SIN ALIAS"
                            : estudiante?.alias}
                        </td>
                        <td>
                          <Form.Group className="Boton">
                            <Button
                              onClick={() =>
                                navigate(
                                  `parientes/${estudiante?.contrato_codigo}`
                                )
                              }
                            >
                              <FaUserFriends />
                            </Button>{" "}
                            <Button
                              onClick={() => navigate(`ver/${estudiante?.id}`)}
                            >
                              <FaEye />
                            </Button>{" "}
                            <Button
                              onClick={() =>
                                navigate(`editar/${estudiante?.id}`)
                              }
                            >
                              <FaEdit />
                            </Button>{" "}
                          </Form.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4}> No se encontraron resultados </td>
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
export default Clase;
