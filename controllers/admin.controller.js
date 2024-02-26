/*
const { response, json } = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");
const { check } = require("express-validator");
const { existeAdminById } = require("../helpers/db-validator");

const getAdmin = async (req, res = response) => { 
    const query = { estado: true };

    const [total, company] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query),
    ]);

    res.status(200).json({
        total,
        company,
    })
}


module.exports = {

}
*/
