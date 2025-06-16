const {
  createTransferService,
  changeOfStateTransferService,
  getAllTransfersServices,
  getTransfersByFiltersService,
  deleteAllTransfersService
} = require("../services/TransferServices");
exports.createTransferController = async (req, res) => {
  try {
    const {
      numberOperation,
      salesman,
      clientNumber,
      clientName,
      dateTransfer,
      dateOfLoading,
      amount,
      originBank,
      destinationBank,
      
    } = req.body;

    const receiptImage = req.file?.path || null; // URL de Cloudinary
    console.log("amountController", isNaN(amount));
    
    if (
      !numberOperation ||
      !salesman ||
      !clientNumber ||
      !clientName ||
      !dateTransfer ||
      !dateOfLoading ||
      !amount ||
      !originBank ||
      !destinationBank
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const newTransfer = await createTransferService({
      numberOperation,
      salesman,
      clientNumber,
      clientName,
      dateTransfer,
      dateOfLoading,
      amount: Number(amount), // Aseguramos que amount sea un número
      originBank,
      destinationBank,
      receiptImage,
    });

    return res.status(201).json(newTransfer);
  } catch (error) {
    console.error("Error creando transferencia:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.changeStateTransferController = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Validate required fields
    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    // Update the transfer status
    const updatedTransfer = await changeOfStateTransferService(id, status);
    if (!updatedTransfer) {
      return res
        .status(404)
        .json({ message: "No se pudo cambiar el estado de la transferencia" });
    }
  } catch (error) {
    console.error("Error updating transfer status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTransfersController = async (req, res) => {
  try {
    const transfers = await getAllTransfersServices();

    // console.log("Transfers fetched:", transfers);
    

    return res.status(200).json(transfers);
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransfersByFiltersController = async (req, res) => {
  try {
    const { date, status, salesman } = req.query;

    // Al menos un filtro
    if (!date && !status && !salesman) {
      return res
        .status(400)
        .json({ message: "At least one filter is required" });
    }

    const transfers = await getTransfersByFiltersService({
      date,
      status,
      salesman,
    });
    return res.status(200).json(transfers);
  } catch (error) {
    console.error("Error fetching transfers by filters:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAllTransferController = async (req, res) => {
  try {
const deleteTransfers =  await deleteAllTransfersService();
    return res.status(200).json({ message: "All transfers deleted successfully",deleteTransfers });
  } catch (error) {
    console.error("Error deleting all transfers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
