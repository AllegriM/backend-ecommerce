const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/schemas/user.schema')
const bcrypt = require('bcrypt');
const Carritos = require("../models/schemas/carritos.schema");

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
        const { name, address, age, phone, createdAt, updatedAt } = req.body

        const user = await Users.findOne({ email });
        if (user) {
            console.log('User already exists');
            return done(null, false)
        }

        const cart = await Carritos.create({ items: [] });
        const userItem = {
            email,
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
        const newUser = await Users.create(userItem)
        done(null, newUser)
    })
)

passport.use('local-signin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        const user = await Users.findOne({ email })
        if (!user) {
            console.log('User not found with username', user)
            return done(null, false)
        }
        if (!isValidPassword(user, password)) {
            console.log('Invalid password');
            return done(null, false)
        }
        console.log("Login successfully")
        req.email = email
        return done(null, user)
    })
)

console.log("Passport")

module.exports = passport