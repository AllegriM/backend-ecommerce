const express = require('express')
const { Server: HttpServer } = require('http');
const MongoContainer = require("./models/containers/mongo.container");
const args = require('./utils/minimist');
const clusterMode = require('./utils/clusterMode');
const cluster = require('cluster')
const os = require('os');
const path = require('path');
const expbs = require("express-handlebars");
const errorMiddleware = require('./middlewares/error.middleware')
const apiRoutes = require('./routes/app.routers')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const envConfig = require('./config')
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')
const passport = require('./passport/passport')
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// const sendEmail = require('./utils/mailer.utils') EJECUTA EL ENVIO DE EMAIL
// const smsSender = require('./utils/sms.utils')

dotenv.config();
const app = express()
const httpServer = new HttpServer(app);

app.use(express.static("./views/layouts"));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://elmonky:${envConfig.DB_PASSWORD}@eventos.of0cfsb.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: adavancedOptions
    }),
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 600000
    },
    rolling: true,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(apiRoutes)

app.use(errorMiddleware)

if (clusterMode && process.isPrimary) {
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleDateString());
        cluster.fork()
    })
} else {
    // Listen
    app.listen(args.port, () => {
        if (!["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
            MongoContainer.connect().then(() => {
                console.log("Connected to " + envConfig.DATASOURCE);
            })
        }
    });
}

httpServer.on('error', error => {
    console.error(`Error: ${error}`)
})

module.exports = app;

