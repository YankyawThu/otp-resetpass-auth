import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { userId, token } = router.query

    const handleResetPassword = async (e) => {
        e.preventDefault()

        const res = await fetch(`/api/auth/resetPassword?userId=${userId}&token=${encodeURIComponent(token)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newPassword})
        })
        const data = await res.json()
        if(res.ok) {
            router.push('/auth/signIn')
        }
        else {
            setError(data.msg)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={e => handleResetPassword(e)} className="flex flex-col gap-1">
                    {error ? <span>{error}</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" type="password" name="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password"/>
                    <button type="submit">Submit</button>
                </form>
                <div className="flex flex-col my-3">
                    <button onClick={() => router.push('/auth/signIn')}>Go Login</button>
                </div>
            </div>
        </div>
    )
}