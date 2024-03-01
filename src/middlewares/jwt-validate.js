import jwt from "jsonwebtoken";
import adminModel from "../admin/admin.model";

export const validateJWT = async(req, res, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "El token esta vacio"
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await adminModel.findById(uid);
        
        if(!user){
            return res.status(401).json({
                msg: "El usuario no existe"
            });
        }

        if(!user.condition){
            return res.status(401).json({
                msg: "El usuario ya no existe"
            });
        }

        req.user = user;

    }catch(error){
        console.log(e);
        res.status(401).json({
            msg: "Problema en el token"
        })
    }
}