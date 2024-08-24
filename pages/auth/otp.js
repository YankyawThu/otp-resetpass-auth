import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
        props: { csrfToken: csrfToken || null }
    }
}

export default function Otp({csrfToken}) {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [resend, setResend] = useState('')
    const router = useRouter()

    const { userId, token } = router.query

    const handleOtp = async (e) => {
        e.preventDefault()

        if(otp) {
            const res = await signIn('credentials', {
                otp,
                userId,
                token
            })
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <form method="post" onSubmit={e => handleOtp(e)} className="flex flex-col gap-1">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    {error ? <span>{error}</span> : <></>}
                    {resend ? <span>{resend}</span> : <></>}
                    <input className="border-2 border-gray-500 bg-transparent p-1" type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter otp code"/>
                    <button type="submit">Submit</button>
                </form>
                <div className="flex flex-col my-3">
                    <button onClick={signOut}>Back</button>
                </div>
            </div>
        </div>
    )
}