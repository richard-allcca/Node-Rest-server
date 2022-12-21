

class Mensaje {
   constructor(uid, nombre, mensaje) {
      this.uid = uid;
      this.nombre = nombre;
      this.mensaje = mensaje;

   }
}


class ChatMsg {
   constructor() {
      this.mensajes = [];
      this.usuarios = {};
   }

   get ultimosMensajes() {
      // TODO: reparar esto 
      this.mensajes = this.mensajes.splice(0, 10);
      return this.mensajes;
   }

   get usuariosActivos() {
      return Object.values(this.usuarios);
   }

   enviarMensajes(uid, nombre, mensaje) {
      this.mensajes.push(
         new Mensaje(uid, nombre, mensaje)
      );
   }

   agregarUsuario(usuario) {
      this.usuarios[ usuario.id ] = usuario
   }

   desconectarUsuario(id) {
      delete this.usuarios[ id ];
   }

}

module.exports = ChatMsg;