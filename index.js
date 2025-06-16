const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
require("./src/jobs/inactiveUsers");


const routes = require("./src/routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://rendix-7iqvetyf0-fgarciamatars-projects.vercel.app"
  ],
  credentials: true
}));

// Preflight support
app.options('*', cors({
  origin: [
    "http://localhost:3000",
    "https://rendix-7iqvetyf0-fgarciamatars-projects.vercel.app"
  ],
  credentials: true
}));

// Reforzar headers manualmente (opcional)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://rendix-7iqvetyf0-fgarciamatars-projects.vercel.app"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando en Render');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); // 📡 Acá conectás
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
