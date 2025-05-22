const { CashDetail } = require("../models");


// Crear un nuevo detalle de efectivo
exports.CreateCashDetailService = async ({
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
}) => {
  // Verificar si ya existe un detalle con el mismo caja ID
  const existingCashDetail = await CashDetail.findOne({ where: { cashboxId } });
  if (existingCashDetail) {
    throw new Error("Ya existe un Detalle de efectivo para esta caja");
  }

  // Crear el detalle
  const detalleEfectivo = await CashDetail.create({
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

  return detalleEfectivo;
};

//traer detalle por Id caja
exports.getCashDetailByCashBoxIdService = async (cashboxId) => {
  const cashDetail = await CashDetail.findByPk(cashboxId);
  if (!cashDetail) {
    throw new Error("No se encontró el detalle de efectivo");
  }
  return cashDetail;
}

//ELiminar detalle por Id caja
exports.deleteCashDetailByCashBoxIdService = async (cashboxId) => {
  const cashDetail = await CashDetail.findByPk(cashboxId);
  if (!cashDetail) {
    throw new Error("No se encontró el detalle de efectivo");
  }
  await cashDetail.destroy();
  return cashDetail;
}
