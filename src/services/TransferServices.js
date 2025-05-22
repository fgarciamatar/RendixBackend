const { Transfer } = require("./../models/index");
const { Op } = require("sequelize");

exports.createTransferService = async (transferData) => {
  try {
    // Assuming you have a Transfer model defined
    const newTransfer = await Transfer.create(transferData);
    return newTransfer;
  } catch (error) {
    console.error("Error creating transfer in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

exports.changeOfStateTransferService = async (id, status) => {
  try {
    console.log("ID:", id);
    console.log("Estado:", status);

    // Assuming you have a Transfer model defined
    const updatedTransfer = await Transfer.update(
      { status },
      { where: { id } }
    );

    console.log("Transferencia actualizada:", updatedTransfer);

    return updatedTransfer;
  } catch (error) {
    console.error("Error al actualizar el estado de la transferencia:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

exports.getAllTransfersServices = async () => {
  try {
    // Assuming you have a Transfer model defined
    return await Transfer.findAll({
      order: [["id", "DESC"]],
    });
 
  } catch (error) {
    console.error("Error fetching all transfers:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

exports.getTransfersByFiltersService = async (filters) => {
  const where = {};

  // Si llega fecha, filtramos por igualdad exacta
  if (filters.date) {
    // asumimos que filters.date viene en 'YYYY-MM-DD'
    where.date = filters.date;
  }

  // Si llega status, igual exacto
  if (filters.status) {
    where.status = filters.status;
  }

  // Si llega salesman, permitimos búsqueda parcial (case-insensitive)
  if (filters.salesman) {
    where.salesman = { [Op.iLike]: `%${filters.salesman}%` };
  }

  return Transfer.findAll({
    where,
    order: [["id", "ASC"]],
  });
};
