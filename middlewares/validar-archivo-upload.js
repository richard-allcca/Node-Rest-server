const { response } = require("express");

const validarArchivoUpload = (req, res = response, next) => {
  if (!req.files || !req.files.archivo) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha seleccionado ningún archivo - validarArchivoUpload"
    });
  }

  next();
};


module.exports = {
  validarArchivoUpload
};