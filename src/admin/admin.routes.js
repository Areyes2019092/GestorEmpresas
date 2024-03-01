import { Router } from "express";
import { check } from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/jwt-validate.js"; 
import { validarCampos } from "../middlewares/validar-campos.js";
import { usuarioRegistrar, usuarioLogin } from "./admin.controller.js";

const router = Router();


router.get(
    "/",
    [
        check("email","El email no es valido").isEmail(),
        validarCampos,
    ],
    usuarioLogin
);


router.post(
    "/",
    [
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("email","El email es obligatorio").isEmail(),
        check("email").custom(emailExists),
        check("password","La contraseña debe tener 6 letras").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    usuarioRegistrar
);


export default router;