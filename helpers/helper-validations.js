const Role = require("../models/role.models");
const Usuario = require("../models/usuarios.models");

// POST
const helperValidatorRol = async (rol = "") => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) throw new Error(`El rol " ${rol} " not exist`);
};

const helperValidatorEmail = async (correo = "") => {
  const findEmail = await Usuario.findOne({ correo });
  if (findEmail) throw new Error(`El Correo " ${correo} " ya existe`);
};
// PUT
const helperValidatorId = async (id) => {
  const findId = await Usuario.findById(id);
  if (!findId) throw new Error(`El usuario con el ID: " ${id} " no existe`);
};
// GET
// ! sin uso intento fallido
const helperValidatorPaginacion = async (limite, desde) => {
  // const limiteIsNunber = typeof limite === "number"
  // const desdeIsNumber = typeof desde === "number"
  if (limite !== 3) throw new Error("Limite must be a number");
  if (typeof desde !== "number") throw new Error("Desde must be a number");
};
// validacion envio requirido del password
const helperValidatorPassword = async (password) => {
  const findPassword = await Usuario.find({ password });
  if (!findPassword)
    throw new Error(`El password: " ${password} " es incorrecto`);
};

module.exports = {
  helperValidatorRol,
  helperValidatorEmail,
  helperValidatorId,
  helperValidatorPassword,
  helperValidatorPaginacion,
};

// Notas:
// helpersValidatorRol: usado en (usuarios.routes) ln/25
// helpersValidatorRol: valida que exista el "rol", en el documento "roles" de la DB
// para crear "helperValidatorRol" creamos un Shema de rol (role.models.js)

// helperValidatorEmail: valida correo repetido, en el documento "usuarios" de la DB
// helperValidatorEmail: utiliza el Shema de usuarios para su validacion (usuarios.models.js)
