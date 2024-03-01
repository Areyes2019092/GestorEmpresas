import jwt from "jsonwebtoken";
import userModel from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "El token no existe",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await userModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "El usuario no se pudo encontrar en la base de datos",
      });
    }

    if (!user.condition) {
      return res.status(401).json({
        msg: "El usuario fue deshabilitado o eliminado",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "El token no es valido",
    });
  }
};
