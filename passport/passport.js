const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/daos/users/users.daos.mongo')
const bcrypt = require('bcrypt')

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

passport.use('signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const user = await Users.findOne({ email: username });
        if (user) {
            console.log('User already exists');
            return done(null, false)
        }
        const newUser = new Users()
        newUser.email = username;
        newUser.password = createHash(password)
        await newUser.save()
        done(null, newUser)
    })
)

passport.use('signin', new LocalStrategy({
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
