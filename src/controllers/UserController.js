require("dotenv").config(); // para leer .env
const { findUserByCompanyAndName } = require("./../services/UserServices");
const { registerUser, editUserService, deleteUserService, getUsersService} = require("../services/UserServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.loginController = async (req, res) => {
  const { companyName, userName, password } = req.body;

  if (!companyName || !userName || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await findUserByCompanyAndName(companyName, userName);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    // 👉 Generar el token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        company: companyName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "22h" }
    );

    // 👉 Setear cookie segura (httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Solo con HTTPS en producción
      sameSite: "Lax", // O "None" si usás dominios cruzados con HTTPS
      maxAge: 22 * 60 * 60 * 1000, // 22 horas en milisegundos
    });

    
    //PRODUCCION
//     res.cookie("token", token, {
//   httpOnly: true,
//   secure: true, // Solo HTTPS
//   sameSite: "None", // Si necesitas cross-site
//   maxAge: 3600000,
// });

    // 👉 También podés devolver los datos por JSON si lo necesitás
    res.status(200).json({
      message: "Login exitoso",
      access: true,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        company: companyName,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error del servidor", access: false });
  }
};

exports.registerController = async (req, res) => {
  const { companyName, name, lastName, role, password, status, id } = req.body;

  if (!companyName || !name || !lastName || !role || !password || !status) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await registerUser({
      companyName,
      name,
      lastName,
      role,
      password,
      status,
      id,
    });
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

exports.editUserController = async (req, res) => {
  const { id, dni, companyName, name, lastName, role, password, status } = req.body;

  if (!id || !dni || !companyName || !name || !lastName || !role || !password || !status) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await editUserService({
      id,
      companyName,
      name,
      lastName,
      role,
      password,
      dni
    });
    res.status(200).json({ message: "Usuario editado exitosamente", user });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};


exports.deleteUserController = async (req, res) => {
  const { id,name} = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await deleteUserService({
      id,
      name
    });
    res.status(200).json({ message: "Usuario eliminado exitosamente", user });
  } catch (error) {
    console.error("Error al eliminar el  usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

exports.getUsersController = async (req, res) => {
  const { companyName } = req.body;

  try {
    const users = await getUsersService({ companyName });
    const userList = users.map((user) => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      companyId: user.companyId,
    }));
    res.status(200).json({ message: "Usuarios encontrados exitosamente", userList });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};
