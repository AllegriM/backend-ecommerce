const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/schemas/user.schema')
const bcrypt = require('bcrypt');
const Carritos = require("../models/schemas/carritos.schema");
const logger = require("./logs.middleware");
const { formatUserForDB } = require("../utils/formatuser.utils");

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password)
}

passport.use('signup', new LocalStrategy({
    usernameField: "email",
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
        const formattedUser = formatUserForDB(userItem)
        const newUser = await Users.create(formattedUser)
        logger.info('User registration successful');
        return done(null, newUser)
    })
)

passport.use('signin', new LocalStrategy({
    usernameField: "email",
},
    async (email, password, done) => {
        const user = await Users.findOne({ email }).lean()
        if (!user) {
            console.log('User not found with username', user)
            return done(null, false)
        }
        if (!isValidPassword(user, password)) {
            console.log('Invalid password');
            return done(null, false)
        }
        return done(null, user)
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id)
    done(null, user)
})

module.exports = passport