const { Router } = require("express");
const { check } = require("express-validator");

const { existeCorreo, existeCompanyById } = require("../helpers/db-validator");

const {
  getCompany,
  getCompanyById,
  companyPost,
  companyDelete,
} = require("../controllers/company.controller");
