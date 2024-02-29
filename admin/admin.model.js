const { Schema, model } = require("mongoose");

const AdminSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre debe de ser obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo debe de ser obligatiorio"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Admin", AdminSchema);
