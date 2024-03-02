import { Router } from "express";
import { reporteGet } from "../company/company.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validateJWT } from "../middlewares/jwt-validate.js"

const router = Router();

router.get("/",[validateJWT, validarCampos], reporteGet);

export default router;