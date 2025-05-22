const { Sheet, CashBox } = require("./../models/index");

exports.CreateSheetService = async ({ cashboxId, date }) => {
  try {
    // Buscar la caja
    const cashBox = await CashBox.findByPk(cashboxId);
    if (!cashBox) throw new Error("Caja no encontrada");

    // Buscar si ya existe una Sheet en esa fecha
    let sheet = await Sheet.findOne({ where: { date } });

    if (!sheet) {
      // Crear una nueva sheet si no existe
      sheet = await Sheet.create({
        date,
        cajaMananaId: cashBox.shift === "morning" ? cashboxId : null,
        cajaTardeId: cashBox.shift === "afternoon" ? cashboxId : null,
      });
    } else {
      // Validar si ya existe una caja asignada en ese turno
      if (cashBox.shift === "morning" && sheet.cajaMananaId) {
        throw new Error(
          "Ya hay una caja asignada en el turno mañana para esta fecha."
        );
      }

      if (cashBox.shift === "afternoon" && sheet.cajaTardeId) {
        throw new Error(
          "Ya hay una caja asignada en el turno tarde para esta fecha."
        );
      }

      // Asignar el cashbox al turno correspondiente
      if (cashBox.shift === "morning") {
        sheet.cajaMananaId = cashboxId;
      } else {
        sheet.cajaTardeId = cashboxId;
      }

      await sheet.save(); // recalcula totalSheet y totalSistema por el hook
    }

    return sheet;
  } catch (error) {
    throw new Error("Error creando la planilla: " + error.message);
  }
};

exports.getSheetByDateService = async (date) => {
  try {
    const sheet = await Sheet.findOne({
      where: { date },
      include: [
        {
          model: CashBox,
          as: "cajaManana",
          include: [
            {
              model: Movement,
              as: "movements", // o 'entradas' y 'salidas' si los tenés separados
            },
            {
              model: CashDetail,
              as: "cashDetail",
            },
          ],
        },
        {
          model: CashBox,
          as: "cajaTarde",
          include: [
            {
              model: Movement,
              as: "movements",
            },
            {
              model: CashDetail,
              as: "cashDetail",
            },
          ],
        },
      ],
    });

    if (!sheet) {
      throw new Error(
        "No se encontró una planilla para la fecha especificada."
      );
    }

    return sheet;
  } catch (error) {
    console.error("Error al obtener la planilla por fecha:", error.message);
    throw new Error("Error al buscar la planilla por fecha: " + error.message);
  }
};
