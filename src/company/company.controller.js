import { response } from "express";
import companyModel from "./company.model.js";

export const companyPOST = async (req, res) => {
  const { name, nivelImpacto, experiencia, category } = req.body;
  const company = new companyModel({
    name,
    nivelImpacto,
    experiencia,
    category,
  });

  await company.save();
  res.status(200).json({
    company,
  });
};

export const companyPUT = async (req, res) => {
  var nombre = true;
  const { id } = req.params;
  var { name, nivelImpacto, experiencia, category } = req.body;
  const nombreAnterior = companyModel.findOne({ _id: id });

  if (!name) {
    name = nombreAnterior.name;
    nombre = false;
  }

  if (nombre) {
    const nombreRepetido = await companyModel.findOne({ name: name });
    if (nombreRepetido) {
      return res
        .status(400)
        .json({ msg: "El nombre ya se encuentra en la base de datos" });
    }
  }
  if (!["Importante", "Considerable", "Desechable"].includes(nivelImpacto)) {
    nivelImpacto = nombreAnterior.nivelImpacto;
  }
  if (!experiencia) {
    experiencia = nombreAnterior.experiencia;
  }
  if (!category) {
    category = nombreAnterior.category;
  }

  await companyModel.findByIdAndUpdate(id, {
    name: name,
    nivelImpacto: nivelImpacto,
    experiencia: experiencia,
    category: category,
  });
  res.status(400).json({ msg: "La compañia se actualizo de manera exitosa" });
};

export const companyGET = async (req, res = response) => {
  const { order } = req.params;
  let filtrar, ordenar;

  switch (parseInt(order)) {
    case 1:
      filtrar = "name";
      ordenar = "asc";
      break;
    case 2:
      filtrar = "name";
      ordenar = "desc";
      break;
    case 3:
      filtrar = "experiencia";
      ordenar = "asc";
      break;
    case 4:
      filtrar = "experiencia";
      ordenar = "desc";
      break;
    case 5:
      filtrar = "category";
      ordenar = "asc";
      break;
    case 6:
      filtrar = "category";
      ordenar = "desc";
      break;
    default:
      filtrar = "name";
      ordenar = "asc";
      break;
    }
    
  try {
    const company = await companyModel.find().sort({ [filtrar]: ordenar });

    res.status(200).json({
      company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Los negocios no se pudieron ordenar ni obtener",
      error: error.message,
    });
  }



};

/*

const companyDelete = async (req, res) => {
    const { id } = req.params;
    await Company.findByIdAndUpdate(id, { estado: false });

    const company = await Company.findOne({ _id: id });
    res.status(200).json({
        msg: "Compañia eliminada",
        company,
    })
};


const companyPut = async (req, res) => {
    const { id } = req.params;
    const { companyId, correo, password, ...resto } = req.body;
    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({ _id: id });

    res.status(200).json({
        msg: "compania actualizada",
        company,
    });
};

const getCompany = async (req, res = response) => {
  const query = { estado: true };

  const [total, companies] = await Promise.all([
    Company.countDocuments(query),
    Company.find(query),
  ]);

  res.status(200).json({
    total,
    companies,
  });
};


const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findOne({ _id: id })

    res.status(200).json({
        company,
    });
};


*/
