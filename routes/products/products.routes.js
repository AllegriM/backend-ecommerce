const express = require('express')
const fs = require('fs')
const router = express.Router()
const products = require('../../class/products')

const admin = true

router.get('/', (req, res) => {
    res.json(products.getAllProducts())
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.json(products.getProductByID(id) || res.status(400).json({ error: "Producto no encontrado!" }))
})

router.post('/', (req, res) => {
    const productData = req.body
    if (admin) {
        if (!productData.name || !productData.description || !productData.code || !productData.price || !productData.image || !productData.stock) {
            res.status(400).json({ error: "El producto a agregar debe contener: name, description, price, image, code, stock." })
        }
        res.json(products.addProduct(productData))
    } else {
        res.json({ error: -1, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no autorizada` })
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const productData = req.body
    if (!productData.name || !productData.description || !productData.code || !productData.price || !productData.image || !productData.stock) {
        return res.status(400).json({ error: "El producto a agregar debe contener: name, description, price, image, code, stock." })
    }
    if (admin) {
        res.json(products.updateProduct(id, productData)) || 'No se pudo modificar el producto'
    } else {
        res.json({ error: -1, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no autorizada` })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    if (admin) {
        res.json(products.deleteProduct(id)) || res.status(400).json({ error: "Producto no encontrado!" })
    } else {
        res.json({ error: -1, descripcion: `ruta '${req.originalUrl}' motodo '${req.method}' no autorizada` })
    }
})

module.exports = router