const { Router } = require('express');
const passport = require('passport');
const { signIn, signOut, signUp, getSignIn, getFailSignIn, getSignUp, getFailSignUp } = require('../../controllers/user.controllers')
const router = Router()
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

const upload = multer({ storage: storage });

// SIGNIN ROUTES
router.get('/signin', getSignIn)
router.post('/signin', passport.authenticate('local-signin', { failureRedirect: 'failsignin', successRedirect: '/' }), signIn)
router.get('/failsignin', getFailSignIn)

// SIGNUP ROUTES
router.get('/signup', getSignUp)
router.post('/signup', upload.single('image'), passport.authenticate('local-signup', { failureRedirect: 'failsignup', successRedirect: '/signin' }), signUp)
router.get('/failsignup', getFailSignUp)

// LOGOUT ROUTES
router.get('/logout', signOut)

module.exports = router