const { request, response } = require("express");

const jwt = require("jsonwebtoken");

// modelos
const usuariosModels = require("../models/usuarios.models");

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ message: "No hay token en la petición." });
  }

  try {
    // {udi} lo extraemos y pasamos como request para usarlo en usuarios.controller
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await usuariosModels.findById(uid);
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Token no valido - usuario no existe en DB" });
    }

    // validar usuario status
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ message: "Token no valido - usuario con estado falso" });
    }

    // almacenado en el request
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(token);
    return res.status(401).json({ message: "Token invalid!" });
  }
};

module.exports = {
  validarJwt,
};
// Notas:
// usando uid ln/17: se valida el usuario con el token no con el api/users/:id
