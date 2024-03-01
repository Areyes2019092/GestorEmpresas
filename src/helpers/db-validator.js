import adminModel from "../admin/admin.model.js";
import companyModel from "../company/company.model.js";

export async function impactoExiste(nivelImpacto = "") {
  if (
    nivelImpacto !== "Importante" &&
    nivelImpacto !== "Considerable" &&
    nivelImpacto !== "Desechable"
  ) {
    throw new Error("Debe poner un nivel de importancia");
  }
}

export async function usuarioExiste(correo = "") {
  const user = await adminModel.findOne({ email: correo });
  if (user) {
    throw new Error("El usuario ya existe");
  }
}

export async function companyExiste(name = "") {
  const company = await companyModel.findOne({ name: name });
  if (company) {
    throw new Error("La compania ya existe");
  }
}

export async function categoryExiste(category = "") {
  const categoryPermitida = ["limpieza", "contabilidad", "programacion"];
  if (!categoryPermitida.includes(category)) {
    throw new Error("La categoria no existe");
  }
}

export async function emailExiste(correo = "") {
  const user = await adminModel.findOne({ email: correo });
  if (user) {
    throw new Error(`The email ${user.email} already exists`);
  }
}

/*
export const existeAdminById = async (id = "") => {
  const existeAdmin = await adminModel.findOne({ _id: id });
  if (!existeAdmin) {
    throw new Error("El admin no se encuentra");
  }
};

export const existeCompanyById = async (id = "") => {
  const existeCompany = await companyModel.findOne({ _id: id });
  if (!existeCompany) {
    throw new Error("La compañia no existe");
  }
};

export async function existeNombre(nombre = "") { 
    const company = await companyModel.findOne({ nombre: nombre });
    if (!company) { 
        throw new Error('La compañia no existe')
    }
};
*/
