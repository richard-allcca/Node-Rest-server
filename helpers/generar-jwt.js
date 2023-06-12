const jwt = require("jsonwebtoken");

// NOTE
// el payload solo sirve por un año (verifica o actualiza)
// esta función se utiliza en auth.controller.js

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "365d", // horas "5h"
      },
      (err, token) => { //callback
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};

