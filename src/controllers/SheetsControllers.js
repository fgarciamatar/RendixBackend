// src/controllers/superAdminController.js
const { CreateSheetService, getSheetByDateService } = require('../services/SheetsServices');


//PLANILLA
exports.createSheetController = async (req, res) => {
  try {
    const { cashboxId, date } = req.body;
    const sheet = await CreateSheetService({
      cashboxId,
      date,
    });
    res.status(201).json({
      message: "Planilla creada con exito!",
      sheet,
    });
  } catch (error) {
    console.error("Error al crear la planilla:", error);
    res.status(500).json({
      message: error.message || "Error del servidor",
    });
  }
}

exports.getSheetByDateController = async (req, res) => {
  try {
      const { date } = req.params;
    const sheet = await getSheetByDateService(date);
    res.status(200).json({
      message: "Planilla obtenida con exito!",
      sheet,
    });
  } catch (error) {
    console.error("Error al obtener la planilla:", error);
    res.status(500).json({
      message: error.message || "Error del servidor",
    });
  }
}