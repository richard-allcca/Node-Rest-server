const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"]
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
})

// extrae y muestra solo campos que desees del obj que retorna la petición
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model('Categoria', CategoriaSchema);