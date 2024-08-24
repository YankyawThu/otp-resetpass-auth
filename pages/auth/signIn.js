import { signIn, getCsrfToken } from "next-auth/react"
import { useState } from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
        props: { csrfToken: csrfToken || null }
    }
}

export default function SignIn({csrfToken}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignIn = async (e) => {
        e.preventDefault()
        if(email) {
            const res = await signIn('credentials', {
                email,
                password
            })
        }
    }

    const handleResetPass = async () => {
        if(email) {
            const res = await fetch('/api/auth/generateResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            })
            if(res.ok) {
                const data = await res.json()
                console.log('res', data);
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={handleSignIn} className="flex flex-col gap-1">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <input className="border-2 border-gray-500 bg-transparent p-1" value={email} type="email" onChange={e => setEmail(e.target.value)} name="email" placeholder="Enter email" />
                    {!email ? <span>Email is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" value={password} type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Enter password" />
                    <button type="submit">Sign in</button>
                </form>
                <div className="flex flex-col my-3">
                    <button onClick={handleResetPass}>Reset password</button>
                    <button onClick={() => router.push('/auth/signUp')}>Register</button>
                </div>
            </div>
        </div>
    )
}