import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { hash } from 'bcryptjs'
import { authOptions } from './[...nextauth]'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()

        const { oldPass, newPass, confirmPass } = req.body

        const session = await getServerSession(req, res, authOptions)

        const user = session.user
        const existedUser = await prisma.user.findUnique({
            where: { email: user.email },
        })

        if(!await compare(oldPass, existedUser.password)) {
            return res.status(409).json({msg: 'Old password is incorrect' })
        }

        if(newPass !== confirmPass) {
            return res.status(409).json({msg: 'Confirm and new password must be same' })
        }

        const hashedPassword = await hash(newPass, 12)
        await prisma.user.update({
            where: { id: existedUser.id },
            data: {
                password: hashedPassword
            },
        })
        
        return res.status(200).json(true)
    } catch (error) {
        throw error
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
}