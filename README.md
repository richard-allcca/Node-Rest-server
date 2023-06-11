# Inicio

- para reconstruir los módulos node

    npm install

- correr en local

    npm run start

- Recuerda asegurate tener las variables de entorno `.env`

## Contenido

- [Contenido](#contenido)
- [Descripción](#descripción)
- [Dependencies Utilizadas](#dependencies-utilizadas)
- [Flujo de Router](#flujo-de-router)
- [Enlaces Recursos](#enlaces-recursos)
- [Configurar Variables de Entorno Heroku](#configurar-variables-de-entorno-heroku)
- [Pendiente](#pendiente)

## Descripción

- Este proyecto es una "Api rest" conectada a MongoDB

## Dependencies Utilizadas

- npm i express
- npm i dotenv
- npm i cors
- npm i bcryptjs
- npm i express-validator
- npm i express-fileupload
- npm i uuid
- npm i google-auth-library --save
- npm i cloudinary

## Enlaces Recursos

- [Parse - JWT - Obtener Payload y fecha de creación y expiración](https://gist.github.com/Klerith/44ee5349fa13699d9c5f1e82b3be040e)

- [Generator JWT](https://jwt.io/)

- [Códigos de respuesta http](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

- [Identity sign in Google](https://developers.google.com/identity/sign-in/web)

## Endpoints Usuarios

- `Obtener` un usuario

      GET - localhost:8085/api/users/[nombre]

- `Listar` de usuarios

      GET - localhost:8085/api/users/

- `Crear` usuario, roles validos "ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"

      POST - localhost:8085/api/users/
      body:
      {
        "nombre":"rafael",
        "correo":"rafael@hotmail.com",
        "password":"123456",
        "rol":"ADMIN_ROLE"
      }

- `Actualizar` Usurio

      PUT - localhost:8085/api/user/[mongo_id]

- `Eliminar` Usuario

      DELETE - localhost:8085/api/users/[mongo_id]

## Pendiente

- Crear un canal o pagina para mensajes privados del chat
