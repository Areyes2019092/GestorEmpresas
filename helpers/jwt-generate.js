const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        err
          ? (console.log(err), reject("No se pudo generar el token"))
          : resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
