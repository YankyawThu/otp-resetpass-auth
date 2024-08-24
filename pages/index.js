import { signOut } from "next-auth/react"
import { Inter } from "next/font/google"
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="inline-flex">
        <button onClick={() => router.push('/changePassword')}>Change Password</button>
        <span className="mx-3 text-gray-400">|</span>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  )
}
