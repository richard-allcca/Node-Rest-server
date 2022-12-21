const { ObjectId } = require("mongodb");
const { Usuario, Categoria, Producto } = require("../models");

// ==========================================================
const buscarUsuarios = async (termino = "", res = response) => {
   const mongoId = ObjectId.isValid(termino); // true or false
   if (mongoId) {
      const usuario = await Usuario.findById(termino);
      return res.json({
         results: [ usuario ? [ usuario ] : [] ],
      });
   }
   // regex insensitive
   const regex = new RegExp(termino, "i");

   const usuarios = await Usuario.find({
      $or: [ { nombre: regex }, { correo: regex } ],
      $and: [ { estado: true } ],
   });
   res.json({
      results: usuarios,
   });
};

const buscarCategorias = async (termino = "", res = response) => {
   const mongoId = ObjectId.isValid(termino); // true or false
   if (mongoId) {
      const categoria = await Categoria.findById(termino);
      return res.json({
         results: [ categoria ? [ categoria ] : [] ],
      });
   }
   // regex insensitive
   const regex = new RegExp(termino, "i");

   const categoria = await Categoria.find({ nombre: regex, estado: true });
   res.json({
      results: categoria,
   });
};

const buscarProductos = async (termino = "", res = response) => {
   const mongoId = ObjectId.isValid(termino); // true or false
   if (mongoId) {
      const producto = await Producto.findById(termino).populate(
         "categoria",
         "nombre"
      );

      return res.json({
         results: [ producto ? [ producto ] : [] ],
      });
   }
   // regex insensitive
   const regex = new RegExp(termino, "i");

   const producto = await Producto.find({
      nombre: regex,
      estado: true,
   }).populate("categoria", "nombre");

   res.json({
      results: producto,
   });
};

module.exports = {
   buscarUsuarios,
   buscarCategorias,
   buscarProductos,
};
