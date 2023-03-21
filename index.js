const express = require('express')
const path = require('path');
const expbs = require("express-handlebars");
const errorMiddleware = require('./middlewares/error.middleware')
const apiRoutes = require('./routes/app.routers')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')
const passport = require('./middlewares/passport.middleware')
const dbConfig = require('./DB/db.config');
// const sendEmail = require('./utils/mailer.utils') EJECUTA EL ENVIO DE EMAIL
// const smsSender = require('./utils/sms.utils')

dotenv.config();
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

//Motor de plantillas
app.engine(
    "hbs",
    expbs.engine({
        defaultLayout: "main",
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },

    })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.use(session({
    name: 'user-session',
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({
        dbName: 'test',
        mongoUrl: dbConfig.mongodb.uri,
        ttl: 60
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 48,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.session())

// Routes
app.use('/', apiRoutes)

app.use(errorMiddleware)


module.exports = app;

