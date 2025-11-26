import ordenModel from '../models/ordenModelo.js';
import HistorialModel from '../models/historialModelo.js';

class OrdenController {
    async obtenerOrdenes(req, res) {
        try {
            const ordenes = await ordenModel.obtenerOrdenes();
            res.status(200).json(ordenes);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
            res.status(500).json({ error: 'Error al obtener las órdenes' });
        }
    }
    async obtenerOrdenPorId(req, res) {
        const { id } = req.params;
        try {
            const orden = await ordenModel.obtenerOrdenPorId(id);
            res.status(200).json(orden);
        } catch (error) {
            console.error('Error al obtener la orden por ID:', error);
            res.status(500).json({ error: 'Error al obtener la orden por ID' });
        }
    }

 async  actualizarEstado(req, res) {
  try {
    const { id_orden } = req.params;              // viene en la URL
    const { nuevoEstado } = req.body || {};      // viene en el body

    console.log('📩 actualizarEstado -> params:', req.params);
    console.log('📦 actualizarEstado -> body:', req.body);

    if (!id_orden) {
      return res.status(400).json({ message: 'Falta id_orden en params' });
    }
    if (nuevoEstado === undefined || nuevoEstado === null) {
      return res.status(400).json({ message: 'Falta nuevoEstado en body' });
    }

    const updated = await ordenModel.actualizarEstado(Number(id_orden), nuevoEstado);
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error en controlador actualizarEstado:', error);
    return res.status(500).json({ message: 'Error al actualizar estado de la orden' });
  }
}
    async obtenerOrdenesCompletadas(req, res) {
        try {
            const ordenesCompletadas = await ordenModel.obtenerOrdenesCompletadas();
            res.status(200).json(ordenesCompletadas);
            console.log(ordenesCompletadas);
        } catch (error) {
            console.error('Error al obtener las órdenes completadas:', error);
            res.status(500).json({ error: 'Error al obtener las órdenes completadas' });
        }
    }

    async obtenerOrdenesPendientes(req, res) {
        try {
            const ordenesPendientes = await ordenModel.obtenerOrdenesPendientes();
            res.status(200).json(ordenesPendientes);
        } catch (error) {
            console.error('Error al obtener las órdenes pendientes:', error);
            res.status(500).json({ error: 'Error al obtener las órdenes pendientes' });
        }
    }

async finalizarMantenimiento(req, res) {
    try {
        const { id_orden, id_mecanico, descripcion, costo_final, observaciones } = req.body;

        // 1️⃣ Actualizar la orden con costo y observaciones
        const ordenActualizada = await ordenModel.finalizarMantenimiento({
            id_orden,
            costo_final_orden: costo_final,
            observaciones_orden: observaciones,
        });

        // 2️⃣ Registrar el trabajo del mecánico
        await HistorialModel.registrarTrabajoMecanico({
            id_mecanico,
            id_orden,
            fecha_inicio_servicio: new Date(),
            fecha_fin_servicio: new Date(),
            descripcion_trabajo: descripcion,
            detalles_adicionales: observaciones,
        });

        // 3️⃣ Registrar historial general
        await HistorialModel.registrarHistorialMantenimiento({
            id_orden,
            fecha_historial: new Date(),
            detalles_historial: descripcion,
        });

        res.status(200).json({ message: 'Mantenimiento finalizado correctamente', orden: ordenActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al finalizar mantenimiento' });
    }
}
}

export default new OrdenController();