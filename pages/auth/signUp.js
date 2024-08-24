import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()
        if(email && password) {
            const response = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })
            
            if(response.ok) {
                router.push('/auth/signIn')
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={handleSignUp} className="flex flex-col gap-1">
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Enter name" />
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" />
                    {!email ? <span>Email is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Enter password" />
                    {!password ? <span>Password is required</span> : <></>}
                    <button type="submit">Sign up</button>
                </form>
                <div className="flex flex-col my-3">
                    <button onClick={() => router.push('/auth/signIn')}>Go Login</button>
                </div>
            </div>
        </div>
    )
}