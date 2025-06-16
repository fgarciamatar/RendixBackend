// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // Espera: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Token no válido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegurate de tener esa variable
    req.user = decoded; // Guardás los datos decodificados en el request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;

