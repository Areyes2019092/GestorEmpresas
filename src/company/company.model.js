import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de la empresa es obligatorio"],
  },
  nivelImpacto: {
    type: String,
    enum: ["Importante", "Considerable", "Desechable"],
    required: true,
  },
  experiencia: {
    type: Number,
    required: [true, "La experiencia en años es obligatoria"],
  },
  category: {
    type: String,
    required: [true, "La categoria es obligatoria"],
    enum: ["limpieza","contabilidad", "programacion"]
  },
  condition: {
    type: Boolean,
    default: true,
  },
});


CompanySchema.methods.toJSON = function (){
    const { __v, _id, ...company} = this.toObject();
    company.uid = _id;
    return company;

}


export default mongoose.model('Company', CompanySchema)