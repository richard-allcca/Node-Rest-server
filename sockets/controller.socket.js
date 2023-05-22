const { comprobarJWT } = require("../helpers");
const ChatMsg = require("../models/chat-msg");

const chatMensajes = new ChatMsg();

const socketController = async (socket, io) => {

  const token = socket.handshake.headers["x-token"];
  const usuario = await comprobarJWT(token);
  // console.log(usuario)
  if (!usuario) {
    return socket.disconnet();
  }

  console.log("Nuevo usuario conectado", usuario.nombre);

  // Agregar usuario a la lista de usuarios activos
  chatMensajes.agregarUsuario(usuario);
  io.emit("usuarios-activos", chatMensajes.usuariosActivos);

  // TODO: falta provar que funciona
  // Nueva conexión recibe los ultimos mensajes
  socket.emit("recibir-mensaje", chatMensajes.ultimosMensajes);

  // Escuchar mensajes privados
  socket.join(usuario.id);

  // Limpiar usuario desconectado de la lista de usuarios activos
  socket.on("disconnect", () => {
    chatMensajes.desconectarUsuario(usuario.id);
    io.emit("usuarios-activos", chatMensajes.usuariosActivos);
  });

  // Recibe mensaje del input y lo envia al servidor
  socket.on("enviar-mensaje", ({ uid, mensaje }) => {
    if (uid) {
      // Mensaje privado
      socket
        .to(uid)
        .emit("mensajes-privados", { de: usuario.nombre, mensaje });
    } else {
      chatMensajes.enviarMensajes(usuario.id, usuario.nombre, mensaje);
      io.emit("recibir-mensaje", chatMensajes.ultimosMensajes);
    }
  });
};

module.exports = socketController;
