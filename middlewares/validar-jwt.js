const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const validarJwt = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	const { id } = req.params; // id user to delete
	const { method, originalUrl } = req;

	if (!token) {
		return res.status(401).json({ message: "No hay token en la petición." });
	}

	try {
		// Valida el TOKEN generado en el login con contraseña (ENCRIPTADOS)
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		if (method === "DELETE" && originalUrl.includes("/api/users/")) {
			const [usuario, userToDelete] = await Promise.all([
				Usuario.findById(uid),
				Usuario.findById(id),
			]);

			if (!userToDelete || !userToDelete.estado) {
				return res
					.status(401)
					.json({ message: "Id no válido - usuario no existe en la DB." });
			}
		}
    //  else if (method === "POST" && originalUrl.includes("/api/categorias")) {
		// 	// No se requieren validaciones adicionales para la creación de categorías
		// } else if (method === "PUT" && originalUrl.includes("/api/categorias")) {
		// 	// No se requieren validaciones adicionales para la actualización de categorías
		// } else if (method === "DELETE" && originalUrl.includes("/api/categorias")) {
		// 	// No se requieren validaciones adicionales para la actualización de categorías
		// } else {
		// 	// Manejar cualquier otro tipo de petición o URL no esperada
		// 	return res.status(400).json({ error: "Petición inválida." });
		// }

		const usuario = await Usuario.findById(uid);

		if (!usuario || !usuario.estado) {
			return res
				.status(401)
				.json({ message: "Token inválido - Estado del usuario." });
		}

		req.usuario = usuario;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: "Token inválido." });
	}
};

module.exports = {
	validarJwt,
};

