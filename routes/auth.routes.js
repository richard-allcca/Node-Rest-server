const { Router } = require("express");
const { check } = require("express-validator");

const { validarJwt, validarCampos } = require("../middlewares");

const {
  login,
  GoogleSingIn,
  renovarToken,
} = require("../controllers/auth.controller");

const router = Router();

// Login con Email y Password
router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

// Login con google
router.post(
  "/google",
  [
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  GoogleSingIn
);

// Renovar token para chat
router.get(
  "/",
  [
    validarJwt, // validate the token.
  ],
  renovarToken
);

module.exports = router;