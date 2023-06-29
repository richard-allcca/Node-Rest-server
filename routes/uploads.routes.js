const { Router } = require("express");
const { check } = require("express-validator");

// middlewares
const { validarArchivoUpload, validarCampos } = require("../middlewares");
// controllers
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary, actualizarImagen } = require("../controllers/uploads.controller");
// helpers
const { helperAllowedCollections } = require("../helpers");

const router = Router();

/**
 * {{url}}/api/uploads/:coleccion/:id
 * subir archivo - publico
 */
router.post('/', validarArchivoUpload, cargarArchivo)

/**
 * {{url}}/api/uploads/:coleccion/:id
 * Actualizar imagen - publico
 */
router.put('/:coleccion/:id', [
  validarArchivoUpload,
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(collect => helperAllowedCollections(collect, [ 'usuarios', 'productos' ])),
  validarCampos
// ], actualizarImagen)// NOTE - en file system
], actualizarImagenCloudinary)

/**
 * {{url}}/api/uploads/:coleccion/:id
 * Mostrar imagen de Usuarios, Productos
 */

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(c => helperAllowedCollections(c, [ 'usuarios', 'productos' ])),
  validarCampos
], mostrarImagen)

module.exports = router;
