import HistorialModel from '../models/historialModelo.js';

class HistorialController {
    async obtenerHistorialCompleto(req, res){
        try{
            const historial = await HistorialModel.obtenerHistorialCompleto();
            res.status(200).json(historial);
        }catch(error){
            console.error('Error al obtener el historial completo:', error);
            res.status(500).json({ error: 'Error al obtener el historial completo' });
        }
    }

async registrarHistorialMantenimiento(req, res) {
  try {
    const { id_orden } = req.params;
    const { fecha_historial, detalles_historial } = req.body;

    // Aseguramos que todos los valores existan
    if (!id_orden || !fecha_historial || !detalles_historial) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const historial = await HistorialModel.registrarHistorialMantenimiento({
      id_orden: Number(id_orden),
      fecha_historial,
      detalles_historial
    });

    res.status(201).json(historial);
  } catch (error) {
    console.error("Error al registrar el historial de mantenimiento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

   async registrarTrabajoMecanico(req, res) {
  const { id_orden } = req.params;
  const { id_mecanico, fecha_inicio_servicio, fecha_fin_servicio, descripcion_trabajo, detalles_adicionales } = req.body;

  console.log("📥 Cuerpo recibido:", req.body);
  console.log("📦 req.body:", req.body);
  console.log("🆔 id_orden (params):", id_orden);

  try {
    const nuevoTrabajo = await HistorialModel.registrarTrabajoMecanico({
      id_mecanico,
      id_orden: Number(id_orden),
      fecha_inicio_servicio,
      fecha_fin_servicio,
      descripcion_trabajo,
      detalles_adicionales
    });
    res.status(201).json(nuevoTrabajo);
  } catch (error) {
    console.error('❌ Error al registrar el trabajo del mecánico:', error);
    res.status(500).json({ error: 'Error al registrar el trabajo del mecánico' });
  }
}

    async obtenerHistorialPorMecanico(req, res){
        const { id_mecanico } = req.params;
        try{
            const historial = await HistorialModel.obtenerHistorialPorMecanico(id_mecanico);
            res.status(200).json(historial);
        }catch(error){
            console.error('Error al obtener el historial por mecánico:', error);
            res.status(500).json({ error: 'Error al obtener el historial por mecánico' });
        }
    }
}

export default new HistorialController();
