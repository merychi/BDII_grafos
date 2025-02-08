import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { ResultaRuta } from "./ResultadoRuta";
import "./home.css";
import axios from 'axios';


export const Home = () => {
    const [allEstaciones, setAllEstaciones] = useState([]);
    const [selectedEstaciones, setSelectedEstaciones] = useState({ origen: null, destino: null });
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [rutaOptima, setRutaOptima] = useState(null);
    const [mostrarMapa, setMostrarMapa] = useState(false);

    useEffect(() => {
        const loadStations = async () => {
            try {
                console.log("Cargando estaciones...");
                const response = await axios.get("http://localhost:5000/api/estaciones");
                console.log("Estaciones obtenidas:", response.data);
                setAllEstaciones(
                    response.data.map((estacion) => ({
                        label: `${estacion.name} - ${estacion.line}`,
                        value: estacion.id,
                        ...estacion,
                    }))
                );
            } catch (error) {
                console.error("Error obteniendo las estaciones:", error);
            }
        };
        loadStations();
    }, []);

    const handleBuscar = () => {
        console.log("Origen seleccionado:", selectedEstaciones.origen);
        console.log("Destino seleccionado:", selectedEstaciones.destino);

        if (selectedEstaciones.origen && selectedEstaciones.destino) {
            if (selectedEstaciones.origen.value === selectedEstaciones.destino.value) {
                alert("El punto de origen debe ser diferente del destino.");
            } else {

                // Simulación de la ruta óptima
                const rutaSimulada = {
                    path: ["Estación A", "Estación B", "Estación C", "Estación D"],
                    weight: 10.5, // Distancia simulada
                    time: 15.2, // Tiempo estimado
                };

                console.log("Ruta simulada:", rutaSimulada);
                setRutaOptima(rutaSimulada);
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
                        onChange={(selected) => {
                            console.log("Origen seleccionado:", selected);
                            setSelectedEstaciones({ ...selectedEstaciones, origen: selected });
                        }}
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
                        onChange={(selected) => {
                            console.log("Destino seleccionado:", selected);
                            setSelectedEstaciones({ ...selectedEstaciones, destino: selected });
                        }}
                        getOptionLabel={(e) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaRoute style={{ marginRight: 5 }} />
                                {e.label}
                            </div>
                        )}
                    />
                </div>

                <button className="btnIn" onClick={handleBuscar}>
                    Buscar
                </button>
            </div>

            {mostrarResultado && rutaOptima && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={cerrarModal}>X</button>
                        <ResultaRuta
                            puntoOrigen={selectedEstaciones.origen?.label || "Desconocido"}
                            puntoDestino={selectedEstaciones.destino?.label || "Desconocido"}
                            ruta={rutaOptima.path}
                            distancia={rutaOptima.weight}
                            tiempo={rutaOptima.time}
                        />
                    </div>
                </div>
            )}

            <div className="map-btn" onClick={abrirMapa}>
                <button className="btnIn">
                    Ver Mapa
                </button>
            </div>

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
