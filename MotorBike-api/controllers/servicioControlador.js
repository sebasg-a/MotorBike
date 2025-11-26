import servicioModel from "../models/servicioModelo.js";

class ServicioController {
    async obtenerTodos(req, res) {
        try {
            const servicios = await servicioModel.obtenerTodos();
            res.status(200).json(servicios);
        } catch (error) {
            console.error("Error al obtener los servicios:", error);
            res.status(500).json({ error: "Error al obtener los servicios" });
        }
    }

    async crearServicio(req, res) {
        try {
            const { nombre_servicio, descripcion_servicio, costo_estimado_servicio, duracion_aproximada_servicio } = req.body;
            const nuevoServicio = await servicioModel.crearServicio({ nombre_servicio, descripcion_servicio, costo_estimado_servicio, duracion_aproximada_servicio });
            res.status(201).json(nuevoServicio);
        } catch (error) {
            console.error("Error al crear el servicio:", error);
            res.status(500).json({ error: "Error al crear el servicio" });
        }
    }
}

export default new ServicioController();