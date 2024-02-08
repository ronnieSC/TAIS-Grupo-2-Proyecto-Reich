import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import "../style/Cabecera.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import credencialesApi from "../../api/credenciales.api";
import { Usuario } from "../../utilities/UsuarioTipos";

function Cabecera() {
  const navigate = useNavigate();

  const [ usuario, setUsuario ] = useState<Usuario>()

  useEffect(() => {
    const obtener_datos = async () => {
      const user = await credencialesApi.obtener_datos();
      setUsuario(user);
    };
    obtener_datos();
  }, []);

  const salir = () => {
    window.localStorage.removeItem("tokens");
    navigate("/");
    window.location.reload();
  };

  return (
    <Row className="p-2 border-dark-subtle d-flex align-items-center header-container">
      <Col className="colegio col-9 d-flex align-items-center">
        <Link to="/" className="link-style">
          I.E.P. REICH LA PERLA
        </Link>
      </Col>
      <Col className="col-3">
        <Row className="d-flex align-items-center justify-content-center">
          <Col>
            <AiOutlineUser />
          </Col>
          <Col className="d-flex align-items-center justify-content-center fw-bold">
            {usuario?.usuario.rol.nombre}
          </Col>
          <Col className="d-flex align-items-center justify-content-center fw-bold">
            <Button value="Salir" variant="danger" onClick={salir}>
              <AiOutlineLogout />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Cabecera;
