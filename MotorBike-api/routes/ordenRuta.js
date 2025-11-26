import OrdenController from '../controllers/ordenControlador.js';
import express from 'express';

const router = express.Router();

router.get('/', OrdenController.obtenerOrdenes);
router.put('/:id_orden/estado', OrdenController.actualizarEstado);
router.get('/completadas', OrdenController.obtenerOrdenesCompletadas);
router.get('/pendientes', OrdenController.obtenerOrdenesPendientes);
router.get("/orden/:id", OrdenController.obtenerOrdenPorId);
router.post('/finalizar-mantenimiento/:id_orden', OrdenController.finalizarMantenimiento);

export default router;
