const { validationResult } = require("express-validator");

// validate fields received in the reques

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors });

  next();
};

module.exports = {
  validarCampos,
};

// Notas:
// validationsResult: validates and store the errors
