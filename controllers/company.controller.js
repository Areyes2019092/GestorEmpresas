const { response, json } = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");
const Company = require("../models/company.model")
const { check } = require("express-validator");
const { existeAdminById } = require("../helpers/db-validator");

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

const companyPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const company = new Company({ nombre, correo, password });

    await company.save();
    res.status(200).json({
        company,
    });
};

const companyDelete = async (req, res) => {
    const { id } = req.params;
    await Company.findByIdAndUpdate(id, { estado: false });

    const company = await Company.findOne({ _id: id });
    res.status(200).json({
        msg: "Compañia eliminada",
        company,
    })
};

/*
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
*/

module.exports = {
    getCompany,
    getCompanyById,
    companyPost,
    companyDelete,
    //companyPut,
};
