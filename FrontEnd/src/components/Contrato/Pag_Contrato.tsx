import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pag_Contrato.css';

interface PagContratoProps {
    datos: any[]; // Cambia "any[]" por el tipo específico de tus datos
    registrosPorPagina: number;
    onPageChange: (selected: number) => void;
}

const PagContrato: React.FC<PagContratoProps> = ({ datos, registrosPorPagina, onPageChange }) => {
    
    const [paginaActual, setPaginaActual] = useState(0);
    paginaActual

    const cambiarPagina = (selected: { selected: number }) => {
        setPaginaActual(selected.selected);
        onPageChange(selected.selected);
    };

    const pageCount = Math.ceil((datos?.length || 0)  / registrosPorPagina);

    return (
        <div className="table-container"> {/* Agrega la clase "table-container" al contenedor de la tabla */}
            <div className="contendedor-paginacion">
                <ReactPaginate
                    previousLabel={'< Anterior'}
                    nextLabel={'Siguiente >'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={cambiarPagina}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default PagContrato;
