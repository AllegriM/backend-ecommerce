const { Router } = require("express");
const error = Router();

error
    .get("*", (req, res) => {
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .post("*", (req, res) => {
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .delete("*", (req, res) => {
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .put("*", (req, res) => {
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    });

module.exports = error;