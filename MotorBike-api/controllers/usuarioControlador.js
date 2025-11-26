import usuarioModel from '../models/usuarioModelo.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UsuarioController {
  async crearUsuario(req, res) {
    try {
      const userData = req.body; // Asume que los datos del usuario vienen en el cuerpo de la petición
      const resultado = await usuarioModel.crearUsuarioConRolYPermisos(userData);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Error al crear usuario en el controlador:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  }

  async getUsuarioByUid(req, res) {
    try {
      const { uid_firebase } = req.params; // Asume que el UID viene en los parámetros de la URL
      const usuario = await usuarioModel.getUsuarioByUid(uid_firebase);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario por UID en el controlador:', error);
      res.status(500).json({ error: 'Error al obtener usuario por UID' });
    }
  }

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await usuarioModel.getUsuariosWithRolesAndPermisos();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios en el controlador:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  async obtenerUsuarioPorEmail(req, res) {
    try {
      const { email, contraseña } = req.body;
  
      const usuario = await usuarioModel.getUsuarioWithEmail(email, contraseña);
  
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const token = jwt.sign(
        {
          email_usuario: usuario.email_usuario,
          id_rol_usuario: usuario.id_rol_usuario
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario
      });
  
    } catch (error) {
      console.error('Error al obtener usuario por email en el controlador:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  async obtenerRoles(req, res) {
    try {
      const roles = await usuarioModel.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error al obtener roles en el controlador:', error);
      res.status(500).json({ error: 'Error al obtener roles' });
    }
  }
  

  async eliminarUsuario(req, res) {
    try {
      const { id_usuario } = req.params; // Asume que el ID del usuario viene en los parámetros de la URL
      const resultado = await usuarioModel.eliminarUsuario(id_usuario);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al eliminar usuario en el controlador:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
  
  async actualizarUsuario(req, res) {
    try {
      const { id_usuario } = req.params; // Asume que el ID del usuario viene en los parámetros de la URL
      const userData = req.body; // Asume que los datos del usuario vienen en el cuerpo de la petición
      const resultado = await usuarioModel.actualizarUsuario(id_usuario, userData);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al actualizar usuario en el controlador:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }
}

export default new UsuarioController();