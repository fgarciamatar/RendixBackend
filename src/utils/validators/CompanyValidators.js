const { body } = require("express-validator");

exports.createCompanyValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la empresa es obligatorio")
];

exports.editCompanyValidation = [
  body("name")
  .notEmpty()
  .withMessage("El nombre de la empresa es obligatorio"),

  body("newName")
  .notEmpty()
  .withMessage("El nombre de la empresa es obligatorio")
]


exports.deleteCompanyValidation = [
  body("name")
  .notEmpty()
  .withMessage("El nombre de la empresa es obligatorio")
]

