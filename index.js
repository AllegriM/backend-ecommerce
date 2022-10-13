const express = require('express')
const apiRoutes = require('./routes/app.routers')

const PORT = process.env.PORT || 8080;
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', (error) => {
    console.log(error)
})