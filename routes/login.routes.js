const { Router } = require("express");
const { check } = require("express-validator");
const { existeCorreo } = require("../helpers/db-validator")

const { AdminLogin } = require("../controllers/admin.controller")

const router = Router();

router.get(
    "/",
    [
        check("correo", "No es un correo valido").isEmail(),
        check("correo").custom(existeCorreo),
        check("password", "La contraseña es muy corta").isLength({
            min: 6,
        }),
    ],
    AdminLogin
)

module.exports = router;