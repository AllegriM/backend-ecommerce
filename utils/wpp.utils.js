const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../config');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.messages
    .create({
        body: 'Hello! This is an editable text message. You are free to change it and write whatever you like.',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491154854428'
    })
    .then(message => console.log(message.sid))
    .done();