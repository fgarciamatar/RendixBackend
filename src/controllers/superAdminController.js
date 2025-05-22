// src/controllers/superAdminController.js
const { sendPINEmail } = require("../utils/mailer");
const bcrypt = require("bcrypt");
const { SuperAdmin: SuperAdminModel } = require("./../models/index");

exports.createSAController = async (req, res) => {
  try {
    const email = process.env.GMAIL_USER;
    const password = process.env.SA_PASSWORD;

    // Verificar si ya existe un Super Admin con ese email
    console.log("SuperAdminModel..:", SuperAdminModel);
    const existing = await SuperAdminModel.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "El Super Admin ya existe." });
    }

    // Crear Super Admin
    const superAdmin = await SuperAdminModel.create({
      email,
      password, // Asume que el modelo tiene hash automático o lo haces antes
    });
    res.status(201).json({ message: "Super Admin creado y email enviado ✅" });
  } catch (error) {
    console.error("Error al crear SUPER ADMIN:", error);
    res.status(500).json({ error: "Error interno ❌", detalle: error.message });
  }
};

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
    res.json({ valid: isValid });
  } catch (error) {
    console.error("Error al verificar el PIN:", error);
    res.status(500).json({ valid: false, error: "Error interno ❌", error });
  }
};
