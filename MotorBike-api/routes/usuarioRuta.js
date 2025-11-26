import UsuarioController from '../controllers/usuarioControlador.js';
import { verifyToken } from '../middlewares/verifyToken.js' // Middleware para verificar el token
import { Router } from 'express';

const router = Router();   

// Rutas para la gestión de usuarios
router.post('/crear', UsuarioController.crearUsuario); // Crear un nuevo usuario
router.get('/roles/obtener', UsuarioController.obtenerRoles); // Obtener todos los roles
router.get('/obtenerPorUid/:uid_firebase', UsuarioController.getUsuarioByUid); // Obtener un usuario por UID Firebase
router.get('/obtener', UsuarioController.obtenerUsuarios); // Obtener todos los usuarios
router.post('/obtenerPorEmail', UsuarioController.obtenerUsuarioPorEmail, verifyToken ); // Obtener un usuario por email y contraseña
router.put('/actualizar/:id_usuario', UsuarioController.actualizarUsuario); // Actualizar un usuario
router.delete('/eliminar/:id_usuario', UsuarioController.eliminarUsuario); // Eliminar un usuario por ID
export default router;