import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
  condition: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default mongoose.model("User", UserSchema);
