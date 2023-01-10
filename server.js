const app = require("./index.js");
const envConfig = require("./config");
const MongoContainer = require("./models/containers/mongo.container");
const args = require('./utils/minimist');
const clusterMode = require('./utils/clusterMode');
console.log(clusterMode)
const os = require('os');
const PORT = parseInt(process.argv[2]) || 8080;

// if (["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
//     FirebaseContainer.connect();
//     console.log(`Server is up and running on port: `, PORT);
//     console.log("Connected to " + envConfig.DATASOURCE);
// }

if (clusterMode && process.isPrimary) {
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {
    // Listen
    app.listen(args.port, () => {
        if (!["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
            MongoContainer.connect().then(() => {
                console.log("Connected to " + envConfig.DATASOURCE);
            })
        }
        console.log(`Server is up and running on port: `, PORT);
    });
}



app.on('error', error => {
    console.error(`Error: ${error}`)
})