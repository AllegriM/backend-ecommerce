const { Router } = require('express');
const passport = require('passport');
const { signIn, signOut, signUp, getSignIn, getFailSignIn, getSignUp, getFailSignUp } = require('../../controllers/user.controllers')
const router = Router()

// SIGNIN ROUTES
router.get('/signin', getSignIn)
router.post('/signin', passport.authenticate('signin', { failureRedirect: 'failsignin' }) ,signIn)
router.get('/failsignin', getFailSignIn)

// SIGNUP ROUTES
router.get('/signup', getSignUp)
router.post('/signup', passport.authenticate('signup', { failureRedirect: 'failsignup', successRedirect: 'signin' }) ,signUp)
router.get('/failsignup', getFailSignUp)

// LOGOUT ROUTES
router.get('/logout', signOut)

module.exports = router