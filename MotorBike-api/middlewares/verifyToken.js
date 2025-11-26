import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Verifica si hay un header de autorización y que use el esquema "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado o malformado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar el usuario decodificado en el request (para usarlo después)
    req.user = decodedPayload;

    next(); // Continuar con la siguiente función del middleware
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Token inválido.' });
    }

    console.error('Error al verificar el token:', error);
    return res.status(500).json({ error: 'Error interno al verificar el token.' });
  }
}

export default verifyToken;
export { verifyToken };