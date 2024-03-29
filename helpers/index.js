

const generarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const helperValidations = require('./helper-validations');
const helperBusquedas = require('./helpers.busquedas');
const uploadFile = require('./subir-archivo');
const comprobarJWT = require('./comprobar-jwt');

module.exports = {
   ...generarJwt,
   ...googleVerify,
   ...helperValidations,
   ...helperBusquedas,
   ...uploadFile,
   ...comprobarJWT
}