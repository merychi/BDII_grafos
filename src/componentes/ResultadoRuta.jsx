import React from "react";
import "./home.css";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";

export const ResultaRuta = ({ puntoOrigen, puntoDestino, ruta, distancia, tiempo }) => {
    return (
        <div className="container">
            <h1 className="tituloModal">Resultados de la Búsqueda</h1>

            <div className="origenDestinoContainer">
                <p className="subtituloModal">
                    <FaMapMarkerAlt className="iconoTexto" /> Origen: <br /> <strong>{puntoOrigen}</strong>
                </p>
                <p className="subtituloModal">
                    <FaRoute className="iconoTexto" /> Destino: <br /> <strong>{puntoDestino}</strong>
                </p>
            </div>

            {/* Línea azul de fondo */}
            <div className="rutaContainer">
                <div className="lineaBase"></div>
                {ruta.map((estacion, index) => (
                    <div key={index} className="nodoContainer">
                        <FaMapMarkerAlt className="iconoNodo" />
                        <span className="nombreEstacion">{estacion}</span>
                    </div>
                ))}
            </div>

            {/* Información adicional */}
            <div className="infoRuta">
                <p className="subtituloModal">
                    <strong>Distancia recorrida:</strong> {distancia} km
                </p>
                <p className="subtituloModal">
                    <strong>Tiempo estimado:</strong> {tiempo} min
                </p>
            </div>

            <div>
            <texto>Esperamos que disfrute de su viaje</texto>            </div>
        </div>
    );
};
