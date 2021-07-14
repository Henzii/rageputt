const nodemailer = require('nodemailer')
require('dotenv').config()


const sendEmail = (to, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    var mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info.response)
        }
    })

}
module.exports = sendEmail

