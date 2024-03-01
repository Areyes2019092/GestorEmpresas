import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre debe de ser obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo debe de ser obligatiorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña debe de ser obligatiorio"],
  },
  condition:{
    type: Boolean,
    default: true
  },
});

AdminSchema.methods.toJSON = function(){
  const { __v, password, _id, ...admin } = this.toObject();
  admin.uid = _id;
  return admin;
}

export default mongoose.model('Admin', AdminSchema)