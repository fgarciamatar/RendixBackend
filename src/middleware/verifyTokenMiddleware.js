const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });
    req.user = decoded;
    next();
  });
};

module.exports = verifyTokenMiddleware;
