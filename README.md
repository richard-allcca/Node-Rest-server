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

## Flujo de Router

- app
- models: (server.js)
- routes: (usuarios.routes.js)
- controllers: (usuarios.controllers.js)
- middleware: (middleware.validation.users.js)
- helpers: (helperValidatorsRol.js)

## Enlaces Recursos

- [Parse - JWT - Obtener Payload y fecha de creación y expiración](https://gist.github.com/Klerith/44ee5349fa13699d9c5f1e82b3be040e)

- [Generator JWT](https://jwt.io/)

- [Códigos de respuesta http](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

   -[Identity sign in Google](https://developers.google.com/identity/sign-in/web)

## Configurar Variables de Entorno Heroku

   1. Ver si esta instalado
      a. Heroku -v
   2. Iniciar sección desde terminal
      a. Heroku login
   3. Crear variables de entorno
      a. Heroku config:set MONGO_URI
   4. Eliminar variables de entorno
      a. Heroku config:unset nombre="data"
   5. Ver variables de entorno
      a. Heroku config

## Pendiente

- Crear un canal o pagina para mensajes privados del chat
