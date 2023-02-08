const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATASOURCE: process.env.DATASOURCE
}
