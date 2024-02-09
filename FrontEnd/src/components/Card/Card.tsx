import Card from 'react-bootstrap/Card';
import React from "react";
import { Button } from 'react-bootstrap';
import logo from "../../assets/carpeta.png";
import './Card.css'; // Importa el archivo de estilos
import { useNavigate } from 'react-router-dom';

type CardProps = {
    codigo_bloque: number;
    seccion: string;
    nombre: string;
}

export const CardComponent: React.FC<CardProps> = ({codigo_bloque,seccion,nombre}) => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate(`${codigo_bloque}`)} variant="link" className="card-hover" style={{ padding: 0, border: 'none', textAlign: 'center', textDecoration: 'none' , margin: "1rem"}}>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={logo} style={{ width: '50%', height: '50%', margin: 'auto' }}/>
                <Card.Body style={{ paddingTop: 0, border: 'none', textAlign: 'center', textDecoration: 'none' }}>
                    <Card.Text style={{ marginBottom: "0%"}}>
                        {seccion} 
                    </Card.Text>
                    <Card.Title>{nombre}</Card.Title>
                </Card.Body>
            </Card>
        </Button>

    )
}