import { Col, Container, Form, Row } from "react-bootstrap";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { InformacionBloques } from "../../../utilities/HorarioTipo";
import PrimerHorario from "./PrimerHorario";
import SegundoHorario from "./SegundoHorario";
import Cabecera from "../../../components/VistaPrincipal/Cabecera";
import Menu from "../../../components/VistaPrincipal/Menu";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Errors } from "../../../utilities/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerHorario = () => {
  const actionData = useActionData() as Errors;
  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el bloque");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el bloque");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el bloque");
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

  const navigate = useNavigate();
  const { Horario, BloqueApi, DocenteApi, cursoDataApi, ActividadDataApi } =
    useLoaderData() as InformacionBloques;

  let componenteMostrado = null;

  if (
    Horario?.codigo_grado === 3 ||
    Horario?.codigo_grado === 4 ||
    Horario?.codigo_grado === 5
  ) {
    componenteMostrado = (
      <PrimerHorario
        bloquesData={BloqueApi}
        docenteData={DocenteApi}
        cursoData={cursoDataApi}
        actividadData={ActividadDataApi}
        idHorario={Horario.id || 0}
      />
    );
  } else if (
    Horario?.codigo_grado === 1 ||
    Horario?.codigo_grado === 2 ||
    Horario?.codigo_grado === 6
  ) {
    componenteMostrado = (
      <SegundoHorario
        bloquesData={BloqueApi}
        docenteData={DocenteApi}
        cursoData={cursoDataApi}
        actividadData={ActividadDataApi}
        idHorario={Horario.id || 0}
      />
    );
  }

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
            <Form.Group
              className="mb-3 text-center"
              controlId="_curNom"
              as={Row}
            >
              <Form.Label column lg="12" style={{ fontWeight: "bold" }}>
                <Row>
                  <Col
                    md={3}
                    onClick={() => navigate("/horarios")}
                    style={{ cursor: "pointer" }}
                  >
                    <IoChevronBackCircleOutline
                      style={{ fontSize: "2.5rem" }}
                    />
                  </Col>
                  <Col md={7}>HORARIO</Col>
                </Row>
              </Form.Label>
              <Col className="d-flex justify-content-center align-items-center">
                <Row className="mb-8">{componenteMostrado}</Row>
              </Col>
            </Form.Group>
          </Form.Group>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default VerHorario;
