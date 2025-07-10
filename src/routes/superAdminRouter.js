const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");
const {
  sendPIN,
  verifyPIN,
  editUserController,
  deleteUserController,
  getUsersController,
} = require("../controllers/superAdminController");
const {
  editValidation,
  deleteValidation,
  getUsersValidation,
} = require("../utils/validators/UserValidators");
const {
  createCompanyController,
  editCompanyController,
  deletCompanyController,
  getCompaniesController,
} = require("../controllers/CompanyController");
const {
  createCompanyValidation,
  editCompanyValidation,
  deleteCompanyValidation,
} = require("../utils/validators/CompanyValidators");

router.get("/sendPin", sendPIN);
router.post("/verifyPin", verifyPIN);
// router.get("/createSA", createSAController);

//SUPER ADMIN
// Rutas protegidas con JWT
router.use(authSuperAdmin); // Todo lo que sigue requiere token válido


//USUARIOS
router.put("/editUser", editValidation, editUserController);
router.post("/deleteUser", deleteValidation, deleteUserController);
router.post("/getUsers", getUsersValidation, getUsersController);


//Empresas
router.post("/createCompany", createCompanyValidation, createCompanyController);

router.put("/editCompany", editCompanyValidation, editCompanyController);

router.post("/deleteCompany", deleteCompanyValidation, deletCompanyController);


router.get("/getCompanies", getCompaniesController);

module.exports = router;
