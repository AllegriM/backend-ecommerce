const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require('../config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSMS = async (phoneNumber) => {
    try {
        const message = await client.messages.create({
            body: "Hola soy un SMS desde Node.js",
            from: TWILIO_PHONE_NUMBER,
            to: phoneNumber
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendSMS