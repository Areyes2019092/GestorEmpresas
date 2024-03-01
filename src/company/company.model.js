import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la empresa es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "La compañia debe tener un email"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    condition: {
        type: Boolean,
        default: true
    },
});

CompanySchema.methods.toJSON = function (){
    const { __v, password, _id, ...company} = this.toObject();
    company.uid = _id;
    return company;

}


export default mongoose.model('Company', CompanySchema)