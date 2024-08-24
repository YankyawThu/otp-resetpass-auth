import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const secret = process.env.NEXTAUTH_SECRET
    const authUser = await getToken({ req, secret })
    const url = req.nextUrl.clone()

    // Authentication
    if (!authUser && !url.pathname.startsWith('/auth/signin')) {
        if(url.pathname == '/resetPassword' && !url.searchParams.get('userId') || !url.searchParams.get('token')) {
            url.pathname = '/auth/signin'
            return NextResponse.redirect(url)
        }
    }

    if(authUser && !url.pathname.startsWith('/auth/otp') && authUser.passOtp == false) {
        url.pathname = '/auth/otp'
        return NextResponse.redirect(url)
    }

    // req.headers.set('Authorization', `Bearer ${token}`)
    return NextResponse.next()
}

// Allow the starting with these path
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/'],
}