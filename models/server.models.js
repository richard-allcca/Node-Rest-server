const express = require("express");
const cors = require("cors");
require("dotenv").config();

// connfig db
const { dbConnection } = require("../database/config.db");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8085;

    // rutas end point
    this.paths = {
      auth:       "/api/auth",
      buscar:     "/api/buscar",
      categorias: "/api/categorias",
      productos:  "/api/productos",
      user:       "/api/users",
    }

    // db
    this.conectarDatabase();

    // middlewares
    this.middleware();

    // rutas de la app
    this.routes();
  }

  // ===============================
  async conectarDatabase() {
    await dbConnection();
  }

  // ===============================
  middleware() {
    // cors
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico static
    this.app.use(express.static("public"));
  }

  // ===============================
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.buscar,require("../routes/buscar.routes"));
    this.app.use(this.paths.categorias, require("../routes/categories.routes"));
    this.app.use(this.paths.productos, require("../routes/producto.routes"));
    this.app.use(this.paths.user, require("../routes/usuarios.routes"));

  }

  // ===============================
  listen() {
    this.app.listen(this.port, () => {
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
