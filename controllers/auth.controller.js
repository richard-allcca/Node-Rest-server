const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarios.models");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si existe el correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ msg: "Correo incorrecto no existe" });
    }

    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({ msg: "Usuario incorrecto no existe" });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    // console.log(password, validPassword, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    // generar el jwt
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador del servidor",
    });
  }
};

const GoogleSingIn = async (req, res = response) => {
  const { id_token } = req.body;
  // console.log("id-token", id_token)
  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    //si no existe el usuario crea uno nuevo
    if (!usuario) {
      const data = {
        nombre,
        img,
        correo,
        password: ":)",
        google: true,
        rol: "USER_ROLE"
      };
      // Creación de usuario
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      // valida el estado del usuario en la db
      return res
        .status(401)
        .json({ msg: "Hable con el Admin, Usuario Bloqueado" });
    }

    // generar el jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "El Token no se pudo verificar",
    });
  }
};

const renovarToken = async (req, res = response) => {
  const { usuario } = req;

  // Generar nuevo token
  const token = await generarJWT(usuario.id);

  res.json({
    usuario,
    token,
  });
};

module.exports = {
  login,
  GoogleSingIn,
  renovarToken,
};
