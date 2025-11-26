import MecanicoController from '../controllers/mecanicoControlador.js';
import { Router } from 'express';

const router = Router();

// Rutas para el CRUD de mecánicos
router.post('/', MecanicoController.crearMecanico); // Crear un nuevo mecánico
router.post("/ordenes/asignar/", MecanicoController.asignarMecanico);
router.get('/', MecanicoController.obtenerMecanicos); // Obtener todos los mecánicos
router.delete('/:id_mecanico', MecanicoController.eliminarMecanico); // Eliminar un mecánico por ID
router.put('/:id_mecanico', MecanicoController.actualizarMecanico); // Actualizar un mecánico por ID

export default router;