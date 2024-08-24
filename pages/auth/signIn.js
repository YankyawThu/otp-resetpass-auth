import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSignIn = async (e) => {
        e.preventDefault()
        if(email) {
            const res = await fetch('/api/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })
            const data = await res.json()
            if(res.ok) {
                router.push(`/auth/otp?userId=${data.userId}&token=${encodeURIComponent(data.token)}`)
            }
            else {
                setError(data.msg)
            }
        }
    }

    const handleResetPass = async () => {
        if(email) {
            const res = await fetch('/api/auth/generateResetPassToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            })
            if(res.ok) {
                const data = await res.json()
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={handleSignIn} className="flex flex-col gap-1">
                    {error ? <span>{error}</span> : <></>}
                    {!email ? <span>Email is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" value={email} type="email" onChange={e => setEmail(e.target.value)} name="email" placeholder="Enter email" />
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