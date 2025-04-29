const { body } = require("express-validator");

exports.createCompanyValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la empresa es obligatorio")
];
