import React, { useState } from "react";
import Select from "react-select";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa"; // Importar iconos de React Icons
import { ResultaRuta } from "./ResultadoRuta";
import "./home.css";

export const Home = () => {
    const [allEstaciones, setAllEstaciones] = useState([
        { label: "Estación A", value: "estacion_a" },
        { label: "Estación B", value: "estacion_b" },
        { label: "Estación C", value: "estacion_c" },
        { label: "Estación D", value: "estacion_d" },
        { label: "Estación E", value: "estacion_e" }
    ]);
    const [selectedEstaciones, setSelectedEstaciones] = useState({ origen: null, destino: null });
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [mostrarMapa, setMostrarMapa] = useState(false);

    const handleBuscar = () => {
        if (selectedEstaciones.origen && selectedEstaciones.destino) {
            if (selectedEstaciones.origen.value === selectedEstaciones.destino.value) {
                alert("El punto origen debe ser diferente al punto de destino.");
            } else {
                setMostrarResultado(true);
            }
        } else {
            alert("Por favor, seleccione tanto el origen como el destino.");
        }
    };

    const cerrarModal = () => {
        setMostrarResultado(false);
    };

    const abrirMapa = () => {
        setMostrarMapa(true);
    };

    const cerrarMapa = () => {
        setMostrarMapa(false);
    };

    const customSingleValue = ({ data }) => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                {data.value === "estacion_a" || data.value === "estacion_b" ? (
                    <FaMapMarkerAlt style={{ marginRight: 5 }} />
                ) : (
                    <FaRoute style={{ marginRight: 5 }} />
                )}
                {data.label}
            </div>
        );
    };

    return (
        <div>
            <div className="textosPrincipales">
                <h1 className="titulo">Rutas Caracas</h1>
                <p className="subtitulo">Busca la Ruta más Óptima</p>
            </div>

            <div>
                <p className="texto">Indique su punto de origen y el destino</p>

                <div className="select-container">
                    <Select
                        name="origen"
                        placeholder="Punto Origen"
                        isClearable
                        options={allEstaciones}
                        value={selectedEstaciones.origen}
                        onChange={(selected) => setSelectedEstaciones({ ...selectedEstaciones, origen: selected })}
                        getOptionLabel={(e) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaMapMarkerAlt style={{ marginRight: 5 }} />
                                {e.label}
                            </div>
                        )}
                    />

                    <Select
                        name="destino"
                        placeholder="Punto Destino"
                        isClearable
                        options={allEstaciones}
                        value={selectedEstaciones.destino}
                        onChange={(selected) => setSelectedEstaciones({ ...selectedEstaciones, destino: selected })}
                        getOptionLabel={(e) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaRoute style={{ marginRight: 5 }} />
                                {e.label}
                            </div>
                        )}
                    />
                </div>


                <button className="btnIn" onClick={handleBuscar}>Buscar</button>
            </div>

            {/* Mostrar el modal solo si se hizo una búsqueda */}
            {mostrarResultado && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={cerrarModal}>X</button>
                        <ResultaRuta
                            puntoOrigen={selectedEstaciones.origen?.label || "Desconocido"}
                            puntoDestino={selectedEstaciones.destino?.label || "Desconocido"}
                            resultado="Ruta Óptima A - B"
                        />
                    </div>
                </div>
            )}

            {/* Imagen en la esquina superior derecha como botón */}
            <div className="map-btn" onClick={abrirMapa}>
                <button className="btnIn">
                    Ver Mapa
                </button>
            </div>

            {/* Modal para mostrar la imagen del mapa */}
            {mostrarMapa && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={cerrarMapa}>X</button>
                        <img
                            src="src/assets/Mapa.gif"
                            alt="Mapa de Rutas"
                            className="zoom-img"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
