const path = require('path')
const logger = require("../middlewares/logs.middleware");
const ChatServices = require("../services/messages.service");

const Chat = new ChatServices();

class ChatController {
    async getChat(req, res, next) {
        try {
            const messages = await Chat.getMessages();
            console.log(messages)
            logger.info("[get] => /chat");
            // render an chat.html file with the messages
            res.sendFile(path.resolve('public/chat.html'));
        } catch (error) {
            next(error);
        }
    }
    async saveMessage(req, res, next) {
        try {
            const { text } = req.body;
            const { email } = req.user;
            const newMessage = await Chat.save({ text, email });
            res.json(newMessage);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ChatController();

