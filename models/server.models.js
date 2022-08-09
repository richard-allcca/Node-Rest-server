const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { createServer } = require("http");

require("dotenv").config();

// connfig db
const { dbConnection } = require("../database/config.db");
const socketController = require("../sockets/controller.socket");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8085;
    this.server = createServer(this.app)
    this.io = require("socket.io")(this.server);

    // rutas end point
    this.paths = {
      auth:       "/api/auth",
      buscar:     "/api/buscar",
      categorias: "/api/categorias",
      productos:  "/api/productos",
      user:       "/api/users",
      uploads: "/api/uploads",
    }

    // db
    this.conectarDatabase();

    // middlewares
    this.middleware();

    // rutas de la app
    this.routes();

    // sockets
    this.socket();
  }

  // ===============================
  async conectarDatabase() {
    await dbConnection();
  }

  // ===============================
  middleware() {
    // cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico static
    this.app.use(express.static("public"));

    // Carga de archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "./tmp",
      createParentPath: true,
    }))
  }

  // ===============================
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.buscar,require("../routes/buscar.routes"));
    this.app.use(this.paths.categorias, require("../routes/categories.routes"));
    this.app.use(this.paths.productos, require("../routes/producto.routes"));
    this.app.use(this.paths.user, require("../routes/usuarios.routes"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));

  }

  // ===============================
  socket() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }


  // ===============================
  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
// Notas:
// - el constructor ejecuta los metodos al crear una instancia de esta clase en "app"

// middleware:
// 1. cors => evita erroes corss origin en los navegadores
// 2. express.json() => cualquier data de put,push o delete la serializa a json
// 3. express.static() => utiliza la carpeta public para renderizar html

// routes:
// - utiliza las rutas definidas en "routes"
