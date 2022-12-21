const { response } = require("express");



const validarArchivoUpload = (req, res = response, next) => {

   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({
         ok: false,
         msg: "No se ha seleccionado ningun archivo - validarArchivoUpload"
      })
   }

   next();
}

module.exports = {
   validarArchivoUpload
}