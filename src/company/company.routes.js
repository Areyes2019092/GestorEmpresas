import { Router } from "express";
import { check } from "express-validator";
import {
  categoryExiste,
  companyExiste,
  impactoExiste,
} from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/jwt-validate.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { companyPOST } from "./company.controller.js";

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name").custom(companyExiste),
    check("nivelImpacto").custom(impactoExiste),
    check("experiencia", "Debe ser un numero").isNumeric(),
    check("category").custom(categoryExiste),
    validarCampos,
  ],
  companyPOST
);

export default router;
