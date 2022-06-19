const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias.controller");

const {
  helperValidatorIdMongoCategoria,
} = require("../helpers/helper-validations");

const { validarCampos, validarJwt, isAdminRol } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get("/", [validarCampos], obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id Mongo válido").isMongoId(),
    check("id").custom(helperValidatorIdMongoCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear una categoria - privado - token valido en el headers
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre el requerido").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar una categoria - privado - con token valido
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(helperValidatorIdMongoCategoria),
    validarCampos,
  ],
  actualizarCategoria
);

// Eliminar una categoria - privado - con token valido
router.delete(
  "/:id",
  [
    validarJwt,
    isAdminRol,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(helperValidatorIdMongoCategoria),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
