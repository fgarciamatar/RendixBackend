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
app.use(
  cors({
    origin: "https://rendix.vercel.app", // frontend en Vercel
   credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando en Render");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); // 📡 Acá conectás
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
