const app = require('./index');
const cors = require('cors')
const args = require('./utils/minimist');
const clusterMode = require('./utils/clusterMode');
const MongoContainer = require("./models/containers/mongo.container");
const cluster = require('cluster')
const envConfig = require('./config')
const os = require('os');
const { Server: HttpServer } = require('http');
const logger = require('./middlewares/logs.middleware');

const PORT = args.PORT || 8080;

const httpServer = new HttpServer(app);
app.use(cors())

if (clusterMode && cluster.isMaster) {
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
    logger.info(`Worker process ${process.pid} is running.`);
    app.listen(PORT, () => {
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
