const { body } = require("express-validator");

exports.registerValidation = [
  body("companyName").notEmpty().withMessage("El nombre de la empresa es obligatorio"),
  body("name").notEmpty().withMessage("El nombre del usuario es obligatorio"),
  body("lastName").notEmpty().withMessage("El apellido es obligatorio"),
  body("role")
    .isIn(["salesman", "cashier", "admin"])
    .withMessage("El rol debe ser salesman, cashier o admin"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("El estado debe ser active o inactive")
];


exports.loginValidation = [
    body("companyName").notEmpty().withMessage("El nombre de la empresa es obligatorio"),
    body("userName").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria")
  ];
  