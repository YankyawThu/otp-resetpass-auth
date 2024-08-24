import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ChangePassword() {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()
        if(oldPass && newPass && confirmPass) {
            const response = await fetch('/api/auth/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPass, newPass, confirmPass }),
            })
            const data = await response.json()
            if(response.ok) {
                router.push('/')
            }
            else {
                setError(data.msg)
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={handleSignUp} className="flex flex-col gap-1">
                    {error ? <span>{error}</span> : <></>}
                    {!oldPass ? <span>Old password is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setOldPass(e.target.value)} type="text" name="name" placeholder="Enter old password" />
                    {!newPass ? <span>New password is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setNewPass(e.target.value)} type="password" name="newPass" placeholder="Enter new password" />
                    {!confirmPass ? <span>Confirm password is required</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" onChange={e => setConfirmPass(e.target.value)} type="password" name="confirmPass" placeholder="Enter confirm password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}