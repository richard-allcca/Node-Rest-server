const { Router } = require("express");
const { check } = require("express-validator");

const {
  helperValidatorRol,
  helperValidatorEmail,
  helperValidatorId,
  helperValidatorNumber,
} = require("../helpers/helper-validations");

const {
  validarCampos,
  validarJwt,
  isAdminRol,
  tieneRol,
} = require("../middlewares");

const {
  UsuariosGet,
  UsuariosPut,
  UsuariosPost,
  UsuariosDelete,
  UsuariosPatch,
  UsuariosGetOne,
} = require("../controllers/usuarios.controller");

const router = Router();

// NOTE
// midlewares: mas de 1 se declaran en []
// check: express-validator, valida params y contenido de req.body


router.get("/",
  [
    check("desde").custom(helperValidatorNumber),
    check("limite").custom(helperValidatorNumber),
    validarCampos,
  ],
  UsuariosGet);

// REVIEW - RUTA SIN USO PARA, TRAER UNO SOLO CREA OTRO PATH EN SERVER
// router.get("/", UsuariosGetOne);

router.post(
  "/",
  [
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check("password", "Password minimo 6 caracteres").isLength({ min: 6 }),
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
    check("rol").custom(helperValidatorRol),
    validarCampos,
  ],
  UsuariosPut
);

router.patch("/", UsuariosPatch);

router.delete(
  "/:id",
  [
    validarJwt,
    // isAdminRol,
    tieneRol("ADMIN_ROLE", "USER_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(helperValidatorId),
    validarCampos,
  ],
  UsuariosDelete
);

module.exports = router;
