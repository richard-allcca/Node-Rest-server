const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    // emun: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
  },
});

module.exports = model("Role", RolSchema);

// Notas:
//? Este Schema es creado para validar el contenido de el documento "roles" en la db
// Este archivo lo utlizamos en 'usuarios.routes' para validar los 'Roles' en DB
//  ln/7: comentada porque se tomo como ejemplo del "usuarios.models" y no es necesario aqui porque la validación se hace contra la db "roles"
