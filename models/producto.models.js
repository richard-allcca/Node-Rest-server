const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    // required: [true, "El precio es necesario"],
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId, // typo para hacer referencia
    ref: "Categoria", // Referencia a schema
    required: true,
  },
  descripcion: { type: String, default: "" },
  disponible: { type: Boolean, default: true },
  img: { type: String }
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);

// Notas:
// - El estado es para mantener la integridad referencial de los datos.
