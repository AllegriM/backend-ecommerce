const express = require('express')
const path = require('path');
const expbs = require("express-handlebars");
const errorMiddleware = require('./middlewares/error.middleware')
const apiRoutes = require('./routes/app.routers')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const envConfig = require('./config')
const dotenv = require('dotenv');
const MongoStore =  require('connect-mongo')
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
dotenv.config();

const app = express()
app.use(express.static("./views/layouts"));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://elmonky:${envConfig.DB_PASSWORD}@eventos.of0cfsb.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: adavancedOptions
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Routes
app.use(apiRoutes)

//Motor de plantillas
app.engine(
    "hbs",
    expbs.engine({
      defaultLayout: "main",
      partialsDir: path.join(__dirname, "views/partials"),
      extname: ".hbs",
    })
  );
  app.set("views", "./views");
  app.set("views engine", "hbs");

app.use(errorMiddleware)

module.exports = app;

