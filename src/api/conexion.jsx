import axios from "axios";

const API_URL = "http://localhost:7687/stations"; 

export const fetchStations = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.map(station => ({
            value: station.station_id, 
            label: station.name
        }));
    } catch (error) {
        console.error("Error obteniendo las estaciones:", error);
        return [];
    }
};

export const fetchOptimalRoute = async (startID, endID) => {
    try {
        const response = await axios.get(`${API_URL}/ruta-optima/${startID}/${endID}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo la ruta óptima:", error);
        return null;
    }
};
