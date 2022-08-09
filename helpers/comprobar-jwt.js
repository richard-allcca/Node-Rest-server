const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");


const comprobarJWT = (token = '') => {

  try {

    if (token.length === 0) {
      return res.status(401).json({
        msg: "No hay token"
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = Usuario.findById(uid);

    if (!usuario) {
      if (usuario.estado) {
        return usuario;
      } else {
        return res.status(401).json({
          msg: "Usuario no encontrado"
        });
      }
    } else {
      return usuario;
    }

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador del servidor",
    });

  }
}

module.exports = {
  comprobarJWT
}