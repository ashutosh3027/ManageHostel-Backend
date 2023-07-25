const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');


// const sendEmail = async (options)=>{
//     const transporter = nodemailer.createTransport({
//         host:process.env.EMAIL_HOST,
//         port:process.env.EMAIL_PORT,
//         auth:{
//             user:process.env.EMAIL_USERNAME,
//             pass:process.env.EMAIL_PASSWORD
//         }
//     });
//     const mailOptions={
//         from:'ashutoshverma5555@gmail.com',
//         to:options.email,
//         subject:options.subject,
//         text:options.message
//     }
//     await transporter.sendMail(mailOptions);
// }

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'manageHostels@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;