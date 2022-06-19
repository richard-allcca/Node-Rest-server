const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL) 

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


/**
 * It receives a file from the client, saves it to the server, and returns the name of the file to the
 * client.
 * @param req - The request object.
 * @param [res] - The response object.
 * @returns The name of the file that was uploaded.
 */
const cargarArchivo = async (req, res = response) => {
//? no esta claro la utilidad de ese controldoe si ya tengo la carga de imagen en las colecciones respectivas

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



/**
 * It receives a request with a file, validates the file, deletes the previous file, uploads the new
 * file, and saves the new file name in the database.
 * @param req - The request object.
 * @param [res] - response
 * @returns The name of the file that was uploaded.
 */
const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  // valida id de img en su coleccion respectiva (usuarios, productos)
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

  // Limpiar imagenes previas
  if (modelo.img) {
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg)
    }
  }

  const nameFileSave = await subirArchivo(req.files, undefined, coleccion)
  // agregar el nombre al modelo para agregarlo
  modelo.img = nameFileSave;

  await modelo.save();

  res.json({
    ok: true,
    modelo
  })
}


const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;
  let pathImg;


  switch (coleccion) {


    case 'usuarios':
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          ok: false,
          msg: `No existe ${coleccion} con el id: ${id}`,
        })
      }
      // el usuario no tiene imagen
      if (!modelo.img) {
        return res.sendFile(path.join(__dirname, '../assets/no-image.jpg'))
      }

      pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);

      // busca el archivo para enviarlo al cliente
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
      }
      break;


    case 'productos':
      modelo = await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
          ok: false,
          msg: `No existe ${coleccion} con el id: ${id}`,
        })
      }
      // el producto no tiene imagen
      if (!modelo.img) {
        return res.sendFile(path.join(__dirname, '../assets/no-image.jpg'))
      }

      pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);

      // busca el archivo para enviarlo al cliente
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
      }
      break;

    default:

      // pathImg = path.join(__dirbane,'../assets/no-img.png');
      // return res.sendFile(pathImg)
      return res.status(500).json({
        msg: '😅 se me olvido programar eso'
      })
  }


  res.json({
    msg: 'Falta el placeholder de la imagen'
  })
}


const actualizarImagenCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  // valida id de img en su coleccion respectiva (usuarios, productos)
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

  // Limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const resp = await cloudinary.uploader.upload(tempFilePath)
  const { secure_url } = resp;
  // const  nameFileSave = await subirArchivo(req.files, undefined, coleccion)

  // agregar url al modelo
  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo)
}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
}