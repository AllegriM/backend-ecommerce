const { Router } = require('express');
const { signIn, signOut } = require('../../controllers/user.controllers')
const router = Router()

router.get('/login', (req, res) => {
    return res.render("login.hbs")
})

router.post('/login', signIn)

router.get('/logout', signOut)

module.exports = router;