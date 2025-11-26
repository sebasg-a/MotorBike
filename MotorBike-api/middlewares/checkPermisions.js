function checkPermissions(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !req.user.id_rol_usuario) {
        return res.status(401).json({ error: 'Token no válido o usuario no autenticado.' });
      }
  
      // Verifica si el rol del usuario está entre los roles permitidos
      const tienePermiso = allowedRoles.includes(req.user.id_rol_usuario);
  
      if (!tienePermiso) {
        return res.status(403).json({ error: 'Acceso denegado. No tiene permisos suficientes.' });
      }
  
      next();
    };
  }

  export default checkPermissions;