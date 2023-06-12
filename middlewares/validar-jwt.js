const { request, response } = require("express");

const jwt = require("jsonwebtoken");

const { Usuario } = require("../models");

//  REVIEW - Se valida token del usuario que desea eleminar a otro
// "ADMIN_ROLE" y "USER_ROLE" pueden eliminar users
// Modifica auth.route para que solo "ADMIN_ROLE" puedan eliminar


const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  const {id} = req.params // id user to delete

  if (!token) {
    return res
      .status(401)
      .json({ message: "No hay token en la petición." });
  }

  try {

    // Valida de TOKEN generados en login con pass (ENCRIPTADOS)
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const [usuario, userToDelete] = await Promise.all([
      Usuario.findById(uid),
      Usuario.findById(id)
    ])

    // validación de estado de usuario que sera eliminado
    if (!userToDelete.estado) {
      return res
        .status(401)
        .json({ message: "Id no valido - usuario no existe en DB" });
    }

    // valida estado de usuario authenticado
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ message: "Token no valido - user status false" });
    }

    // Almacena usuario authenticado en el request
    req.usuario = usuario;

    next();

  } catch (error) {
    console.log(token);
    return res
      .status(401)
      .json({ message: "Token invalid!" });
  }
};

module.exports = {
  validarJwt,
};

