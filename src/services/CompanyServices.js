const { Company } = require("../models");

exports.createCompany = async ({ name, superAdminId }) => {
  // Verificar si ya existe una empresa con el mismo nombre
  const existingCompany = await Company.findOne({ where: { name } });
  if (existingCompany) {
    throw new Error("Ya existe una empresa con ese nombre");
  }

  // Crear la empresa
  const company = await Company.create({
    name,
    superAdminId
  });
  console.log(company);
  

  return company;
};
exports.editCompanyServices = async ({ name, newName }) => {
  const existingCompany = await Company.findOne({ where: { name } });

  if (!existingCompany) {
    throw new Error("No existe una empresa con ese nombre");
  }

  // Editar la empresa
  await Company.update(
    { name: newName },         // Nuevos valores
    { where: { name } }        // Condición para encontrar la empresa original
  );
//empresa actualizada
  const updatedCompany = await Company.findOne({ where: { name: newName } });

  return updatedCompany;
}


exports.deleteCompanyServices = async ({ name}) => {
  const existingCompany = await Company.findOne({ where: { name: name } });

  if (!existingCompany) {
    throw new Error("No existe una empresa con ese nombre");
  }

  // Eliminar la empresa
  await Company.destroy(
    { where: { name: name } }        // Condición para encontrar la empresa original
  );


  return existingCompany;
}


exports.getCompaniesServices = async () => {
  const Companies = await Company.findAll();

  if (!Companies) {
    throw new Error("No existen empresas");
  }

  return Companies;
}


