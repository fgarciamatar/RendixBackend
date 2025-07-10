const { Router } = require("express");
const { loginController } = require("../controllers/UserController");
const { registerController, editUserController, deleteUserController, getUsersController, refreshTokenController  } = require("../controllers/UserController");
const { validateFields } = require("../middleware/validateFields");
const { loginValidation, registerValidation, getUsersValidation } = require("../utils/validators/UserValidators");
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleware");


const router = Router();
//loguear
router.post("/login", loginValidation, validateFields, loginController);
//crear
router.post("/register", registerValidation, validateFields, registerController);
 
//traer todos los usuarios por empresa
router.post("/getUsers-Admin",getUsersValidation, validateFields, getUsersController);

router.get("/verify-token", verifyTokenMiddleware, (req, res) => {
  // Si llega acá, el token es válido
  res.status(200).json({
    authorized: true,
    user: req.user, 
  });
});

router.post("/refresh-token", refreshTokenController );

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None", // 👈 debe coincidir con el login
    path: "/",
  });

  res.status(200).json({ message: "Logout exitoso" });
});


module.exports = router;

