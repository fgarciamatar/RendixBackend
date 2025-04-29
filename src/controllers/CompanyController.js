const { createCompany } = require("../services/CompanyServices");

exports.createCompanyController = async (req, res) => {
  const { name} = req.body;

  try {
    const company = await createCompany({ name });
    res.status(201).json({
      message: "Empresa creada con éxito",
      company
    });
  } catch (error) {
    console.error("Error al crear la empresa:", error);
    res.status(500).json({
      message: error.message || "Error del servidor"
    });
  }
};
