import "./Clase.css"; // Importa el archivo de estilos personalizados
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import { Button } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import PagContrato from "../../components/Contrato/Pag_Contrato";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { InformacionClase } from "../../utilities/ClaseTipos";
import { Errors } from "../../utilities/utils";
import toast from "react-hot-toast";

const Clase = () => {
  const { clases, informacion } = useLoaderData() as InformacionClase;
  const navigate = useNavigate();
  const actionData = useActionData() as Errors;

  const [datosFiltrados, setDatosFiltrados] = useState(clases);
  const [filtroNroClase, setFiltroNroClase] = useState("");
  const [filtroGrado, setFiltroGrado] = useState(0);
  const [filtroNivel, setFiltroNivel] = useState(0);

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el curso");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el curso");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el curso");
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
            if (actionData.errors.hasOwnProperty(key)) {
              const error = actionData.errors[key];
              toast.error(`Ocurrio algo en el servidor: ${error}`);
            }
          }
          return;
        }
        case 400: {
          for (const key in actionData.errors) {
            if (actionData.errors.hasOwnProperty(key)) {
              const error = actionData.errors[key];
              toast.error(`No se pudo realizar: ${error}`);
            }
          }
          return;
        }
      }
    }
  }, [actionData]);

  /*Para la paginacion de datos*/
  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 4; // Número de registros por página

  useEffect(() => {
    filtrar_datos();
  }, [filtroNroClase, filtroGrado, filtroNivel]);

  useEffect(() => {
    setDatosFiltrados(clases);
  }, [clases]);

  const filtrar_datos = () => {
    //const filtrarFila = datos.filter((clase) => {
    const filtrarFila = clases.filter((clase) => {
      const textMatch = clase.clase
        .toLowerCase()
        .includes(filtroNroClase.toLowerCase());
      const nivelMatch = !filtroNivel || clase.nivel_codigo === filtroNivel;
      const gradoMatch = !filtroGrado || clase.grado_codigo === filtroGrado;
      return textMatch && nivelMatch && gradoMatch;
    });
    setDatosFiltrados(filtrarFila);
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
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "2%" }}
        >
          <Form.Group className="Formulario">
            <Form.Group className="BotonNuevaClase">
              <div className="claseTitulo">CLASES</div>
              <Button id="_claCrearBtn" onClick={() => navigate("crear")}>
                NUEVA CLASE
              </Button>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="_claNumFil">
                <Form.Label style={{ fontWeight: "bold" }}>
                  NÚMERO DE LA CLASE:
                </Form.Label>

                <Form.Control
                  size="sm"
                  placeholder="DIGITE EL NOMBRE DE LA CLASE"
                  value={filtroNroClase}
                  onChange={(e) => setFiltroNroClase(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="_claNivFil">
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
                      {nivel.nivel.toUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="_claGraFil">
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
                      {" - Grado"}
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
                  <th>GRADO</th>
                  <th>NOMBRE DEL TUTOR</th>
                  <th>INFORMACIÓN</th>
                  <th>NIVEL</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.length != 0 ? (
                  datosFiltrados
                    .slice(
                      paginaActual * registrosPorPagina,
                      (paginaActual + 1) * registrosPorPagina
                    )
                    .map((clase, index) => (
                      <tr key={index}>
                        <td>{clase.clase}</td>
                        <td>
                          {
                            informacion?.tutores?.find(
                              (item) => item.id === clase.tutor_codigo
                            )?.primer_nombre
                          }{" "}
                          {
                            informacion?.tutores?.find(
                              (item) => item.id === clase.tutor_codigo
                            )?.apellido_paterno
                          }{" "}
                        </td>
                        <td>
                          {
                            informacion?.grados?.find(
                              (item) => item.id === clase.grado_codigo
                            )?.grado
                          }{" "}
                          - GRADO
                        </td>
                        <td>
                          {informacion?.niveles
                            ?.find((item) => item.id === clase.nivel_codigo)
                            ?.nivel.toUpperCase()}
                        </td>
                        <td>
                          <Form.Group id="_claAccBtns" className="Boton">
                            <Button
                              id="_claAgrEstBtn"
                              onClick={() =>
                                navigate(`estudiantes/${clase.id}`)
                              }
                            >
                              <TiUserAddOutline />
                            </Button>{" "}
                            <Button
                              id="_claEditBtn"
                              onClick={() => navigate(`editar/${clase.id}`)}
                            >
                              <FaEdit />
                            </Button>{" "}
                            <Button
                              id="_claEliBtn"
                              style={{ background: "#702828", color: "white" }}
                              onClick={() => navigate(`eliminar/${clase.id}`)}
                            >
                              <FaTrash />
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
                  datos={datosFiltrados}
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
