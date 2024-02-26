const Admin = require("../models/admin.model");
const Company = require("../models/company.model");

const existeAdminById = async (id = "") => {
  const existeAdmin = await Admin.findOne({ _id: id });
  if (!existeAdmin) {
    throw new Error("El admin no se encuentra");
  }
};

const existeCompanyById = async (id = "") => {
  const existeCompany = await Company.findOne({ _id: id });
  if (!existeCompany) {
    throw new Error("La compañia no existe");
  }
};

async function existeNombre(nombre = "") { 
    const company = await Company.findOne({ nombre: nombre });
    if (!company) { 
        throw new Error('La compañia no existe')
    }
};

async function existeCorreo(correo = "") {
  const company = await Company.findOne({ correo: correo });
  if (company) {
    throw new Error("La compañia ya esta registrada");
  }
};

module.exports = {
  existeAdminById,
  existeCompanyById,
  existeCorreo,
  existeNombre,
};
