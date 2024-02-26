const { Schema, model } = require("mongoose");

const CompanySchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la empresa es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "La compañia debe tener un email"]
    },
    estado: {
        type: Boolean,
        default: true,
    }

})

module.exports = model("Company", CompanySchema);