import nodemailer from 'nodemailer'

export default async function SendMail(body, receiver) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yankyawthudev97@gmail.com', 
                pass: 'aels shma csqe ayqg',
            },
        })
    
        const mailOptions = {
            from: '"Yan" yankyawthudev97@gmail.com', // Sender address
            to: receiver, // Recipient address
            subject: 'Test sending mail', // Subject line
            text: body, // Plain text body
            // html, // HTML body (optional)
        }
    
        // Send the email
        const mailRes = await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        console.log(error)
    }
}