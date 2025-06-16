const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
require("./src/jobs/inactiveUsers");
const routes = require("./src/routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://rendix-7iqvetyf0-fgarciamatars-projects.vercel.app"
];

// // Middleware CORS
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// Preflight (OPTIONS) support
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// // Manual CORS headers (backup y para seguridad extra)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use(cors({
  origin: "*",
  credentials: true
}));



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
