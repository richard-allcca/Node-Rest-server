const { Router } = require("express");
const { check } = require("express-validator");

// middlewares
const { validarArchivoUpload, validarCampos } = require("../middlewares");
// controllers
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads.controller");
// helpers
const { helperAllowedCollections } = require("../helpers");

const router = Router();

/**
 * {{url}}/api/uploads/:coleccion/:id
 * subir archivo - privado - token valido en params
 */
router.post('/', validarArchivoUpload, cargarArchivo)

/**
 * {{url}}/api/uploads/:coleccion/:id
 * Actualizar imagen - Usuarios, Productos - token valido en params
 */
router.put('/:coleccion/:id', [
  validarArchivoUpload,
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(c => helperAllowedCollections(c, [ 'usuarios', 'productos' ])),
  validarCampos
  // ], actualizarImagen)
], actualizarImagenCloudinary)

/**
 * {{url}}/api/uploads/:coleccion/:id
 * Mostrar imagen - Usuarios, Productos - token valido en params
 */

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(c => helperAllowedCollections(c, [ 'usuarios', 'productos' ])),
  validarCampos
], mostrarImagen)

module.exports = router;
