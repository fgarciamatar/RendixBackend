const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rendix API",
      version: "1.0.0",
      description: "API de Rendix para gestión de Cajas y transferencias"
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local"
      }
    ]
  },
  apis: ["./src/routes/*.js"], // donde están los comentarios con @swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
