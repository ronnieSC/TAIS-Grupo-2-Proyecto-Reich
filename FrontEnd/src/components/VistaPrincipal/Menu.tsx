import { ListGroup, Col, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";

import ElementoLista from "./ElementoLista";
import "../style/Menu.css";
import backgroundImage from "../../assets/menu1.jpg"; // Ruta de la imagen de fondo
import { useEffect, useState } from "react";
import { Usuario } from "../../utilities/UsuarioTipos";
import credencialesApi from "../../api/credenciales.api";

function Menu() {
  const [usuario, setUsuario] = useState<Usuario>();

  useEffect(() => {
    const obtener_datos = async () => {
      const user = await credencialesApi.obtener_datos();
      setUsuario(user);
    };
    obtener_datos();
  }, []);

  return (
    <Col
      lg="2"
      className="menu sidebar p-3 text-start border-end"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      <ListGroup className="list-group-flush">
        <ElementoLista link="/" nombre="Inicio" />
        {usuario?.usuario.rol.nombre === "Administrador" ? (
          <>
            <ElementoLista link="/" nombre="Inicio" />
            <ElementoLista link="/contrato" nombre="Contratos" />
            <ElementoLista link="/estudiante" nombre="Estudiantes" />
            <ElementoLista link="/docente" nombre="Docentes" />
            <ElementoLista link="/clase" nombre="Clases" />
            <ElementoLista link="/curso" nombre="Cursos" />
            <ElementoLista link="/configuracion" nombre="Configuración" />
          </>
        ) : usuario?.usuario.rol.nombre === "Docente" ? (
          <ElementoLista link="/" nombre="Inicio" />
        ) : (
          <></>
        )}
        <Image
          fluid
          width="190"
          className="round float logo-image"
          src={logo}
        ></Image>
      </ListGroup>
    </Col>
  );
}

export default Menu;
