const { Router } = require("express");
const { createCompanyController, editCompanyController, deletCompanyController, getCompaniesController } = require("../controllers/CompanyController");
const { createCompanyValidation, editCompanyValidation, deleteCompanyValidation } = require("../utils/validators/CompanyValidators");
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
//CREAR
router.post(
  "/createCompany",
  createCompanyValidation,
  validateFields,
  createCompanyController
);
//EDITAR
router.put(
  "/editCompany",
  editCompanyValidation,
  validateFields,
  editCompanyController
);
//ELIMINAR
router.post(
  "/deleteCompany",
  deleteCompanyValidation,
  validateFields,
  deletCompanyController
);

//Trraer Empresas
router.get(
  "/getCompanies",
  getCompaniesController
);


module.exports = router;
