const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { SuperAdmin } = require("../models/index");

const saFlagPath = path.join(__dirname, "..", "sa_created.json");

async function createSuperAdminIfNeeded() {
  // Si ya existe el archivo de flag, salir
  if (fs.existsSync(saFlagPath)) {
    console.log("🔒 SuperAdmin ya fue creado previamente. Saltando creación.");
    return;
  }

  const email = process.env.GMAIL_USER;
  const password = process.env.SA_PASSWORD;

  if (!email || !password) {
    console.warn("⚠️ Variables GMAIL_USER o SA_PASSWORD no definidas en .env");
    return;
  }

  const existing = await SuperAdmin.findOne({ where: { email } });

  if (existing) {
    console.log("🔐 SuperAdmin ya existe en la base de datos.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await SuperAdminModel.create({ email, password: hashedPassword });
    console.log("✅ SuperAdmin creado correctamente.");
  }

  // ✅ Guardar archivo de flag
  fs.writeFileSync(saFlagPath, JSON.stringify({ created: true, date: new Date().toISOString() }));
  console.log("📝 Flag de creación de SuperAdmin guardado.");
}

module.exports = createSuperAdminIfNeeded;
