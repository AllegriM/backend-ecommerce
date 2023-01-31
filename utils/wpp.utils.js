const accountSid = 'ACfa987551fa4f941608f3f24ea0bc8f7f';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello! This is an editable text message. You are free to change it and write whatever you like.',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491154854428'
    })
    .then(message => console.log(message.sid))
    .done();