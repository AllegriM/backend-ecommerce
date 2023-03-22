const express = require('express')
const router = express.Router()
const productsControllers = require('../../controllers/products.controllers')

router.get('/', productsControllers.getProducts)
router.post('/', productsControllers.saveProduct)
router.get('/new', productsControllers.newProduct)
router.post('/new', productsControllers.saveProduct)
router.post('/update/:id', productsControllers.updateProduct)
router.get('/update/:id', productsControllers.getUpdate)
router.post('/delete/:id', productsControllers.deleteProduct)
router.get('/delete/:id', productsControllers.getDelete)
router.get('/:id', productsControllers.getProductById)
router.post('/:id', productsControllers.addProductToCart)

module.exports = router