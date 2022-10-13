const express = require('express')
const fs = require('fs')
const router = express.Router()
const products = require('../../products.json')

router.get('/', (req, res) => {
    res.send(products)
})

router.get('/:id', (req, res) => {
    console.log("req body:", req.body, "req params:", req.params)
    const { id } = req.params
    const productSelected = products.find(product => product.id === +id)
    if (!productSelected) {
        return res.status(400).json({ error: "Producto no encontrado!" })
    }
    else {
        res.send(productSelected)
    }
})

router.post('/', (req, res) => {
    const { title, description, price, image } = req.body
    if (!title || !description || !price || !image) {
        return res.status(400).json({ error: "El producto a agregar debe contener: title, description, price, image." })
    }
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        image
    }
    products.push(newProduct)
    res.json(products)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, description, price, image } = req.body
    if (!title || !description || !price || !image) {
        return res.status(400).json({ error: "El producto a modificar debe contener: title o description o price o image." })
    }
    const productoIndex = products.findIndex(producto => producto.id === +id)
    if (productoIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!` });
    const modifyProduct = {
        ...products[productoIndex],
        title,
        description,
        price,
        image
    }
    products[productoIndex] = modifyProduct;
    res.json(products)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const productSelected = products.find(product => product.id === +id)
    if (!productSelected) {
        return res.status(400).json({ error: "Producto no encontrado!" })
    }
    const newProductArray = products.filter(product => product.id !== +id)
    console.log(newProductArray)
    res.json(newProductArray)
})

module.exports = router