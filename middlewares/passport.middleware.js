const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const CarritosService = require('../services/cart.service')
const UsersService = require("../services/users.service");
const bcrypt = require('bcrypt');
const logger = require("./logs.middleware");
const { formatUserForDB } = require("../utils/formatuser.utils");
const { sendNewRegEmail } = require("./emailer.middleware");

const Users = new UsersService();
const Carts = new CarritosService();

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

        try {
            const { name, address, age, phone } = req.body
            const user = await Users.getByEmail(email);
            if (user) {
                console.log('User already exists');
                return done(null, false)
            }

            const cart = await Carts.createCart({ items: [] });

            const userItem = {
                email,
                password: createHash(password),
                name,
                address,
                age,
                phone,
                cart,
                image: req.file.filename,
            };

            const formattedUser = formatUserForDB(userItem)
            const newUser = await Users.create(formattedUser)
            await sendNewRegEmail(formattedUser, formattedUser.email)
            logger.info('User registration successful');
            return done(null, newUser)
        } catch (error) {
            console.log(error)
            done(error)
        }
    })
)

passport.use('signin', new LocalStrategy({
    usernameField: "email",
},
    async (email, password, done) => {
        try {
            const user = await Users.getByEmail(email)
            if (!user) {
                console.log('User not found with username', user)
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid password');
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            console.log(error)
            done(error)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await Users.getById(id)
    done(null, user)
})

module.exports = passport