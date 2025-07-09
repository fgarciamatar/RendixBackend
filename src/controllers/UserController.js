require("dotenv").config(); // para leer .env
const { findUserByCompanyAndName } = require("./../services/UserServices");
const {
  registerUser,
  editUserService,
  deleteUserService,
  getUsersService,
} = require("../services/UserServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {
  const { companyName, userName, password } = req.body;

  // 🚫 Validación de campos vacíos
  if (!companyName || !userName || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // 🧑 Buscar el usuario por empresa y nombre
    const user = await findUserByCompanyAndName(companyName, userName);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // // 🔎 LOG DE DEPURACIÓN
    // console.log("➡️ Usuario encontrado:", user);
    // console.log("➡️ Contraseña del usuario:", user.password);

    // 🚫 Validar que tenga contraseña válida
    if (!user.password || typeof user.password !== "string") {
      return res
        .status(400)
        .json({ message: "El usuario no tiene contraseña válida" });
    }

    // 🔐 Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const EXPIRE_HOURS = 22;
    // ✅ SOLO SI TODO PASA, generar el token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        company: companyName,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${EXPIRE_HOURS}h` }
    );

    // ✅ Setear cookie solo si pasó todo
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: EXPIRE_HOURS * 60 * 60 * 1000,
    });

    // 🟢 Enviar respuesta con datos del usuario
    return res.status(200).json({
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
    return res
      .status(500)
      .json({ message: "Error del servidor", access: false });
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
  const { id, dni, companyName, name, lastName, role, password, status } =
    req.body;

  if (
    !id ||
    !dni ||
    !companyName ||
    !name ||
    !lastName ||
    !role ||
    !password ||
    !status
  ) {
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
      dni,
    });
    res.status(200).json({ message: "Usuario editado exitosamente", user });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

exports.deleteUserController = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await deleteUserService({
      id,
      name,
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
      lastTransferAt: user.lastTransferAt,
    }));
    res
      .status(200)
      .json({ message: "Usuarios encontrados exitosamente", userList });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

exports.refreshTokenController = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Podés agregar verificación de expiración cercana (opcional)

    const newToken = jwt.sign(
      {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        company: decoded.company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "22h" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 22 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Token renovado" });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
