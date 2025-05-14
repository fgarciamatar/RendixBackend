const { Router } = require("express");
const { loginController } = require("../controllers/UserController");
const { registerController, editUserController, deleteUserController, getUsersController } = require("../controllers/UserController");
const { validateFields } = require("../middleware/validateFields");
const { loginValidation, registerValidation, editValidation, deleteValidation, getUsersValidation } = require("../utils/validators/UserValidators");
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleware");


const router = Router();
//loguear
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Faltan campos obligatorios
 *       401:
 *         description: Contraseña inválida
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/login", loginValidation, validateFields, loginController);
//crear
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - password
 *               - role
 *               - companyId
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, cashier, salesman]
 *               companyId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Usuario ya existe
 */

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
