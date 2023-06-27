const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre") // trae el usuario que creo el product
    .populate("categoria", "nombre"); // trae la categoria del product

  if (!producto) {
    return res.status(404).json({
      msg: "No existe el producto",
    });
  }

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDb = await Producto.findOne({ nombre: body.nombre });

  if (productoDb) {
    res.status(400).json({
      msg: `El producto ${productoDb.nombre}, ya existe`,
    });
  }
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };
  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(
    id,
    data,
    { new: true }// retorna el objeto actualizado
  );

  //? validación opcional
  if (!producto) {
    return res.status(404).json({
      msg: "No existe el producto",
    });
  }

  res.json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(id, {
    estado: false,
    new: true,
  });

  // ? validación opcional
  if (!productoBorrado) {
    return res.status(404).json({
      msg: "No existe el producto",
    });
  }

  res.json(productoBorrado);
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
