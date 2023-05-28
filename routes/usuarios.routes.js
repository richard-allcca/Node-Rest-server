const { Router } = require("express");
const { check } = require("express-validator");

// validaciones helpers
const {
  helperValidatorRol,
  helperValidatorEmail,
  helperValidatorId,
} = require("../helpers/helper-validations");

// validaciones middlewares
const {
  validarCampos,
  validarJwt,
  isAdminRol, //? comentado en DELETE
  tieneRol,
} = require("../middlewares");

// controladores de peticiones
const {
  UsuariosGet,
  UsuariosPut,
  UsuariosPost,
  UsuariosDelete,
  UsuariosPatch,
  UsuariosGetOne,
} = require("../controllers/usuarios.controller");

const router = Router();

// Notas:
// midlewares: mas de 1 se declaran en []
// check: express-validator, valida params url o el contenido en req.body
// isEmpty() valida que este vacio
// not().isEmpty(): juntos validan que no este vacio,
// custom: permite usar validaciones propias
// validarCampos: lo utilizamos para validar los campos del modelo

/*
 * {{url}}/api/users
 */

router.get("/", UsuariosGet);

router.get("/:id", [validarCampos], UsuariosGetOne);

router.post(
  "/",
  [
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check("password", "El Password debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo").custom(helperValidatorEmail),
    check("rol").custom(helperValidatorRol),
    validarCampos,
    // check("correo", "El Correo no es válido").isEmail(),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  ],
  UsuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(helperValidatorId),
    validarCampos,
  ],
  UsuariosPut
);

router.patch("/", UsuariosPatch);

router.delete(
  "/:id",
  [
    validarJwt,
    // isAdminRol,//fuerza ser admin
    tieneRol("ADMIN_ROLE", "USER_ROLE"), //pide tener algun rol de estos
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(helperValidatorId),
    validarCampos,
  ],
  UsuariosDelete
);

module.exports = router;
