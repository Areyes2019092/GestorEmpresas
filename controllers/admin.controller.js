const { response, json } = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");
const { check } = require("express-validator");
const { existeAdminById } = require("../helpers/db-validator");
const { generateJWT } = require("../helpers/jwt-generate")

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

const AdminLogin = async (req, res) => {
    const { correo, password } = req.body;
    const admin = await Admin.findOne({ correo: correo, password: password });
    if (!admin) {
        return res.status(400).json({ msg: "Datos Incorrectos" });
    }

    const token = await generateJWT(admin.id);
    res.status(200).json({
        msg: "Acceso concedido",
        token,
    });
};



module.exports = {
    getAdmin,
    getAdminById,
    AdminLogin,
}

