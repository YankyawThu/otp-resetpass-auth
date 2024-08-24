import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()
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

    return (
        <div>
            <form method="post" onSubmit={handleSignUp}>
                <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Enter name" />
                <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Enter email" />
                <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Enter password" />
                <button type="submit">Sign up</button>
            </form>
            <button onClick={() => router.push('/auth/signIn')}>Sign in</button>
        </div>
    )
}