import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import Decrypt from '@/lib/decrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        
        const { userId, token } = req.query
        const { newPassword } = req.body

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { resetPasswordToken: true }
        })

        if(!user || user.resetPasswordToken.length < 1 || user.resetPasswordToken[0].token != token) {
            return res.status(403).json({ msg: 'Invalid' })
        }
        
        const str = Decrypt(userId, token)

        if(new Date() > new Date(str) || user.resetPasswordToken[0].used == 1) {
            return res.status(403).json({ msg: 'Token expired' })
        }

        const hashedPassword = await hash(newPassword, 12)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        })

        await prisma.resetPasswordToken.update({
            where: { id: user.resetPasswordToken[0].id },
            data: {
                used: 1,
            },
        })
        
        return res.status(200).json(true)
    } catch (error) {
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}
