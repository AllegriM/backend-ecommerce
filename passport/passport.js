const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/daos/users/users.daos.mongo')
const bcrypt = require('bcrypt');
const { CarritosDao } = require("../models/daos/app.daos");

passport.serializeUser((user, done) => {
    console.log("Estoy serializando", user)
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    console.log("Estoy desserializando", id)
    const user = await Users.findById(id)
    done(null, user)
})

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password)
}

passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        console.log("Estoy en el signup", req.body)
        const { name, address, age, phone, image, createdAt, updatedAt } = req.body

        const user = await Users.findOne({ email });
        if (user) {
            console.log('User already exists');
            return done(null, false)
        }

        const cart = await CarritosDao.save({ items: [] });
        const userItem = {
            email: username,
            password: createHash(password),
            name,
            address,
            age,
            phone,
            cart,
            image: req.file.filename,
            createdAt,
            updatedAt
        };
        const newUser = new Users(userItem)
        done(null, newUser)
    })
)

passport.use('local-signin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const user = await Users.findOne({ email: username })
        if (!user) {
            console.log('User not found with username', user)
            return done(null, false)
        }
        if (!isValidPassword(user, password)) {
            console.log('Invalid password');
            return done(null, false)
        }
        console.log("Login successfully")
        req.email = username
        return done(null, user)
    })
)

console.log("Passport")

module.exports = passport