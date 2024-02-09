import "./MisCursos.css"; // Importa el archivo de estilos personalizados
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import PagContrato from "../../components/Contrato/Pag_Contrato";
import { Outlet, useLoaderData } from "react-router-dom";
import { CursoAsignado } from "../../utilities/DocenteTipos";
import { CardComponent } from "../../components/Card/Card";

const MisCursos = () => {
  const cursos = useLoaderData() as CursoAsignado[];

  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 6; // Número de registros por página

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
          className="col-10"
          style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "2%" }}
        >
          <Form.Group className="Formulario">
            <Form.Group className="BotonNuevoCurso">
              <div className="cursoTitulos">MIS CURSOS</div>
            </Form.Group>
          </Form.Group>

          <Form.Group
            className="Cards"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {cursos.length !== 0 ? (
              cursos
                .slice(
                  paginaActual * registrosPorPagina,
                  (paginaActual + 1) * registrosPorPagina
                )
                .map((curso) => (
                  <CardComponent
                    key={curso.codigo_bloque}
                    codigo_bloque={curso.codigo_bloque}
                    seccion={curso.grado + "° de " + curso.nivel}
                    nombre={curso.curso}
                  />
                ))
            ) : (
              <Form.Group className="BotonNuevoCurso">
                <div className="cursoTitulos">No tiene clases asignadas</div>
              </Form.Group>
            )}

            <Col className="col-12">
              <div className="paginacion d-flex justify-content-center">
                <PagContrato
                  datos={cursos}
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

export default MisCursos;
