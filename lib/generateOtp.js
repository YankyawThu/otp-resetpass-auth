import crypto from 'crypto'

export default function GenerateOtp() {
    const otp = crypto.randomInt(0, Math.pow(10, 6)).toString().padStart(6, '0')
    const otpExpires = new Date((new Date()).getTime() + 5 * 60000) // next 5 min

    return {otp, otpExpires}
}