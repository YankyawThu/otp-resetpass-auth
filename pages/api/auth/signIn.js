import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import GenerateOtp from "@/lib/generateOtp"
import SendMail from "@/lib/sendMail"
import Encrypt from '@/lib/encrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const { email, password } = req.body

        const existedUser = await prisma.user.findUnique({
            where: { email },
        })

        if (!existedUser) {
            return res.status(409).json({msg: 'Email does not exists'})
        }

        if(!await compare(password, existedUser.password)) {
            return res.status(409).json({msg: 'Password is incorrect'})
        }

        const { otp, otpExpires } = GenerateOtp()

        const token = Encrypt(existedUser.id, otpExpires.toISOString())

        await prisma.otp.create({
            data: {
                token,
                userId: existedUser.id,
                code: otp,
                expires: otpExpires
            }
        })

        await SendMail('Your otp code', otp, email)

        return res.status(200).json({token, userId: existedUser.id})

    } catch (error) {
        throw error
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}