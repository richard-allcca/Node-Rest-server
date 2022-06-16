const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha seleccionado ningun archivo",
    })
  }

  try {
    // subirArchivo, puede recibir 3 parametros el 1° es el archivo (obligatorio)
    const nameFileSave = await subirArchivo(req.files)

    res.json({
      ok: true,
      msg: `Archivo subido correctamente: ${nameFileSave}`,
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al subir el archivo",
    })

  }
}


const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  // ! El archivo tiene contenido pero es undefined 
  const archivo = req.files
  console.log(archivo)

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          ok: false,
          msg: `No existe un usuario con el id: ${id}`,
        })
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          ok: false,
          msg: `No existe un Producto con el id: ${id}`,
        })
      }

      break;

    default:
      return res.status(500).json({
        ok: false,
        msg: `La coleccion "${coleccion}" no existe, se me olvido validar esto😅`,
      })
  }

  // const nameFileSave = await subirArchivo(archivo, undefined, coleccion)
  // modelo.img = nameFileSave;

  // await modelo.save();

  res.json({
    ok: true,
    modelo
  })
}


module.exports = {
  cargarArchivo,
  actualizarImagen
}