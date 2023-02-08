const { Router } = require('express');
const passport = require('passport');
const { signOut, getSignIn, getFailSignIn, getSignUp, getFailSignUp } = require('../../controllers/user.controllers')
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

router.post('/signin', passport.authenticate("signin", {
    successRedirect: "/",
    failureRedirect: "/failsignin",
}));
router.post('/signup', upload.single('image'), passport.authenticate("signup", { successRedirect: '/signin' }))

// SIGNIN ROUTES
router.get('/signin', getSignIn)
router.get('/failsignin', getFailSignIn)

// SIGNUP ROUTES
router.get('/signup', getSignUp)
router.get('/failsignup', getFailSignUp)

// LOGOUT ROUTES
router.get('/logout', signOut)

module.exports = router