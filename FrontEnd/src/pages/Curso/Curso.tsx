import "./Curso.css"; // Importa el archivo de estilos personalizados
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
import { CursoEntidad } from "../../utilities/CursoTipos";
import { Errors } from "../../utilities/utils";
import toast from "react-hot-toast";

const Curso = () => {
  const cursos = useLoaderData() as CursoEntidad[];
  const navigate = useNavigate();
  const actionData = useActionData() as Errors;

  const [filtrarDatos, setFiltrarDatos] = useState(cursos);
  const [filtroNombre, setFiltroNombre] = useState("");

  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 4; // Número de registros por página

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
          toast.error(
            `Ocurrio algo en el servidor: ${actionData.errors?.message}`
          );
          return;
        }
        case 400: {
          toast.error(
            `No se pudo guardar el curso: ${actionData.errors?.message}`
          );
          return;
        }
      }
    }
  }, [actionData]);

  useEffect(() => {
    filtrarDato();
  }, [filtroNombre]);

  const filtrarDato = () => {
    const filtrarFila = cursos.filter((curso) => {
      const nombreMatch =
        !filtroNombre ||
        curso.curso.toLowerCase().includes(filtroNombre.toLowerCase().trim());
      return nombreMatch;
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
          className="col-10"
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "2%" }}
        >
          <Form.Group className="Formulario">
            <Form.Group className="BotonNuevoCurso">
              <div className="cursoTitulo">CURSOS</div>
              <Button id="_curCrearBtn" onClick={() => navigate("crear")}>
                NUEVO CURSO
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="_curNom" as={Row}>
              <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
                CURSO:
              </Form.Label>
              <Col lg="8">
                <Form.Control
                  size="sm"
                  placeholder="Digite nombre del curso"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form.Group>

          <Form.Group className="Tabla">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>NOMBRE DEL CURSO</th>
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
                    .map((curso, index) => (
                      <tr key={index}>
                        <td>{curso.curso.toUpperCase()}</td>
                        <td>
                          <Form.Group className="Boton">
                            <Button
                              onClick={() => navigate(`ver/${curso?.id}`)}
                            >
                              <FaEye />
                            </Button>{" "}
                            <Button
                              onClick={() => navigate(`editar/${curso?.id}`)}
                            >
                              <FaEdit />
                            </Button>{" "}
                            <Button
                              style={{ background: "#702828", color: "white" }}
                              onClick={() => navigate(`eliminar/${curso?.id}`)}
                            >
                              <FaTrash />
                            </Button>{" "}
                          </Form.Group>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={2}> No se encontraron resultados </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {/* Agrega el componente de paginación */}
            <Col className="col-12">
              {/* Contenido de la página */}
              {/* ... Resto de tu código ... */}
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
export default Curso;
