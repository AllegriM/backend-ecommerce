const MongoDao = require('../../containers/mongo.container');
const messageSchema = require('../../schemas/message.schema');

const collection = 'messages';

class MessagesDao extends MongoDao {
    constructor() {
        super(collection, messageSchema);
    }
    async getMessages() {
        return await this.getAll();
    }
    async saveMessage(message, email) {
        return await this.create({ message, email });
    }
    async getMessagesByEmail(email) {
        return await this.model.find({ email });
    }
}

module.exports = new MessagesDao();