const app = require("./index.js");
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);
const envConfig = require("./config");
const MongoContainer = require("./models/containers/mongo.container");
const args = require('./utils/minimist');
const clusterMode = require('./utils/clusterMode');
const cluster = require('cluster')
const os = require('os');

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