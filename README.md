# Recuerda

- para reconstruir los modulos node

``` npm install ```

## Contenido

- Este proyecto es una "Api rest" conectada a MongoDB

## Dependencies

- npm i express
- npm i dotenv
- npm i cors
- npm i bcryptjs
- npm i express-validator

## Codigos de Respuesta http

- <https://developer.mozilla.org/es/docs/Web/HTTP/Status>

## Flujo de Router

- app
- models: (server.js)
- routes: (usuarios.routes.js)
- controllers: (usuarios.controllers.js)
- middlewares: (middleware.validation.users.js)
- helpers: (helperValidatorsRol.js)

## Recursos

[Parse - JWT - Obtener Payload y fecha de creación y expiración](https://gist.github.com/Klerith/44ee5349fa13699d9c5f1e82b3be040e)

[Generator JWT](https://jwt.io/)

## Variables de Entorno Heroku

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

## estructura del boton de login google

[TUTORIAL - login](https://developers.google.com/identity/gsi/web)

``` html
      <div
    id="g_id_onload"
    data-client_id="1044190291877-6u5q100tqq03bn2urqh9i23rhu4i2e6r.apps.googleusercontent.com"
    data-auto_prompt="false = evita que le muestre al user un msj pidiendo se autentique" 
    data-callback="handleCredentialResponse"
    ></div>
    <div
    class="g_id_signin"
    data-type="standard"
    data-size="large"
    data-theme="outline"
    data-text="sign_in_with"
    data-shape="rectangular"
    data-logo_alignment="left"
    ></div>
```
