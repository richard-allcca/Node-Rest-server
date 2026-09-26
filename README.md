# Node REST Server

API REST construida con Node.js, Express y MongoDB. Incluye autenticación con
JWT y Google, gestión de usuarios, categorías y productos, carga de imágenes
con Cloudinary y un chat en tiempo real mediante Socket.IO.

## Requisitos

- Node.js 14 o superior.
- MongoDB accesible desde la aplicación.
- Una cuenta de Cloudinary para actualizar imágenes.
- Credenciales OAuth de Google si se usará el inicio de sesión con Google.

## Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=8085
MONGO_URI=mongodb://localhost:27017/nombre_de_la_base
SECRETORPRIVATEKEY=una_clave_secreta_larga
GOOGLE_CLIENT_ID=tu cliente id de Google
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

`PORT` es opcional; el valor predeterminado es `8085`. No publiques el archivo
`.env` ni compartas sus credenciales.

## Ejecución

```bash
npm start
```

La API queda disponible en `http://localhost:8085` (o en el puerto definido en
`PORT`). El directorio `public/` se sirve como contenido estático; por ejemplo,
la página de inicio está en `http://localhost:8085/index.html`.

## Autenticación

Las rutas protegidas reciben el JWT en la cabecera `x-token`:

```http
x-token: <token>
```

El login devuelve el usuario y un token. Roles disponibles en los validadores:
`ADMIN_ROLE`, `USER_ROLE` y `VENTAS_ROLE`.

## API

En los ejemplos, `BASE_URL` es `http://localhost:8085`.

### Endpoints de autenticación

| Método | Ruta | Descripción | Acceso |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Iniciar sesión con correo y contraseña | Público |
| `POST` | `/api/auth/google` | Iniciar sesión con `id_token` de Google | Público |
| `GET` | `/api/auth` | Renovar el token actual | JWT |

Ejemplo de login:

```json
{
      "correo": "usuario@ejemplo.com",
      "password": "123456"
}
```

### Usuarios

| Método | Ruta | Descripción | Acceso |
| --- | --- | --- | --- |
| `GET` | `/api/users` | Listar usuarios; admite `desde` y `limite` | Público |
| `GET` | `/api/users/:nombre` | Buscar un usuario por nombre | Público |
| `POST` | `/api/users` | Crear un usuario | Público |
| `PUT` | `/api/users/:id` | Actualizar un usuario | Público |
| `PATCH` | `/api/users` | Actualización parcial | Público |
| `DELETE` | `/api/users/:id` | Eliminar un usuario | JWT y `ADMIN_ROLE` o `USER_ROLE` |

El alta de usuario requiere `nombre`, una contraseña de al menos seis
caracteres, `correo` y un rol válido.

### Categorías y productos

| Método | Ruta | Descripción | Acceso |
| --- | --- | --- | --- |
| `GET` | `/api/categorias` | Listar categorías | Público |
| `GET` | `/api/categorias/:id` | Obtener una categoría | Público |
| `POST` | `/api/categorias` | Crear una categoría | JWT |
| `PUT` | `/api/categorias/:id` | Actualizar una categoría | JWT |
| `DELETE` | `/api/categorias/:id` | Eliminar una categoría | JWT y administrador |
| `GET` | `/api/productos` | Listar productos | Público |
| `GET` | `/api/productos/:id` | Obtener un producto | Público |
| `POST` | `/api/productos` | Crear un producto | JWT |
| `PUT` | `/api/productos/:id` | Actualizar un producto | JWT |
| `DELETE` | `/api/productos/:id` | Eliminar un producto | JWT y administrador |

### Búsqueda

```http
GET /api/buscar/:coleccion/:termino
```

`coleccion` admite las colecciones implementadas por el controlador de
búsqueda, como `usuarios`, `categorias` y `productos`.

### Imágenes

Las imágenes de usuarios y productos se identifican mediante `coleccion` e
`id`:

```http
POST /api/uploads
PUT  /api/uploads/:coleccion/:id
GET  /api/uploads/:coleccion/:id
```

Para `PUT`, envía el archivo multipart en el campo `archivo`. Las colecciones
permitidas son `usuarios` y `productos`.

## Chat con Socket.IO

El cliente debe conectarse al mismo host y enviar el JWT durante el handshake
mediante la cabecera `x-token`. El servidor usa estos eventos:

- `usuarios-activos`: lista de usuarios conectados.
- `recibir-mensaje`: mensajes públicos recientes.
- `enviar-mensaje`: recibe `{ "mensaje": "texto" }` para publicar o
      `{ "uid": "id", "mensaje": "texto" }` para un mensaje privado.
- `mensajes-privados`: mensajes enviados a un usuario concreto.

## Estructura principal

```text
app.js                 Punto de entrada
models/server.models.js Configuración de Express, rutas y Socket.IO
routes/                Definición de endpoints
controllers/           Lógica de negocio
middlewares/           Validación, JWT y roles
database/              Conexión a MongoDB
public/                Cliente web estático
```

## Recursos

- [JWT.io](https://jwt.io/)
- [Códigos de respuesta HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- [Google Identity](https://developers.google.com/identity/sign-in/web)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
