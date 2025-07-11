
const { User } = require("./../models/index");
exports.editUserService = async ({
  companyName,
  name,
  lastName,
  role,
  password,
  status,
  id,
  dni,
}) => {

  // console.log("DATA",companyName, name, lastName, role, password, status, id, dni);
  
  const usuario = await User.findOne({ where: { id: id } });
  if (!usuario) throw new Error("usuario no encontrado");

  const newUser = await User.update(
    {
      id: dni,
      name,
      lastName,
      role,
      password,
      status,
      companyName,
    },
    { where: { id } }
  );

  return newUser;
};

exports.deleteUserService = async ({ id, name }) => {
  const usuario = await User.findOne({ where: { id: id, name: name } });
  if (!usuario) throw new Error("usuario no encontrada");

  const user = await User.destroy({
    where: { id },
  });

  return user;
};


exports.getUsersService = async ({companyName }) => {
  // const superadmin = await SuperAdmin.findOne();
  // if (!superadmin) throw new Error("SUPERADMIN no encontrado");

  // const passwordMatch = await bcrypt.compare(PIN.toString(), superadmin.password);
  // if (!passwordMatch) throw new Error("PIN incorrecto");

  const user = await Company.findOne({ where: { name: companyName } });
  if (!user) throw new Error(`La user '${companyName}' no fue encontrada`);

  const users = await User.findAll({
    where: { companyId: user.id },
  });

  return users;
};