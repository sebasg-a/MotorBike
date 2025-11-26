import ClienteController from '../controllers/clienteControlador.js';
import express from 'express';

const router = express.Router();

// Rutas para el cliente
router.get('/', ClienteController.getAllClientes); // Obtener todos los clientes
router.get('/:id', ClienteController.getClienteById); // Obtener un cliente por ID
router.post('/', ClienteController.createClienteConMoto); // Crear un nuevo cliente
router.put('/:id', ClienteController.updateCliente); // Actualizar un cliente por ID
router.delete('/:id', ClienteController.deleteCliente); // Eliminar un cliente por ID

export default router;