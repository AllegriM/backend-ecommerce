const { Schema } = require('mongoose')

const messageSchema = new Schema({
    date: { type: Date, default: new Date() },
    email: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = messageSchema