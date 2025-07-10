// src/controllers/superAdminController.js
const { sendPINEmail } = require("../utils/mailer");
const bcrypt = require("bcrypt");
const { SuperAdmin: SuperAdminModel } = require("./../models/index");
const {editUserService, deleteUserService, getUsersService} = require("../services/superAdminService");

// exports.createSAController = async (req, res) => {
//   try {
//     const email = process.env.GMAIL_USER;
//     const password = process.env.SA_PASSWORD;

//     // Verificar si ya existe un Super Admin con ese email
//     console.log("SuperAdminModel..:", SuperAdminModel);
//     const existing = await SuperAdminModel.findOne({ where: { email } });
//     if (existing) {
//       return res.status(400).json({ message: "El Super Admin ya existe." });
//     }

//     // Crear Super Admin
//     const superAdmin = await SuperAdminModel.create({
//       email,
//       password, // Asume que el modelo tiene hash automático o lo haces antes
//     });
//     res.status(201).json({ message: "Super Admin creado y email enviado ✅", superAdmin });
//   } catch (error) {
//     console.error("Error al crear SUPER ADMIN:", error);
//     res.status(500).json({ error: "Error interno ❌", detalle: error.message });
//   }
// };

function generatePIN() {
  return Math.floor(100000 + Math.random() * 900000);
}
exports.sendPIN = async (req, res) => {
  const pin = generatePIN();
  const hashedPin = await bcrypt.hash(String(pin), 10);

  try {
    const email = process.env.GMAIL_USER;

    const superAdmin = await SuperAdminModel.findOne({ where: { email } });
    if (!superAdmin) {
      return res.status(404).json({ error: "SuperAdmin no encontrado ❌" });
    }

    await SuperAdminModel.update({ password: hashedPin }, { where: { email } });
    await sendPINEmail(pin);
    console.log("PIN generado y enviado:", pin);
    res.json({ message: "PIN enviado exitosamente ✅" });
  } catch (error) {
    console.error("Error al enviar o guardar el PIN:", error);
    res.status(500).json({ error: "Error al procesar el PIN ❌", error });
  }
};

const jwt = require("jsonwebtoken");

exports.verifyPIN = async (req, res) => {
  const { pin } = req.body;

  try {
    const email = process.env.GMAIL_USER;

    const superAdmin = await SuperAdminModel.findOne({ where: { email } });
    if (!superAdmin) {
      return res
        .status(404)
        .json({ valid: false, error: "SuperAdmin no encontrado ❌" });
    }

    const isValid = await bcrypt.compare(String(pin), superAdmin.password);

    if (!isValid) {
      return res.status(401).json({ valid: false, error: "PIN inválido ❌" });
    }

    // ✅ Generar el token
    const token = jwt.sign(
      {
        id: superAdmin.id,
        email: superAdmin.email,
        role: "superadmin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" } // token válido por 30 minutos
    );

    res.json({
      valid: true,
      token,
      message: "PIN verificado correctamente ✅",
    });
  } catch (error) {
    console.error("Error al verificar el PIN:", error);
    res.status(500).json({ valid: false, error: "Error interno ❌" });
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

