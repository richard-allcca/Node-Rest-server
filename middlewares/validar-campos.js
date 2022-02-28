const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  // valida los campos recibidos de las peticiones POST PUT
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors });

  next();
};

module.exports = {
  validarCampos,
};

// Notas:
// validationsResult: de express-validator almacena todos los errores
// Middleware: tienen 3 parametros(req,res,next)
// next(): si el validationsResult pasa pasa al siguiente middleware o controlador en la petición
