import bcryptjs from "bcrypt";
import { generarJWT } from "../helpers/jwt-generate.js";
import adminModel from "./admin.model.js";

export const usuarioLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({ email: email });
  const acceso = bcryptjs.compareSync(password, user.password);
  if (!acceso) {
    return res.status(400).json({ msg: "Contraseña incorrecta" });
  }
  const tok = await generarJWT(user.id);
  res.status(200).json({
    msg: "Bienvenido",
    tok,
  });
};

export const usuarioRegistrar = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new adminModel({ name, email, password });
    const salt = bcryptjs.genSalt();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
