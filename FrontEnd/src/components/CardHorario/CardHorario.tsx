import Card from "react-bootstrap/Card";
import React from "react";
import { Button, Col } from "react-bootstrap";
import "./CardHorario.css"; // Importa el archivo de estilos
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa"; // Importa los iconos
import logo from "../../assets/horario.png";

type CardProps = {
  id: number;
  nombre: string;
};

export const CardComponent: React.FC<CardProps> = ({ nombre, id }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "100%", marginBottom: "1rem", marginRight: "1rem" }}
      className=" permanent-shadow"
    >
      <Col className="columna">
        <div className="card-title-container">
          <div className="col-5">
            <Card.Img variant="top" src={logo} style={{ width: "90%" }} />
          </div>
          <div className="col-6">
            <Card.Title>{nombre}</Card.Title>
          </div>
        </div>
        <div className="botones-container d-flex">
          <div className="w-100">
            <Button
              className="w-100 rounded-0"
              onClick={() => navigate(`ver/${id}`)}
              style={{
                backgroundColor: "#224a73",
                borderColor: "#1f3d55",
                height: "100%",
              }}
            >
              <FaEye />
            </Button>
          </div>
          <div className="w-100">
            <Button
              className="w-100"
              onClick={() => navigate(`eliminar/${id}`)}
              style={{
                backgroundColor: "#622425",
                borderColor: "#4d1b1c",
                height: "100%",
                borderBottomLeftRadius: "0rem",
                borderBottomRightRadius: "0.3rem",
                borderTopRightRadius: "0rem",
                borderTopLeftRadius: "0rem",
              }}
            >
              <FaTrash />
            </Button>
          </div>
        </div>
      </Col>
    </Card>
  );
};
