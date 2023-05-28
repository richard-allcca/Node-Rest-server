const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { Promise } = require("mongoose");

// Schema Mongoose into uppercase
const Usuario = require("../models/usuarios.models");


const UsuariosGetOne = async (req, res = response) => {
  const { data } = req.query;
  const usuario = await Usuario.find({ nombre: data });
  res.json(usuario);
};

const UsuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const queryEstado = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(queryEstado),
    Usuario.find(queryEstado).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
  // Usuarios.get: usa destructuring del query y obtener solo lo necesario
  // http://localhost:8080/api/users?q=hola&nombre=fernando&apiKey=12344546&limit=18
};

const UsuariosPost = async (req, res = response) => {
  // obtiene datos de la petición
  const { nombre, correo, password, rol } = req.body;
  // crea un usuario usando el Schema
  const usuario = new Usuario({ nombre, correo, password, rol });

  // genSaltSync cant de vueltas para encriptar el pass
  const salt = bcryptjs.genSaltSync(); // base 10 por defecto
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "post Api - controller",
    usuario,
  });
  // http://localhost:8080/api/users/
  // body{ "nombre": "Richard", "edad":38}
};

const UsuariosPut = async (req, res = response) => {
  const { id } = req.params; // o req.query

  // extraer lo que no se debe modificar
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();// encriptar el password
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // busca por id y actualiza
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
  // http://localhost:8080/api/users/4
};

const UsuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch Api - controller",
  });
};

const UsuariosDelete = async (req, res = response) => {
  const { id } = req.params; // o req.query

  // borrar fisicamente(no recomendado)
  // const usuario = await Usuario.findByIdAndDelete(id);

  // borrado con cambio de estado(recomendado)
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  const authenticadedUser = req.usuario;

  res.json({
    msg: "El usuario fue eliminado",
    usuario,
    usuarioAuthentication: authenticadedUser,
  });
};

module.exports = {
  UsuariosGet,
  UsuariosPost,
  UsuariosPut,
  UsuariosPatch,
  UsuariosDelete,
  UsuariosGetOne,
};

