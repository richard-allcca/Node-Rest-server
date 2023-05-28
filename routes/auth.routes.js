const { Router } = require("express");
const { check } = require("express-validator");

const { validarJwt, validarCampos } = require("../middlewares");

const {
  login,
  GoogleSingIn,
  renovarToken,
} = require("../controllers/auth.controller");

const router = Router();

// http:localhost:8085/api/auth/
// {"correo":"richardYcris", "password":"123456"}

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  GoogleSingIn
);

router.get(
  "/",
  [
    validarJwt, // validate the token.
  ],
  renovarToken
);

module.exports = router;