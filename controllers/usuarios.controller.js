const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { Promise } = require("mongoose");

// Schema Mongoose
const Usuario = require("../models/usuarios.models");

const UsuariosGetOne = async (req, res = response) => {
  const { data } = req.query;
  const usuario = await Usuario.find({ nombre: data });
  res.json(usuario);
};

// ==========================================
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

// ==========================================
const UsuariosPost = async (req, res = response) => {
  // obtiene datos de la petición
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar password(salt, numero de vueltas para hacer mas seguro el pass)
  const salt = bcryptjs.genSaltSync(); // base 10 por defecto
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save(); // grabar los datos en db

  res.json({
    msg: "post Api - controller",
    usuario,
  });
  // http://localhost:8080/api/users/
  // body{ "nombre": "Richard", "edad":38}
};

// ==========================================
const UsuariosPut = async (req, res = response) => {
  const { id } = req.params; // o req.query
  // extraer lo que no se debe modificar(validacion simple)
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    // encriptar el password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // busca por id y actualiza
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
  // http://localhost:8080/api/users/4
};

// ==========================================
const UsuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch Api - controller",
  });
};

// ==========================================
const UsuariosDelete = async (req, res = response) => {
  const { id } = req.params; // o req.query

  //? borrar fisicamente(no recomendado)
  // const usuario = await Usuario.findByIdAndDelete(id);

  //? borrado con cambio de estado(recomendado)
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  // almacena el usuario autenticado por el middleware validar-jwt
  const usuarioAuthentication = req.usuario;

  res.json({
    msg: "El usuario fue eliminado",
    usuario,
    usuarioAuthentication,
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

// Notas:
// toda esta logica de peticiones se utiliza en "usuarios.routes"
// res = response: utilizamos esto para que slint nos muestre los metodos disponibles

// Uso de Shema
// Usuario: importación toUpperCase permite crear instancia del mismo nombre(es un standar)
// Schema: usandolo en el 'post'(como instancia ln 29) nos filtra los datos que no estan en el schema
