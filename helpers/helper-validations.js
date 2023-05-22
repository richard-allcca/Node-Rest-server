const Role = require("../models/role.models");
const { Usuario, Categoria, Producto } = require("../models");

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
// validacion envio requirido del password
const helperValidatorPassword = async (password) => {
  const findPassword = await Usuario.find({ password });
  if (!findPassword)
    throw new Error(`El password: " ${password} " es incorrecto`);
};

// Validacion de ID valido de mongo para Categoria
const helperValidatorIdMongoCategoria = async (id) => {
  const findCategoria = await Categoria.findById(id);
  if (!findCategoria) throw new Error(`La categoria: " ${id} " no existe`);
};

// Validacion de ID valido de mongo para Categoria
const helperValidatorIdMongoProducto = async (id) => {
  const findProducto = await Producto.findById(id);
  if (!findProducto) throw new Error(`El Producto: " ${id} " no existe`);
};

// Colecciones permitidas para subir archivos
const helperAllowedCollections = (coleccion = '', collections = []) => {

  if (!collections.includes(coleccion))
    throw new Error(`La coleccion: " ${coleccion} " no esta permitida`, collections);

  return true;
};
module.exports = {
  helperValidatorRol,
  helperValidatorEmail,
  helperValidatorId,
  helperValidatorPassword,
  helperValidatorIdMongoCategoria,
  helperValidatorIdMongoProducto,
  helperAllowedCollections
};

// Notas:
// helpersValidatorRol: usado en (usuarios.routes) ln/25
// helpersValidatorRol: valida que exista el "rol", en el documento "roles" de la DB
// para crear "helperValidatorRol" creamos un Shema de rol (role.models.js)

// helperValidatorEmail: valida correo repetido, en el documento "usuarios" de la DB
// helperValidatorEmail: utiliza el Shema de usuarios para su validacion (usuarios.models.js)
