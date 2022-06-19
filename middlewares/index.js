const validarCampos = require("../middlewares/validar-campos");
const validarJwt = require("../middlewares/validar-jwt");
const validarRoles = require("../middlewares/validar-roles");
const validarArchivoUpload = require("../middlewares/validar-archivo-upload");


module.exports = {
  ...validarCampos,
  ...validarJwt,
  ...validarRoles,
  ...validarArchivoUpload
};
