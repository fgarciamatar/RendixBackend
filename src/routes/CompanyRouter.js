const { Router } = require("express");
const { createCompanyController } = require("../controllers/CompanyController");
const { createCompanyValidation } = require("../validators/CompanyValidators");
const { validateFields } = require("../middleware/validateFields");

const router = Router();


/**
 * @swagger
 * /createCompany:
 *   post:
 *     summary: Crear nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               
 *     responses:
 *       201:
 *         description: Empresa creada correctamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Empresa ya existe
 */
router.post(
  "/createCompany",
  createCompanyValidation,
  validateFields,
  createCompanyController
);

module.exports = router;
