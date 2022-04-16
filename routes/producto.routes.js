const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");
const {
  helperValidatorIdMongoProducto,
  helperValidatorIdMongoCategoria,
} = require("../helpers/helper-validations");

const { validarCampos, validarJwt, isAdminRol } = require("../middlewares");

const router = Router();

/*
 * {{url}}/api/producto
 */

// Obtener todos los productos - publico
router.get("/", [validarCampos], obtenerProductos);

// Obtener un producto
router.get(
  "/:id",
  [
    check("id", "No es un id Mongo válido").isMongoId(),
    check("id").custom(helperValidatorIdMongoProducto),
    validarCampos,
  ],
  obtenerProducto
);

// Crear un producto
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo válido").isMongoId(),
    check("categoria").custom(helperValidatorIdMongoCategoria),
    validarCampos,
  ],
  crearProducto
);

// Actualizar un producto
router.put(
  "/:id",
  [
    validarJwt,
    // check("categoria", "No es un id Mongo válido").isMongoId(),
    check("id").custom(helperValidatorIdMongoProducto),
    validarCampos,
  ],
  actualizarProducto
);

// Eliminar un producto
router.delete(
  "/:id",
  [
    validarJwt,
    isAdminRol,
    check("id", "No es un id Mongo válido").isMongoId(),
    check("id").custom(helperValidatorIdMongoProducto),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
