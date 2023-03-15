// Start tests here

const assert = require('assert').strict
const UsersServices = require('../services/users.service')
const productServices = require('../services/products.service')



// Make http requests to the server
const product = new productServices()
const user = new UsersServices()

describe('La app esta funcionando', () => {
    it('Debe devolver true', () => {
        assert.equal(true, true)
    })
})

// Crear test para crear un nuevo user

describe('Crear un nuevo user', () => {
    it('Debe crear un nuevo user', async (done) => {
        const newUser = {
            email: 'asdasd@gmail.com',
            password: '123456',
            name: 'asdasd',
        }

        const createdUser = await user.create(newUser)
        assert.equal(createdUser.email, newUser.email)
        done()
    })
})

// Crear test para obtener todos los usuarios

describe('Obtener todos los usuarios', () => {
    it('Debe obtener todos los usuarios', async (done) => {
        const users = await user.getAll()
        assert.equal(users.length, 1)
        done()
    })
})

// Crear test para obtener un usuario por id

describe('Obtener un usuario por id', () => {
    it('Debe obtener un usuario por id', async (done) => {
        const user = await user.getById('[...]')
        assert.equal(user.email, '[...]')
        done()
    })
})

// Crear test para actualizar un usuario

describe('Actualizar un usuario', () => {
    it('Debe actualizar un usuario', async (done) => {
        const user = await user.update('[...]', {
            email: '',
            password: '',
            name: '',
        })
        assert.equal(user.email, '')
        done()
    })
})

// Crear test para crear producto

describe('Crear un nuevo producto', () => {
    it('Debe crear un nuevo producto', async (done) => {
        const newProduct = {
            name: 'asdasd',
            price: 123456,
            description: 'asdasd',
            image: 'asdasd',
            category: 'asdasd',
        }

        const createdProduct = await product.create(newProduct)
        assert.equal(createdProduct.name, newProduct.name)
        done()
    })
})

// Crear test para obtener todos los productos

describe('Obtener todos los productos', () => {
    it('Debe obtener todos los productos', async (done) => {
        const products = await product.getAll()
        assert.equal(products.length, 1)
        done()
    })
})

// Crear test para obtener un producto por id

describe('Obtener un producto por id', () => {
    it('Debe obtener un producto por id', async (done) => {
        const product = await product.getById('asdasd')
        assert.equal(product.name, 'asdasd')
        done()
    })
})

// Crear test para actualizar un producto

describe('Actualizar un producto', () => {
    it('Debe actualizar un producto', async (done) => {
        const product = await product.update('asdasd', {
            name: 'asdasd',
            price: 123456,
            description: 'asdasd',
            image: 'asdasd',
            category: 'asdasd',
        })
        assert.equal(product.name, 'asdasd')
        done()
    })
})

// Crear test para eliminar un producto

describe('Eliminar un producto', () => {
    it('Debe eliminar un producto', async (done) => {
        const product = await product.delete('asdasd')
        assert.equal(product.name, 'asdasd')
        done()
    })
})

