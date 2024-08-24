import nodemailer from 'nodemailer'

export default async function SendMail(sub, body, receiver) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_SENDER_MAIL, 
                pass: process.env.NEXT_PUBLIC_GMAIL_SENDER_APP_PASSWORD,
            },
        })
    
        const mailOptions = {
            from: `"Yan" ${process.env.NEXT_PUBLIC_GMAIL_SENDER_MAIL}`,
            to: receiver,
            subject: sub,
            text: body,
            // html, // HTML body (optional)
        }
    
        // Send the email
        const mailRes = await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        console.log(error)
    }
}