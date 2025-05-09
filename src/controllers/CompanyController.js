const { createCompany, editCompanyServices, deleteCompanyServices, getCompaniesServices } = require("../services/CompanyServices");

exports.createCompanyController = async (req, res) => {
  const { name, superAdminId } = req.body;

  try {
    const company = await createCompany({ name, superAdminId});
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


exports.editCompanyController = async (req, res) => {
  const {name, newName} = req.body;

  try {
    const company = await editCompanyServices({name, newName});
    res.status(201).json({
      message: "Empresa editada con éxito!",
      company
    })
  } catch (error) {
    console.error("Error al editar la empresa:", error);
    res.status(500).json({
      message: error.message || "Error del servidor"
    });
  }
}


exports.deletCompanyController = async (req, res) => {
  const {name} = req.body;

  try {
    const company = await deleteCompanyServices(name);
    res.status(201).json({
      message: "Empresa ELIMINADA con éxito!",
      company
    })
  } catch (error) {
    console.error("Error al eliminar la empresa:", error);
    res.status(500).json({
      message: error.message || "Error del servidor"
    });
  }
}

exports.getCompaniesController = async (req, res) => {
  try {
    const companies = await getCompaniesServices();
    res.status(201).json({
      message: "Empresas encontradas con exito!",
      companies
    })
  } catch (error) {
    console.error("Error al traer las empresas:", error);
    res.status(500).json({
      message: error.message || "Error del servidor"
    });
  }
}
