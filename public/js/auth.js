const $formulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8085/api/auth/"
  : "https://api-rest-cafe-node.herokuapp.com/api/auth/google";


// Login con email and pass
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    correo: $formulario.correo.value,
    password: $formulario.password.value,
  };

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => {
      const { token, msg } = data;

      // Almacena token en ls para socket
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => console.log({err}));
});

// Login width google
function onSignIn2(googleUser) {

  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };

  fetch(url + "google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      const { token } = data;

      // Almacena token en ls para socket
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch(console.log);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
