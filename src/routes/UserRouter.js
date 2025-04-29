const { Router } = require("express");
const { loginController } = require("../controllers/UserController");
const { registerController } = require("../controllers/UserController");
const { validateFields } = require("../middleware/validateFields");
const { loginValidation, registerValidation } = require("../validators/UserValidators");



const router = Router();

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




module.exports = router;
