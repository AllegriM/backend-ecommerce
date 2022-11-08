const app = require("./app");
const envConfig = require("./config");
const MongoContainer = require("./models/containers/mongo.container");
const FirebaseContainer = require("./models/containers/firebase.container");

const PORT = process.env.PORT || 8080;


// if (["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
//     FirebaseContainer.connect();
//     console.log(`Server is up and running on port: `, PORT);
//     console.log("Connected to " + envConfig.DATASOURCE);
// }

const server = app.listen(PORT, () => {
    if (!["memory", "firebase"].includes(envConfig.DATASOURCE || "")) {
        MongoContainer.connect().then(() => {
            console.log("Connected to " + envConfig.DATASOURCE);
        })
    }
    console.log(`Server is up and running on port: `, PORT);
});

server.on('error', error => {
    console.error(`Error: ${error}`)
})