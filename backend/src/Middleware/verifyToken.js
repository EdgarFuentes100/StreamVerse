const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); // 🔹 Ver qué llega

  if (!authHeader) {
    console.log("No se proporcionó token");
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token extraído:", token); // 🔹 Ver el token real

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    console.log("Token decodificado:", decoded); // 🔹 Aquí verás idPerfil, idUsuario, etc.
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error al verificar token:", error.message); // 🔹 Log de error
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;
