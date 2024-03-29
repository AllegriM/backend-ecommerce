const MessagesDao = require('../models/daos/messages/messages.dao.js');

class MessagesService {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        return await MessagesDao.getMessages();
    }

    async save(message, email) {
        return await MessagesDao.save(message, email);
    }

    async getMessagesByEmail(email) {
        return await MessagesDao.getMessagesByEmail(email);
    }
}

module.exports = MessagesService

