import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try {
        await prisma.$connect()
        const { name, email, password } = req.body

        const existingEmail = await prisma.user.findUnique({
            where: { email },
        })
    
        if (existingEmail) {
            return res.status(409).json({ msg: 'Email already exists', exist: 1 })
        }

        const hashedPassword = await hash(password, 12)
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
    } catch (error) {
        throw error
        return res.status(500).json({ msg: 'Database error' })
    } finally {
        await prisma.$disconnect()
    }
    return res.status(201).json({msg: 'Created Successfully'})
}