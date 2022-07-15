import * as nodemailer from 'nodemailer';
exports.sentEmail = async (receiverEmail, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject,
        headers: {
            "X-Laziness-level": 1000,
            "charset": 'UTF-8'
        },
        html
    };

    await transporter.sendMail(mailOptions);
}