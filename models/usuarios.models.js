const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  // id: {
  //   _id: String
  // },
  nombre: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  correo: {
    type: String,
    required: [true, "Correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerido"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"], //que tipos de roles se admite
  },
  estado: {
    type: Boolean,
    default: true, //en true cuando crea un usuario
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Destructure and return only desired elements
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

// NOTE
// model(nameModelandColeccion, nameShema) - crea el modelo
// Nombre de modelo en singular (mongoose le agrega la 's' al final)
module.exports = model("Usuario", UsuarioSchema);

