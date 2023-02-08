const express = require('express')
const router = express.Router()
const compression = require('compression')
const logger = require('../../middlewares/logs.middleware')
const clusterMode = require('../../utils/clusterMode')
const os = require('os')

const getInfo = (req, res) => {
    clusterMode && (cpus = os.cpus().length);

    const OS = process.platform
    const args = process.argv.slice(2)
    const nodeV = process.version
    const memUse = process.memoryUsage()
    const path = process.cwd()
    const pId = process.pid
    logger.info('[GET] => /info');
    res.render('info.hbs', { OS, args, nodeV, memUse, path, pId })
}

router.get('/info', getInfo)

router.get('/infozip', compression(), getInfo)

router.get('/profile', async (req, res) => {
    let user = req.user;
    try {
        console.log("Estoy en profile con esta data", user)
        return res.render('profile.hbs', { user });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router