import HistorialController from '../controllers/historialControlador.js';
import express from 'express';

const router = express.Router();

// Rutas para el historial de rutas
router.get('/', HistorialController.obtenerHistorialCompleto); // Obtener todos los historiales de rutas
router.post('/trabajo-mecanico/:id_orden', HistorialController.registrarTrabajoMecanico);
router.post('/:id_orden/', HistorialController.registrarHistorialMantenimiento); // Registrar un nuevo historial de mantenimiento
router.post('/trabajo-mecanico', HistorialController.registrarTrabajoMecanico); // Registrar un nuevo trabajo mecánico
router.get('/mecanico/:id_mecanico', HistorialController.obtenerHistorialPorMecanico); // Obtener historial por ID de mecánico

export default router;
// Este archivo define las rutas para el historial de rutas y las asocia con los controladores correspondientes.