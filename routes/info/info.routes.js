const express = require('express')
const router = express.Router()
// const { getInfo } = require('../../controllers/info.controllers')

const getInfo = (req, res) => {
    const OS = process.platform
    const args = process.argv.slice(2)
    const nodeV = process.version
    const memUse = process.memoryUsage()
    const path = process.cwd()
    const pId = process.pid
    res.render('info.hbs', {OS, args, nodeV, memUse, path, pId})
}

router.get('/', getInfo)

module.exports = router