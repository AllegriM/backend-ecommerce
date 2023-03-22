const nodemailer = require('nodemailer');
const { ADMIN_EMAIL, PASSWORD_EMAIL } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: ADMIN_EMAIL,
        pass: PASSWORD_EMAIL,
    },
});

const sendNewRegEmail = async (userInfo, recipient) => {
    try {
        const mailResponse = await transporter.sendMail({
            from: ADMIN_EMAIL,
            to: recipient,
            subject: 'E-commerce - Nuevo registro de usuario',
            text: `Hola ${userInfo.name}, gracias por registrarte en E-commerce!`,
        });
        console.log(mailResponse);
        return mailResponse;
    } catch (error) {
        console.log(error);
    }
};

const sendCheckoutEmail = async (userInfo, cart, recipient) => {
    try {
        await transporter.sendMail({
            from: ADMIN_EMAIL,
            to: recipient,
            subject: `E-commerce - Nuevo pedido de ${(userInfo.name, userInfo.email)}`,
            html: `
			<h1>Productos</h1>
			${cart.map((item) => {
                return `
                    <h3>${item.title}</h3>
                    <p>${item.price}</p>
                    <p>${item.stock}</p>
                    <img src="${item.image}" alt="${item.title}" width="100" heigth="100" />
                    `;
            })
                }
			`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    sendNewRegEmail,
    sendCheckoutEmail,
};