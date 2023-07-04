const { comprobarJWT } = require("../helpers");
const ChatMsg = require("../models/chat-msg");

const chatMensajes = new ChatMsg();

const socketController = async (socket, io) => {

  // Extracción de un extraHeader de socket
  const token = socket.handshake.headers["x-token"];

  const usuario = await comprobarJWT(token);

  if (!usuario) return socket.disconnet();

  console.log("Nuevo usuario conectado", usuario.nombre);

  chatMensajes.agregarUsuario(usuario);

  // Emite lista de usuarios activos al cliente
  io.emit("usuarios-activos", chatMensajes.usuariosActivos);

  // Nueva conexión recibe los ultimos mensajes
  socket.emit("recibir-mensaje", chatMensajes.ultimosMensajes);

  // Crea una sala para para mensajes privados por id
  socket.join(usuario.id);// socket.id, usuario.id

  // Control para la desconexion de usuario
  socket.on("disconnect", () => {
    chatMensajes.desconectarUsuario(usuario.id);
    // Notificación general
    io.emit("usuarios-activos", chatMensajes.usuariosActivos);
  });

  // Recibe mensaje del cliente para emitirlo
  socket.on("enviar-mensaje", ({ uid, mensaje }) => {
    if (uid) {// Si tiene uid es Mensaje privado
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
