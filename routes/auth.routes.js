const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { login, GoogleSingIn } = require("../controllers/auth.controller");

const router = Router();

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

module.exports = router;
