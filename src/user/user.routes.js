import { Router } from "express";
import { check } from "express-validator";
import { emailExiste } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { usuarioLogin, usuarioRegistrar } from "./user.controller.js";

const router = Router();

router.get(
  "/",
  [check("email", "El email no es valido").isEmail(), validarCampos],
  usuarioLogin
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("email").custom(emailExiste),
    check("password", "La contraseña debe tener 6 letras").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuarioRegistrar
);

export default router;
