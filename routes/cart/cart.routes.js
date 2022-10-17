const express = require('express')
const fs = require('fs')
const router = express.Router()
const cart = require('../../class/cart')

router.post('/', (req, res) => {
    res.json(createCart())
})

router.get('/:id/products', (req, res) => {
    const { id } = req.params
    const cartSelected = cart.find(cart => cart.id === +id)
    if (!cartSelected) {
        return res.status(400).json({ error: "Carrito no encontrado!" })
    }
    else {
        res.json(getCartProducts(id))
    }
})

router.post('/:id/products', (req, res) => {
    const { id } = req.params
    const productData = req.body
    if (!productData.name || !productData.description || !productData.code || !productData.price || !productData.image || !productData.stock) {
        return res.status(400).json({ error: "El producto a agregar debe contener: title, description, price, image." })
    } else {
        cart.addProductToCart(id, productData)
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const cartSelected = cart.find(cart => cart.id === +id)
    if (!cartSelected) {
        return res.status(400).json({ error: "Carrito no encontrado!" })
    } else {
        cart.deleteCart(id)
    }
})

router.delete('/:id/products/:id_prod', (req, res) => {
    const { id, id_prod } = req.params
    const cartSelected = cart.find(cart => cart.id === +id)
    if (!cartSelected) {
        return res.status(400).json({ error: "Carrito no encontrado!" })
    } else {
        cart.deleteProductFromCart(id, id_prod)
    }
})

module.exports = router