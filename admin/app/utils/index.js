import * as nodemailer from 'nodemailer';

export const getSearchRegexp = async (value) => {
    if (value.toString().startsWith('+')) { return value.slice(1) }
    if (value.toString().startsWith('???')) { value = value.replace('???', '?') }
    if (value.toString().startsWith('[')) { value = value.slice(1) }
    if (value.toString().startsWith('(')) { value = value.slice(1) }
    const result = { $regex: `.*` + value.trim() + '.*', $options: '-i' }
    return result
}

export const sentEmail = async (receiverEmail, subject, html) => {
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
    transporter.sendMail(mailOptions);
}
