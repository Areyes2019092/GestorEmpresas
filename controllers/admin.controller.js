const { response, json } = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");
const { check } = require("express-validator");
const { existeAdminById } = require("../helpers/db-validator");

const getAdmin = async (req, res = response) => {
    const query = { estado: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query),
    ]);

    res.status(200).json({
        total,
        admins,
    });
};

const getAdminById = async (req, res = response) => {
    const { id } = req.params;
    const admin = await Admin.findOne({ _id: id });
    res.status(200).json({
        admin,
    });
};


module.exports = {
    getAdmin,
    getAdminById,
}

