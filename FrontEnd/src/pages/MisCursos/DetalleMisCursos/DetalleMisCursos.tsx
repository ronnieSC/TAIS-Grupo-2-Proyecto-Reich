import "./DetalleMisCursos.css"; // Importa el archivo de estilos personalizados
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Cabecera from "../../../components/VistaPrincipal/Cabecera";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Menu from "../../../components/VistaPrincipal/Menu";

import { ListaAlumnos } from "../../../utilities/DocenteTipos";
import { AiFillFolderOpen } from "react-icons/ai";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Errors } from "../../../utilities/utils";
import toast from "react-hot-toast";

const DetalleMisCursos = () => {
  const listado = useLoaderData() as ListaAlumnos;
  const navigate = useNavigate();
  const actionData = useActionData() as Errors;

  /*PARA LA PAGINACION DE LOS REGISTROS*/
  /*const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 4; // Número de registros por página
  const cambiarPaginaRegistros = (paginaSeleccionada: number) => {
    setPaginaActual(paginaSeleccionada);
  };*/
  const [filtrarDatos, setFiltrarDatos] = useState(listado.estudiantes);
  const [filtroNombre, setFiltroNombre] = useState("");

  useEffect(() => {
    filtrarDato();
  }, [filtroNombre]);

  const filtrarDato = () => {
    const filtrarFila = listado.estudiantes.filter((estudiante) => {
      const nombreCompletoEst = estudiante.primer_nombre.concat(
        estudiante.segundo_nombre ? " " + estudiante.segundo_nombre : "",
        " " + estudiante.apellido_paterno,
        " " + estudiante.apellido_materno
      );
      const textMatch = nombreCompletoEst
        .toLowerCase()
        .includes(filtroNombre.toLowerCase());
      return textMatch;
    });
    setFiltrarDatos(filtrarFila);
  };

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente la calificación");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente la calificación");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente la calificación");
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
            `No se pudo guardar la calificación: ${actionData.errors?.message}`
          );
          return;
        }
      }
    }
  }, [actionData]);

  return (
    <Container fluid className="vh-100">
      <Cabecera />
      <Row className="vh-100">
        <Menu />
        <Col
          className="col-10"
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "2%" }}
        >
          <Form.Group className="Formulario mb-3">
            <Row className="">
              <Form.Group
                as={Col}
                lg={2}
                onClick={() => navigate("/misCursos")}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <IoChevronBackCircleOutline style={{ fontSize: "2.5rem" }} />
                </div>
              </Form.Group>
              <Form.Group as={Col} lg={8} className="BotonNuevoCurso">
                <div className="cursoTitulos">
                  {listado.grado}° DE {listado.nivel.toUpperCase()}
                </div>
              </Form.Group>
            </Row>

            <Form.Group controlId="_estNom" as={Row}>
              <Form.Label column lg="2" style={{ fontWeight: "bold" }}>
                NOMBRE:
              </Form.Label>
              <Col lg="10">
                <Form.Control
                  className="form-control-md"
                  placeholder="Nombre del Alumno"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form.Group>

          <Form.Group
            className="botonRegistro d-flex justify-content-end mb-3"
            style={{ paddingRight: "10%" }}
          >
            <Button
              onClick={() =>
                navigate(`registro_Completo/${listado.codigo_curso}`, {
                  state: { codigo_bloque: listado.codigo_bloque },
                })
              }
            >
              REGISTRO COMPLETO DE NOTAS
            </Button>
          </Form.Group>

          <Form.Group className="Tabla">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>NOMBRES Y APELLIDOS</th>
                  <th>CURSO</th>
                  <th>REGISTRO</th>
                </tr>
              </thead>
              <tbody>
                {filtrarDatos.length !== 0 ? (
                  filtrarDatos.map((estudiante) => (
                    <tr key={estudiante.codigo_estudiante}>
                      <td>{estudiante.dni}</td>
                      <td>
                        {estudiante.primer_nombre}
                        {estudiante.segundo_nombre
                          ? " " + estudiante.segundo_nombre
                          : ""}
                        {" " + estudiante.apellido_paterno}
                        {" " + estudiante.apellido_materno}
                      </td>
                      <td>{listado.curso}</td>
                      <td className="botonAcciones">
                        <Button
                          id="_conCrearBtn"
                          onClick={() =>
                            navigate(`crear/${estudiante?.codigo_estudiante}`, {
                              state: {
                                idCurso: listado.codigo_curso,
                                idDocente: listado.codigo_docente,
                              },
                            })
                          }
                        >
                          <AiFillFolderOpen size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No se encontraron resultados</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {/* Agrega el componente de paginación */}
            <Col className="col-12">
              {/* Contenido de la página */}
              {/* ... Resto de tu código ... */}
              <div className="paginacion d-flex justify-content-center">
                {/*<PagContrato
                            datos={filtrarDatos}
                            registrosPorPagina={registrosPorPagina}
                            onPageChange={cambiarPaginaRegistros}
    />*/}
              </div>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default DetalleMisCursos;
