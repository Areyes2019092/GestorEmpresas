import { Router } from "express";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validateJWT } from "../middlewares/jwt-validate.js"



const router = Router();

router.get("/",[validateJWT, validarCampos])

export default router;