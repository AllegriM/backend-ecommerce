const express = require('express')
const router = express.Router()
const productsControllers = require('../../controllers/products.controllers')

router.get('/', productsControllers.getProducts)
router.get('/:id', productsControllers.getProductById)
router.post('/', productsControllers.saveProduct)
router.put('/:id', productsControllers.updateProduct)
router.delete('/:id', productsControllers.deleteProduct)

module.exports = router