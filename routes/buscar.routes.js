const { Router } = require("express");
const { buscar } = require("../controllers/buscar.controller");
const { check } = require("express-validator");

const router = Router();

/**
 * {{url}}/api/buscar/usuarios/richard
 * http://localhost:8085/api/buscar/usuarios/richard
 */

router.get("/:coleccion/:termino", buscar);

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
