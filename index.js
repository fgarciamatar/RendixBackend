const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./src/routes/index");
const sequelize = require("./sequelize");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

const PORT = process.env.PORT || 3000; // Si no está definido, usa 3000

// Primero conectar a la base de datos, luego iniciar el server
sequelize.sync({ alter: true }).then(() => {
  console.log("Modelos sincronizados con la base de datos ✅");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch((error) => {
  console.error("Error al sincronizar la base de datos ❌", error);
});
