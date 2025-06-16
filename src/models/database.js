require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;


  // 🔗 Modo Railway
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario para Railway
      },
    },
    logging: false,
  });



  // // 🖥️ Modo local
  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USER,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: process.env.DB_HOST,
  //     port: process.env.DB_PORT,
  //     dialect: "postgres",
  //     logging: false,
  //   }
  


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ TODO BIEN EN LA BDD!!");

    await sequelize.sync({ force: false });
    // console.log("🧨 Base de datos reiniciada (force: true)");

  } catch (error) {
    console.error("❌ TODO MAL EN LA BDD :(", error);
  }
}

module.exports = { sequelize, connectDB };
