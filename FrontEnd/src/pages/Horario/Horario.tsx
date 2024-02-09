import { Outlet, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
//import { FaCalendarAlt } from "react-icons/fa";
import "./Horario.css";
//import { InformacionHorario } from '../../utilities/HorarioTipo';
import { CardComponent } from "../../components/CardHorario/CardHorario";
//import { obtenerBloquesDesdeAPI } from '../../utilities/HorarioService';
import { Button } from "reactstrap";
import { HorarioGuardado } from "../../utilities/HorarioTipo";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Errors } from "../../utilities/utils";

const Horario = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as HorarioGuardado[];

  const obtenerNombreGrado = (codigoGrado: number) => {
    switch (codigoGrado) {
      case 1:
        return "Primero";
      case 2:
        return "Segundo";
      case 3:
        return "Tercero";
      case 4:
        return "Cuarto";
      case 5:
        return "Quinto";
      case 6:
        return "Sexto";
      default:
        return "Desconocido";
    }
  };

  const obtenerNombreNivel = (codigoNivel: number) => {
    switch (codigoNivel) {
      case 1:
        return "Primaria";
      case 2:
        return "Secundaria";
      default:
        return "Desconocido";
    }
  };

  const actionData = useActionData() as Errors;

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el horario");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el horario");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el horario");
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
            <Form.Group className="BotonNuevoHorario">
              <div className="horarioTitulo">HORARIOS</div>
              <Button id="_conCrearBtn" onClick={() => navigate("crear")}>
                NUEVO HORARIO
              </Button>
            </Form.Group>

            <Form.Group
              className="Cards"
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {data.map(
                (_, index) =>
                  // Verifica si el índice es divisible por 3 (cada tercer elemento)
                  index % 3 === 0 && (
                    // Si es divisible por 3, crea una nueva fila
                    <Row key={index}>
                      {[0, 1, 2].map(
                        (offset) =>
                          // Mapea las tarjetas en la fila actual
                          data[index + offset] && (
                            <Col md={4} key={index + offset}>
                              <CardComponent
                                nombre={`${obtenerNombreGrado(
                                  data[index + offset].codigo_grado
                                )} de ${obtenerNombreNivel(
                                  data[index + offset].codigo_nivel
                                )}`}
                                id={data[index + offset].id}
                              />
                            </Col>
                          )
                      )}
                    </Row>
                  )
              )}
            </Form.Group>
          </Form.Group>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Horario;
