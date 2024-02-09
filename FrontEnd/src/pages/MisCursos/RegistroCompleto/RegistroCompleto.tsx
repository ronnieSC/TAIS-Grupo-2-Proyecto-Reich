import "./RegistroCompleto.css"
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Table, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Calificaciones } from "../../../utilities/CalificacionTipos";
import { ListaAlumnos } from "../../../utilities/DocenteTipos";
import { FaEdit } from "react-icons/fa";
import { Errors, parseDateToString } from "../../../utilities/utils";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import PagContrato from "../../../components/Contrato/Pag_Contrato";

const RegistroCompleto = () => {
  const { codigo_bloque, estudiantes } = useRouteLoaderData(
    "listadoRaiz"
  ) as ListaAlumnos;
  const registro = useLoaderData() as Calificaciones[];
  const params = useParams();
  const navigate = useNavigate();

  const [paginaActual, setPaginaActual] = useState(0);
  const registrosPorPagina = 10; // Número de registros por página

  /*PARA LA PAGINACION DE LOS REGISTROS*/

  const cambiarPaginaRegistros = (paginaSeleccionada: number) => {
    setPaginaActual(paginaSeleccionada);
  };

  const actionData = useActionData() as Errors;
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

  const [fechaFiltro, setFechaFiltro] = useState(new Date());

  const retornarNombre = (codigo_estudiante: number) => {
    const estudianteFiltrado =
      estudiantes &&
      estudiantes.find(
        (estudiante) => estudiante.codigo_estudiante === codigo_estudiante
      );

    return estudianteFiltrado?.primer_nombre
      .concat(
        estudianteFiltrado.segundo_nombre
          ? " " + estudianteFiltrado.segundo_nombre
          : "",
        " " + estudianteFiltrado.apellido_paterno,
        " " + estudianteFiltrado.apellido_materno
      )
      .toUpperCase();
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">CALIFICACIONES</h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <Row style={{ height: "100%" }}>
          <Form.Group className="d-flex " controlId="_calFecLis">
            <Form.Label column style={{ fontWeight: "bold" }} lg={4}>
              FECHA:
            </Form.Label>

            <DatePicker
              className="form-control"
              wrapperClassName="pickers"
              id="_calFecEdit"
              maxDate={new Date()}
              selected={fechaFiltro}
              locale="es"
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setFechaFiltro(date!);
              }}
            />
          </Form.Group>
        </Row>
        <Row className="pt-3">
          <Col>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>ESTUDIANTE</th>
                  <th>Nota P. en Clase</th>
                  <th>Nota Tarea</th>
                  <th>Nota Examen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registro ? (
                  registro
                    .filter(
                      (registro) =>
                        registro.fecha === parseDateToString(fechaFiltro) &&
                        registro.codigo_curso === Number(params.idCurso)
                    )
                    .slice(
                      paginaActual * registrosPorPagina,
                      (paginaActual + 1) * registrosPorPagina
                    )
                    .map((registro, index) => (
                      <tr
                        key={
                          registro.codigo_estudiante + index + registro.fecha
                        }
                      >
                        <td>{retornarNombre(registro.codigo_estudiante)}</td>
                        <td className="texto-centrado">
                          {registro.nota_participacion}
                        </td>
                        <td className="texto-centrado">
                          {registro.nota_tarea}
                        </td>
                        <td className="texto-centrado">
                          {registro.nota_examen}
                        </td>
                        <td className="texto-centrado">
                          <Form.Group className="Boton">
                            <Button
                              style={{
                                background: "#702828",
                                color: "white",
                                border: "1px solid #622425",
                              }}
                              onClick={() =>
                                navigate(`editar/${registro.id}`, {
                                  state: { codigo_bloque: codigo_bloque },
                                })
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
                    <td colSpan={5}>No hay aún calificaciones en esta fecha</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Col className="col-12">
              <div className="paginacion d-flex justify-content-center">
                <PagContrato
                  datos={registro}
                  registrosPorPagina={registrosPorPagina}
                  onPageChange={cambiarPaginaRegistros}
                />
              </div>
            </Col>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter className="d-flex justify-content-end">
        <Form.Group className="BotonCancelar">
          <Button
            onClick={() =>
              navigate(`/misCursos/${codigo_bloque}`, {
                replace: true,
              })
            }
          >
            CERRAR
          </Button>
        </Form.Group>
      </ModalFooter>
      <Outlet />
    </Modal>
  );
};

export default RegistroCompleto;
