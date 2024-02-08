import {  Image } from "react-bootstrap";
import { Container, Row, Col} from "react-bootstrap"
import Menu from "../../components/VistaPrincipal/Menu";
import Cabecera from "../../components/VistaPrincipal/Cabecera";
import logo from "../../assets/logo.png";

const Inicio: React.FC = () => {
  return (
    <Container fluid className="vh-100">
      <Cabecera />
      <Row className="vh-100">
        <Menu />
        <Col lg="10" className="d-flex justify-content-center align-items-center">
          <Row className="mt-n4">
            <Col lg="12" className="d-flex justify-content-center pb-5">
              <Image
                fluid
                width="200px"
                height="150px"
                className="logo-inicio float-start"
                src={logo}
              ></Image>
            </Col>
            <Col lg="12" className="d-flex justify-content-center align-items-center">
              <p style={{ fontSize:'20px'}}>
                <b>SISTEMA WEB PARA LA GESTIÓN DE LOS PROCESOS ADMINISTRATIVO,
                ACADÉMICO Y CONTABLE 
                <br /> I.E. REICH LA PERLA - AREQUIPA </b>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Inicio;
