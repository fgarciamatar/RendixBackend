const { Transfer, User, Company } = require("./../models/index");
const { Op } = require("sequelize");

// exports.createTransferService = async (transferData) => {
//   try {
//     // Assuming you have a Transfer model defined

//     console.log("Transfer Data:", transferData);

//     const newTransfer = await Transfer.create(transferData);
//     const { salesman } = transferData;
//     await User.update(
//       { lastTransferAt: new Date(), status: "active" },
//       { where: { name: salesman } }
//     );
//     return newTransfer;
//   } catch (error) {
//     console.error("Error creating transfer in service:", error);
//     throw error; // Rethrow the error to be handled in the controller
//   }
// };
exports.createTransferService = async (transferData) => {
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
      receiptImage,
    } = transferData;

    // 1. Buscar el usuario por nombre
    const user = await User.findOne({ where: { name: salesman } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // 2. Crear la transferencia
    const newTransfer = await Transfer.create({
      numberOperation,
      salesman,
      clientNumber,
      clientName,
      dateTransfer,
      dateOfLoading,
      amount,
      originBank,
      destinationBank,
      receiptImage,
    });

    // 3. Asociar el usuario con la transferencia
    await newTransfer.addUser(user); // Sequelize se encarga de usar la tabla intermedia

    // 4. (Opcional) Actualizar estado del usuario
    await user.update({
      lastTransferAt: new Date(),
      status: "active",
    });

    return newTransfer;
  } catch (error) {
    console.error("Error creating transfer in service:", error);
    throw error;
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

exports.getAllTransfersServices = async (companyName) => {
  try {
    // Buscar la empresa por nombre
    const company = await Company.findOne({ where: { name: companyName } });

    if (!company) {
      throw new Error(`Empresa "${companyName}" no encontrada`);
    }

    // Obtener transferencias de usuarios que pertenezcan a esa empresa
    return await Transfer.findAll({
      include: {
        model: User,
        where: { companyId: company.id },
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      order: [["id", "DESC"]],
    });
  } catch (error) {
    console.error("Error fetching all transfers:", error);
    throw error;
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

exports.deleteAllTransfersService = async () => {
  try {
    // Assuming you have a Transfer model defined
    const deletedCount = await Transfer.destroy({
      where: {},
      truncate: true, // This will delete all records
    });
    return deletedCount;
  } catch (error) {
    console.error("Error deleting all transfers:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};
