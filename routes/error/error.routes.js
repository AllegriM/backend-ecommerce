const { Router } = require("express");
const error = Router();
const logger = require('../../middlewares/logs.middleware')

error
    .get("*", (req, res) => {
        logger.error('[GET] =>  Error al querer obtener: ', req.originalUrl)
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .post("*", (req, res) => {
        logger.error('[POST] => Error al querer obtener: ', req.originalUrl)
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .delete("*", (req, res) => {
        logger.error('[DEL] =>  Error al querer obtener: ', req.originalUrl)
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    })
    .put("*", (req, res) => {
        logger.error('[PUT] =>  Error al querer obtener: ', req.originalUrl)
        res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no implementada` })
    });

module.exports = error;