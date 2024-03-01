import adminModel from "../admin/admin.model";
import companyModel from "../company/company.model";
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

export async function emailExists(correo = "") {
  const user = await adminModel.findOne({ email: correo });
  if (user) {
      throw new Error(`The email ${user.email} already exists`);
  }
}

