import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../constants";


export const sendEmail = async (to: string, html: any) => {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER, // generated ethereal user
            pass: EMAIL_PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Reddit Clone 👻" reddit@reddit.com', // sender address
        to, // receivers
        subject: "Forgot Password", // Subject line
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
