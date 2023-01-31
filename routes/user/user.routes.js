const { Router } = require('express');
const passport = require('passport');
const { signIn, signOut, signUp, getSignIn, getFailSignIn, getSignUp, getFailSignUp } = require('../../controllers/user.controllers')
const router = Router()

const saludito = (req, res, next) => {
    console.log("Hola")
    next()
}

// SIGNIN ROUTES
router.get('/signin', getSignIn)
router.post('/signin', passport.authenticate('local-signin', { failureRedirect: 'failsignin', successRedirect: "index" }), signIn)
router.get('/failsignin', getFailSignIn)

// SIGNUP ROUTES
router.get('/signup', getSignUp)
router.post('/signup', saludito, passport.authenticate('local-signup', { failureRedirect: 'failsignup', successRedirect: "index" }), signUp)
router.get('/failsignup', getFailSignUp)

// LOGOUT ROUTES
router.get('/logout', signOut)

module.exports = router