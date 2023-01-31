const { createTransport } = require('nodemailer')

const TEST_EMAIL = "elmonky99@gmail.com"
const PASSWORD_EMAIL = "wnxwcyububqsojww"

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: PASSWORD_EMAIL
    }
})

const mailOptions = {
    from: "Servidos Node.js",
    to: TEST_EMAIL,
    subject: "Bienvenido a Node.js",
    text: "<h2 style='color:blue'>Bienvenido a Node.js</h2>",
    // attachments: [
    //     {
    //         filename: "logo.png",
    //     }
    // ] 
    // Aca puedo poner archivos como imagenes adjuntas
}


try {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
        }
    })
} catch (error) {
    console.log(error)
}