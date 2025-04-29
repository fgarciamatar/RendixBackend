
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Para generar el ID del usuario
const { User, Company } = require('./../models/index');

exports.findUserByCompanyAndName = async (companyName, userName) => {
  const company = await Company.findOne({ where: { name: companyName } });
  if (!company) return null;

  const user = await User.findOne({
    where: {
      name: userName,
      companyId: company.id
    }
  });

  return user;
};


exports.registerUser = async ({ companyName, name, lastName, role, password, status }) => {
  const company = await Company.findOne({ where: { name: companyName } });
  if (!company) throw new Error("Compañía no encontrada");

  const existingUser = await User.findOne({ where: { name, companyId: company.id } });
  if (existingUser) throw new Error("El usuario ya existe en esta compañía");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    id: uuidv4(),
    name,
    lastName,
    role,
    password: hashedPassword,
    status,
    companyId: company.id
  });

  return {
    id: newUser.id,
    name: newUser.name,
    lastName: newUser.lastName,
    role: newUser.role,
    status: newUser.status,
    companyId: newUser.companyId
  };
};
