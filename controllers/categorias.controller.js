const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  // populate - permite llenar ciertas partes del documento desde otra colección.
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");
  // .exec();

  if (!categoria) {
    return res.status(404).json({
      msg: "No existe la categoria",
    });
  }

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  // const categoria = new Categoria({nombre});
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar (filtrar solo campos permitidos)
  const data = {
    nombre,
    usuario: req.usuario._id, // id del token verificado en validar-jwt
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

const eliminarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true } // retorna el objeto actualizado
  );

  res.json({
    categoriaBorrada,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
