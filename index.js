const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
require("./src/jobs/inactiveUsers");
const cookieParser = require("cookie-parser");

const routes = require("./src/routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

// 🔐 CORS dinámico según variable FRONT
app.use(
  cors({
    origin: process.env.FRONT || "http://localhost:3000", // FRONT desde .env
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

// 🟢 Ruta de prueba
app.get("/", (req, res) => {
  res.send(`Servidor funcionando en entorno: ${process.env.NODE_ENV || "desarrollo"}`);
});

// 🔥 Puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); // 📡 Conexión a la BDD
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
