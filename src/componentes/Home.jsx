import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { ResultaRuta } from "./ResultadoRuta";
import "./home.css";
import axios from "axios";

export const Home = () => {
    const [allEstaciones, setAllEstaciones] = useState([]);
    const [selectedEstaciones, setSelectedEstaciones] = useState({ origen: null, destino: null });
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [rutaOptima, setRutaOptima] = useState(null);
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStations = async () => {
            try {
                console.log("Cargando estaciones...");
                const response = await axios.get("http://localhost:5000/stations/");
                console.log("Estaciones obtenidas:", response.data);
                setAllEstaciones(response.data.map((estacion) => ({
                    label: `${estacion.name} - ${estacion.line}`,
                    value: estacion.station_id,
                    ...estacion,
                })));
            } catch (error) {
                console.error("Error obteniendo las estaciones:", error);
                setError("No se pudieron cargar las estaciones. Intenta nuevamente.");
            }
        };
        loadStations();
    }, []);
    

    const handleBuscar = useCallback(async () => {
        const { origen, destino } = selectedEstaciones;
    
        if (!origen || !origen.value || !destino || !destino.value) {
            setError("Por favor, seleccione tanto el origen como el destino.");
            return;
        }
    
        console.log("Origen seleccionado:", origen);
        console.log("Destino seleccionado:", destino);
    
        if (origen.value === destino.value) {
            setError("El punto de origen debe ser diferente del destino.");
            return;
        }
    
        try {
            setLoading(true);
            console.log("Buscando ruta óptima...");
            const response = await axios.get(
                `http://localhost:5000/stations/ruta-optima/${origen.value}/${destino.value}`
            );
            console.log("Ruta óptima obtenida:", response.data);
            setRutaOptima(response.data);
            setMostrarResultado(true);
        } catch (error) {
            console.error("Error obteniendo la ruta óptima:", error);
            setError("No se pudo obtener la ruta óptima. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [selectedEstaciones]);    
    
    

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
                value={selectedEstaciones.origen || null}
                onChange={(selected) => {
                    console.log("Origen cambiado a:", selected);
                    setSelectedEstaciones(prev => ({ ...prev, origen: selected }));
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
                value={selectedEstaciones.destino || null}
                onChange={(selected) => {
                    console.log("Destino cambiado a:", selected);
                    setSelectedEstaciones(prev => ({ ...prev, destino: selected }));
                }}
                getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaRoute style={{ marginRight: 5 }} />
                        {e.label}
                    </div>
                )}
            />

                </div>

                {error && <p className="error-message">{error}</p>}

                <button className="btnIn" onClick={handleBuscar} disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {mostrarResultado && rutaOptima?.data?.path?.length > 0 && (
            <div className="modal">
                <div className="modal-content">
                    <button className="close-btn" onClick={() => setMostrarResultado(false)}>X</button>

                    <ResultaRuta
                        puntoOrigen={selectedEstaciones.origen?.label || "Desconocido"}
                        puntoDestino={selectedEstaciones.destino?.label || "Desconocido"}
                        ruta={rutaOptima?.data?.path || []}
                        distancia={rutaOptima?.data?.weight || "Desconocido"}
                        tiempo={rutaOptima?.data?.time || "Desconocido"}
                    />
                </div>
            </div>
        )}

            <div className="map-btn">
                <button className="btnIn" onClick={() => setMostrarMapa(true)}>Ver Mapa</button>
            </div>

            {mostrarMapa && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setMostrarMapa(false)}>X</button>
                        <img
                            src="src/assets/Mapa.gif"
                            alt="Mapa de Rutas"
                            className="zoom-img"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
