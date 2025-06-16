const cron = require("node-cron");
const { User } = require("../models");
const { Op } = require("sequelize");

cron.schedule("0 0 * * *", async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const updated = await User.update(
      { status: "inactive" },
      {
        where: {
          lastTransferAt: { [Op.lt]: sevenDaysAgo },
          status: "active",
        },
      }
    );

    console.log(`⏰ Usuarios inactivos actualizados: ${updated[0]}`);
  } catch (error) {
    console.error("❌ Error al actualizar usuarios inactivos:", error);
  }
});
