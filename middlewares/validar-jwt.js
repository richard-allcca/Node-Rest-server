const { request, response } = require("express");

const jwt = require("jsonwebtoken");

const usuariosModels = require("../models/usuarios.models");

// Notas:
// usando uid ln/18: se valida el token user con el token de env

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ message: "No hay token en la petición." });
  }

  try {
    // {udi} lo extraemos y pasamos como request para usarlo en usuarios.controller
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Valida que el user exista
    const usuario = await usuariosModels.findById(uid);
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Token no valido - usuario no existe en DB" });
    }

    // valida el status del usuario
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ message: "Token no valido - user status false" });
    }

    // user validado almacenado en el request
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

