const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarios.models");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si existe el correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: "Correo incorrecto no existe" });
    }

    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({ message: "Usuario incorrecto no existe" });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    // const validPassword = password === usuario.password;
    console.log(password, validPassword, usuario.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Password incorrecto" });
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

module.exports = {
  login,
};

// Notas:
//? verificar la contraseña: queda pendiente de solución, utilize mi propia comparación
