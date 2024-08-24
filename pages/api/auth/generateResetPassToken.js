import { PrismaClient } from '@prisma/client'
import SendMail from "@/lib/sendMail"
import Encrypt from '@/lib/encrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()

        const { email } = req.body
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(409).json({msg: 'Email does not exists' })
        }

        const expires = new Date((new Date()).getTime() + 5 * 60000)

        const token = Encrypt(user.id, expires.toISOString())

        const url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/resetPassword?userId=${user.id}&token=${encodeURIComponent(token)}`

        await SendMail('Your password reset link', url, email)

        const isResetPass = await prisma.resetPasswordToken.findFirst({
            where: { userId: user.id },
        })
        if(isResetPass) {
            await prisma.resetPasswordToken.update({
                where: { id: isResetPass.id },
                data: {
                    token,
                    expires,
                    used: 0
                },
            })
        }
        else {
            await prisma.resetPasswordToken.create({
                data: {
                    userId: user.id,
                    token,
                    expires
                },
            })
        }

        return res.status(200).json(token)

    } catch (error) {
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}
