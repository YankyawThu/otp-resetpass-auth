import { signOut } from "next-auth/react"
import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}
