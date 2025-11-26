import sql from '../config/database.js';
import bcrypt from 'bcrypt';

class UsuarioModel {
  async crearUsuarioConRolYPermisos({
    nombre_usuario,
    apellido_usuario,
    telefono_usuario,
    email_usuario,
    uid_firebase,  // 🔹 Ahora recibes el UID desde Firebase
    permisos = []
  }) {
    try {
      return await sql.begin(async (sql) => {
        // 1. Rol por defecto 0
        const idRol = 0;

        // 2. Crear usuario con uid_firebase
        await sql`
          INSERT INTO usuarios (
            email_usuario,
            nombre_usuario,
            apellido_usuario,
            telefono_usuario,
            uid_firebase,       -- 🔹 Guardamos el UID en lugar de la contraseña
            cambio_contrasena,
            id_rol_usuario
          ) VALUES (
            ${email_usuario}, 
            ${nombre_usuario}, 
            ${apellido_usuario}, 
            ${telefono_usuario}, 
            ${uid_firebase},
            CURRENT_TIMESTAMP,
            ${idRol}
          )
        `;

        // 3. Asignar permisos (si aplica)
        for (const permiso of permisos) {
          await sql`
            INSERT INTO permisos_roles (id_rol_usuario, nombre_boton, permitido)
            VALUES (${idRol}, ${permiso.nombre_boton}, ${permiso.permitido})
          `;
        }

        return { success: true, message: 'Usuario creado exitosamente con Firebase UID' };
      });
    } catch (error) {
      console.error('Error al crear usuario, rol y permisos:', error);
      throw error;
    }
  }

 async obtenerRoles(){
    try {
      const usuarios = await sql`
        SELECT u.*, r.nombre_rol_usuario
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
      `;
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios con roles y permisos:', error);
      throw error;
    }
  }

  async getUsuarioByUid(uid_firebase) {
    try {
      const usuario = await sql`
        SELECT u.*, r.nombre_rol_usuario, p.nombre_boton, p.permitido
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
        LEFT JOIN permisos_roles p ON r.id_rol_usuario = p.id_rol_usuario
        WHERE u.uid_firebase = ${uid_firebase}
      `;

      return usuario.length > 0 ? usuario[0] : null;
    } catch (error) {
      console.error('Error al obtener usuario por UID Firebase:', error);
      throw error;
    }
  }

  async getUsuarioLogin(email_usuario, contraseña,cambio_contraseña) {
    try {
      const usuarioResult = await sql`
        SELECT u.*, r.nombre_rol_usuario, p.nombre_boton, p.permitido
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
        LEFT JOIN permisos_roles p ON r.id_rol_usuario = p.id_rol_usuario
        WHERE u.email_usuario = ${email_usuario}
      `;

      if (usuarioResult.length > 0) {
        const usuario = usuarioResult[0];
        const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña_usuario);
        if (passwordMatch) {
          return usuario;
        } else {
          return null; // Contraseña incorrecta
        }
      } else {
        return null; // Usuario no encontrado
      }
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }

  async getUsuarioWithEmail(email_usuario, contraseña) {
    try {
      const usuarioResult = await sql`
        SELECT u.*, r.nombre_rol_usuario, p.nombre_boton, p.permitido
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
        LEFT JOIN permisos_roles p ON r.id_rol_usuario = p.id_rol_usuario
        WHERE u.email_usuario = ${email_usuario}
      `;

      if (usuarioResult.length > 0) {
        const usuario = usuarioResult[0];
        const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña_usuario);
        if (passwordMatch) {
          return usuario;
        } else {
          return null; // Contraseña incorrecta
        }
      } else {
        return null; // Usuario no encontrado
      }
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }
}

export default new UsuarioModel()


