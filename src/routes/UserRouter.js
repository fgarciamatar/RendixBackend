const { Router } = require("express");
const { loginController } = require("../controllers/UserController");
const { registerController, editUserController, deleteUserController, getUsersController } = require("../controllers/UserController");
const { validateFields } = require("../middleware/validateFields");
const { loginValidation, registerValidation, editValidation, deleteValidation, getUsersValidation } = require("../utils/validators/UserValidators");
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleware");


const router = Router();
//loguear
router.post("/login", loginValidation, validateFields, loginController);
//crear
router.post("/register", registerValidation, validateFields, registerController);
 
//editar
router.put("/editUser", editValidation, validateFields, editUserController);
//eliminar
router.post("/deleteUser", deleteValidation, validateFields, deleteUserController);
//traer todos los usuarios por empresa
router.post("/getUsers",getUsersValidation, validateFields, getUsersController);

router.get("/verify-token", verifyTokenMiddleware, (req, res) => {
  // Si llega acá, el token es válido
  res.status(200).json({
    authorized: true,
    user: req.user, 
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // solo en producción
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logout exitoso" });
});

module.exports = router;
