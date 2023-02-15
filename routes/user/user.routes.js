const { Router } = require('express');
const passport = require('passport');
const UserController = require('../../controllers/user.controllers')
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
router.get('/signin', UserController.getSignIn)
router.get('/failsignin', UserController.getFailSignIn)

// SIGNUP ROUTES
router.get('/signup', UserController.getSignUp)
router.get('/failsignup', UserController.getFailSignUp)

// LOGOUT ROUTES
router.get('/logout', UserController.signOut)

module.exports = router