import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const userOtp = await prisma.otp.findFirst({
                    orderBy: { createdAt: 'desc' },
                    where: { userId: credentials.userId, token: credentials.token },
                })
                const existedUser = await prisma.user.findUnique({
                    where: { id: credentials.userId },
                })

                if(existedUser && userOtp) {
                    if(new Date() > new Date(userOtp.expires)) {
                        return null
                    }
                    else if(userOtp.code !== credentials.otp) {
                        return null
                    }
                    else return {userOtp, existedUser, otp: credentials.otp}
                }
                else return null
            }
        }),
    ],
    pages: {
        signIn: '/auth/signIn', // Custom sign-in page
    },
    session: {
        strategy: 'jwt', // Ensure JWT strategy is used
        maxAge: 1 * 24 * 60 * 60, // days * hrs * min * sec
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if(user) return true
            else return false
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {
            // Manage session data for the client
            return session
        }
    },
})