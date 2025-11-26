import MotoController from '../controllers/motoControlador.js';
import express from 'express';

const router = express.Router();

// Rutas para el CRUD de motos
router.post('/', MotoController.crearMoto); // Crear una nueva moto
router.post('/cliente/:cedula_cliente', MotoController.agregarMotoACliente); // Agregar una moto a un cliente
router.get('/', MotoController.obtenerMotos); // Obtener todas las motos
router.get('/cliente/:cedula_cliente', MotoController.obtenerMotoPorCliente); // Obtener motos por cédula de cliente
router.get('/:placa_moto', MotoController.obtenerMotoPorPlaca); // Obtener una moto por placa
router.put('/:placa_moto', MotoController.actualizarMoto); // Actualizar una moto por placa
router.delete('/:placa_moto', MotoController.eliminarMoto); // Eliminar una moto por placa


export default router;