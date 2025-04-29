const { findUserByCompanyAndName } = require('./../services/UserServices');
const { registerUser } = require("../services/UserServices");
const bcrypt = require('bcrypt');

exports.loginController = async (req, res) => {
  const { companyName, userName, password } = req.body;

  console.log(userName);
  
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
      return res.status(401).json({ message: "Cotraseña Invalida" });
    }

    // Aquí podrías generar un token si quisieras
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        companyId: user.companyId
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.registerController = async (req, res) => {
  const { companyName, name, lastName, role, password, status } = req.body;

  if (!companyName || !name || !lastName || !role || !password || !status) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await registerUser({ companyName, name, lastName, role, password, status });
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

