const config = require('config');
const nodemailer = require('nodemailer');

const sendEmail = (email, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.get('mail.user'),
            pass: config.get('mail.password')
        }
    });
    var mailOptions = {
        from: 'noreply@gmail.com',
        to: email,
        subject: subject,
        html: message
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail,
};