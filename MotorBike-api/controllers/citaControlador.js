import CitaModel from "../models/citaModelo.js";

class CitaController {
    async crearCita(req, res) {
        try {
        const citaData = req.body; // Asume que los datos de la cita vienen en el cuerpo de la petición
        const resultado = await CitaModel.crearCita(citaData);
        res.status(201).json(resultado);
        } catch (error) {
        console.error("Error al crear cita en el controlador:", error);
        res.status(500).json({ error: "Error al crear cita" });
        }
    }
    
    async getCitasPorHora(req, res) {
        try {
            const { fecha_cita } = req.params;
            const resultado = await CitaModel.getCitasPorHora(fecha_cita);
            res.status(200).json(resultado);
        } catch (error) {
            console.error("Error al obtener cita por hora en el controlador:", error);
            res.status(500).json({ error: "Error al obtener cita por hora" });
        }

    }
    
    async confirmarCita(req, res) {
        try {
        const { id_cita } = req.params; // Asume que el ID de la cita viene en los parámetros de la URL
        const resultado = await CitaModel.confirmarCita(id_cita);
        res.status(200).json(resultado);
        } catch (error) {
        console.error("Error al confirmar cita en el controlador:", error);
        res.status(500).json({ error: "Error al confirmar cita" });
        }
    }

    async obtenerCitasConDetalles(req, res) {
        try {
        const resultado = await CitaModel.obtenerCitasConDetalles();
        res.status(200).json(resultado);
        } catch (error) {
        console.error("Error al obtener citas con detalles en el controlador:", error);
        res.status(500).json({ error: "Error al obtener citas con detalles" });
        }
    }
}

export default new CitaController();