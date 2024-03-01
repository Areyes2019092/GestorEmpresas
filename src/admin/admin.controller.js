import { response, request } from "express";
import bcryptjs from "bcrypt";
import { generateJWT } from "../helpers/jwt-generate";
import adminModel from "./admin.model";

export const usuarioLogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await adminModel.findOne({email: email});
    const acceso = bcryptjs.compareSync(password, user.password);
    if (!acceso){
        return res.status(400).json({ msg: "Contraseña incorrecta"});
    }
    const tok = await generateJWT(user.id);
    res.status(200).json({
        msg: "Bienvenido",
        tok,
    });
};

export const usuarioRegistrar = async(req, res) =>{
    const { name, email, password } = req.body;
    try{
        const user = new adminModel({name, email, password});
        const salt = bcryptjs.genSalt();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({user})

    } catch(error){
        res.status(400).json({error: error.message});
    }
};
