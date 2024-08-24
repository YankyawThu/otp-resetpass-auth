import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })
                if (user && await compare(credentials.password, user.password)) {
                    return user
                }
                return null
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
        async jwt({ token, user, account, profile, session }) {
            // Add user info to token if the user is signing in for the first time
            return token
        },
        async session({ session, token, user }) {
            // Manage session data for the client
            return session
        }
    },
})