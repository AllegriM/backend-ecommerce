const express = require('express')
const router = express.Router()
const carritosControllers = require('../../controllers/carritos.controllers')

router.get('/', carritosControllers.getAll)
router.get('/:id/carritos', carritosControllers.getCarritoById)
router.post('/', carritosControllers.saveCarrito)
router.post('/:id/carritos', carritosControllers.updateCarrito)
router.delete('/:id', carritosControllers.deleteCarrito)

module.exports = router