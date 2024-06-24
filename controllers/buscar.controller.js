const { response } = require("express");

// funciones de busqueda
const {
  buscarUsuarios,
  buscarCategorias,
  buscarProductos,
} = require("../helpers/helpers.busquedas");

// Categorías permitidas
const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

// ==========================================================
const buscar = async (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      ok: false,
      msg: "Coleccion no permitida",
      errors: {
        msg: `Las colecciones permitidas: ${coleccionesPermitidas.join(", ")}`,
      },
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        ok: false,
        msg: "No pudo hacer la busqueda",
      });
  }
  // res.json({
  //   coleccion,
  //   termino,
  // });
};

module.exports = {
  buscar,
};
