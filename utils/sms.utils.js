const twilio = require('twilio');

const accountSiD = "ACfa987551fa4f941608f3f24ea0bc8f7f"
const authToken = "f9aacb7158fb00f2b919974ef040fe4c"
const personal_phone = "+541154854428"
const twilio_phone = "+19254307740"

const client = twilio(accountSiD, authToken)

const sendSMS = async () => {
    try {
        const message = await client.messages.create({
            body: "Hola soy un SMS desde Node.js",
            from: twilio_phone,
            to: personal_phone
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendSMS