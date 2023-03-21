const app = require('./index');
const cors = require('cors')
const args = require('./utils/minimist');
const clusterMode = require('./utils/clusterMode');
const MongoContainer = require("./models/containers/mongo.container");
const cluster = require('cluster')
const envConfig = require('./config')
const os = require('os');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const logger = require('./middlewares/logs.middleware');
const MessageServices = require('./services/messages.service');

const Message = new MessageServices();

const PORT = args.PORT || 8080;

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
    // Socket.io
    const httpServer = new HttpServer(app);
    const io = new SocketServer(httpServer)
    // Listen
    logger.info(`Worker process ${process.pid} is running.`);

    httpServer.listen(PORT, () => {
        if (!["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
            MongoContainer.connect().then(() => {
                console.log("Connected to " + envConfig.DATASOURCE);
            })
        }
    });

    httpServer.on('error', error => {
        console.error(`Error: ${error}`)
    })

    io.on('connection', async socket => {
        logger.info(`New client connection - ID: ${socket.id}`)

        // Getting all messages
        const messages = await Message.getMessages()
        socket.emit('messages', { messages })

        // New Message
        socket.on('new-message', async () => {
            const messages = await Message.getMessages()
            io.emit('messages', { messages })
        })
    })
}

