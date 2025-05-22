const {
  CreateCashDetailService,
  getCashDetailByCashBoxIdService,
  deleteCashDetailByCashBoxIdService,
} = require("../services/CashDetailService");

// Crear detalle de efectivo
exports.createCashDetailController = async (req, res) => {
  try {
    const {
      cashboxId,
      ten,
      twenty,
      fifty,
      hundred,
      twoHundred,
      fiveHundred,
      thousand,
      twoThousand,
      tenThousand,
      twentyThousand,
    } = req.body;
    const cashDetail = await CreateCashDetailService({
      cashboxId,
      ten,
      twenty,
      fifty,
      hundred,
      twoHundred,
      fiveHundred,
      thousand,
      twoThousand,
      tenThousand,
      twentyThousand,
    });
    res.status(201).json({
      message: "Detalle Efectivo creado con exito!",
      cashDetail,
    });
  } catch (error) {
    console.error("Error al crear el detalle efectivo:", error);
    res.status(500).json({
      message: error.message || "Error del servidor",
    });
  }
};

// Obtener detalle de efectivo por ID de caja
exports.getCashDetailByCashBoxIdController = async (req, res) => {
  try {
    const { cashboxId } = req.params;
    const cashDetail = await getCashDetailByCashBoxIdService(cashboxId);
    res.status(200).json(cashDetail);
  } catch (error) {
    console.error("Error al obtener el detalle efectivo:", error);
    res.status(500).json({
      message: error.message || "Error del servidor",
    });
  }
};

// Eliminar detalle por Id caja
exports.deleteCashDetailByCashBoxIdController = async (req, res) => {
  try {
    const { cashboxId } = req.params;
    const cashDetail = await deleteCashDetailByCashBoxIdService(cashboxId);
    res.status(200).json({
      message: "Detalle Efectivo eliminado con exito!",
      cashDetail,
    });
  } catch (error) {
    console.error("Error al eliminar el detalle efectivo:", error);
    res.status(500).json({
      message: error.message || "Error del servidor",
    });
  }
};
