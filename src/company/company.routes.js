import { Router } from "express";
import { check } from "express-validator";
import {
  categoryExiste,
  companyExiste,
  companyIdExiste,
  impactoExiste,
} from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/jwt-validate.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { companyGET, companyPOST, companyPUT } from "./company.controller.js";

const router = Router();

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "El id tiene que ser obligatorio").isMongoId(),
    check("id").custom(companyIdExiste),
    validarCampos,
  ],
  companyPUT
);

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

router.get("/ordenar", [validateJWT, validarCampos], companyGET);

router.get("/", [validateJWT, validarCampos], companyGET);

export default router;
