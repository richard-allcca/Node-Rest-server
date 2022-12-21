const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
   // id: {
   //   _id: String
   // },
   nombre: {
      type: String,
      required: [ true, "Nombre es requerido" ],
   },
   correo: {
      type: String,
      required: [ true, "Correo es requerido" ],
      unique: true,
   },
   password: {
      type: String,
      required: [ true, "Contraseña es requerido" ],
   },
   img: {
      type: String,
   },
   rol: {
      type: String,
      required: true,
      emun: [ "ADMIN_ROLE", "USER_ROLE" ], //que tipos de roles se admite
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

// extrae y muestra solo campos que desees del obj que retorna la petición
UsuarioSchema.methods.toJSON = function () {
   const { __v, password, _id, ...usuario } = this.toObject();
   usuario.uid = _id;
   return usuario;
};

module.exports = model("Usuario", UsuarioSchema);

// Notas:
// model(): esta es usada para la exportación, recibe 2 parametros
// 1° params model: el nombre del modelo que también sera el nombre de la colección(uppercase)
// 2° params model: el nombre del schema
// - el primer parametro se envia en singular (mongoose le agrega la 's' al final)

// uid ln/41: extracción y cambio por "uid" tarea clase 144
