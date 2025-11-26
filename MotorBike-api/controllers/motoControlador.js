import MotoModel from '../models/motoModelo.js';

class MotoController {
    async crearMoto(req, res) {
        try {
            const { placa_moto, marca_moto, modelo_moto, kilometraje_moto } = req.body;
            const motoCreada = await MotoModel.crearMoto({ placa_moto, marca_moto, modelo_moto, kilometraje_moto });
            res.status(201).json(motoCreada);
        } catch (error) {
            console.error('Error al crear la moto:', error);
            res.status(500).json({ error: 'Error al crear la moto' });
        }
    }

    async agregarMotoACliente(req, res) {
        try {
            const { cedula_cliente } = req.params;
            const { placa_moto } = req.body;
            const motoAgregada = await MotoModel.agregarMotoACliente(cedula_cliente, placa_moto);
            res.status(201).json(motoAgregada);
        } catch (error) {
            console.error('Error al agregar la moto al cliente:', error);
            res.status(500).json({ error: 'Error al agregar la moto al cliente' });
        }
    }

    async obtenerMotos(req, res) {
        try {
            const motos = await MotoModel.obtenerMotos();
            res.status(200).json(motos);
        } catch (error) {
            console.error('Error al obtener las motos:', error);
            res.status(500).json({ error: 'Error al obtener las motos' });
        }
    }

    async obtenerMotoPorPlaca(req, res) {
        try {
            const { placa_moto } = req.params;
            const moto = await MotoModel.obtenerMotoPorPlaca(placa_moto);
            if (moto) {
                res.status(200).json(moto);
            } else {
                res.status(404).json({ error: 'Moto no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener la moto por placa:', error);
            res.status(500).json({ error: 'Error al obtener la moto por placa' });
        }
    }

    async actualizarMoto(req, res) {
        try {
            const { placa_moto } = req.params;
            const { marca_moto, modelo_moto, kilometraje_moto } = req.body;
            const motoActualizada = await MotoModel.actualizarMoto({ placa_moto, marca_moto, modelo_moto, kilometraje_moto });
            if (motoActualizada) {
                res.status(200).json(motoActualizada);
            } else {
                res.status(404).json({ error: 'Moto no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la moto:', error);
            res.status(500).json({ error: 'Error al actualizar la moto' });
        }
    }
    async eliminarMoto(req, res) {
        try {
            const { placa_moto } = req.params;
            const motoEliminada = await MotoModel.eliminarMoto(placa_moto);
            if (motoEliminada) {
                res.status(200).json(motoEliminada);
            } else {
                res.status(404).json({ error: 'Moto no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la moto:', error);
            res.status(500).json({ error: 'Error al eliminar la moto' });
        }
    }
    async obtenerMotoPorCliente(req, res) {
        try {
            const { cedula_cliente } = req.params;
            const motos = await MotoModel.obtenerMotoPorCliente(cedula_cliente);
            if (motos.length > 0) {
                res.status(200).json(motos);
            } else {
                res.status(404).json({ error: 'No se encontraron motos para el cliente' });
            }
        } catch (error) {
            console.error('Error al obtener las motos por cliente:', error);
            res.status(500).json({ error: 'Error al obtener las motos por cliente' });
        }
    }
}

export default new MotoController();
