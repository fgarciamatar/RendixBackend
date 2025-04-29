const { Company } = require("../models");

exports.createCompany = async ({ name }) => {
  // Verificar si ya existe una empresa con el mismo nombre
  const existingCompany = await Company.findOne({ where: { name } });
  if (existingCompany) {
    throw new Error("Ya existe una empresa con ese nombre");
  }

  // Crear la empresa
  const company = await Company.create({
    name
  });

  return company;
};
