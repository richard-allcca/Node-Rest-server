const { response } = require("express");

// NOTE
// estos middleware utilizan el usuario de 'validarJwt' que viene en 'req'

const isAdminRol = (req, res = response, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ message: "No se puede validar el Rol sin token valido " });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ message: `${nombre} no tiene permisos de administrador` });
  }

  next();
};

const tieneRol = (...roles) => {
  return (req, res = response, next) => {
    // console.log(roles, req.usuario.rol);
    if (!req.usuario) {
      return res
        .status(500)
        .json({ message: "No se puede validar el Rol sin token valido " });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res
        .status(401)
        .json({ message: `El servicio requiere uno de estos roles ${roles} ` });
    }

    next();
  };
};

module.exports = {
  isAdminRol,
  tieneRol,
};

