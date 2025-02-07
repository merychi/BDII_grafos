import "./home.css";
import React from "react";

export const ResultaRuta = ({ puntoOrigen, puntoDestino, resultado }) => {
    return (
        <div>
            <h1 className="tituloModal">
                Resultados de la Búsqueda
            </h1>
    
            <div className="origenDestinoContainer">
                <p className="subtituloModal">
                    Origen: <strong>{puntoOrigen}</strong>
                </p>
                <p className="subtituloModal">
                    Destino: <strong>{puntoDestino}</strong>
                </p>
            </div>

            <p className="subtituloModal">
                <strong>Resultado:</strong> {resultado}
            </p>
        </div>
    );
};
