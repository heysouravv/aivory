"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { isUserVerified } from '../utils/otpless'

export function WaitlistForm() {
  const router = useRouter()
  const [error, setError] = useState("")

  if (isUserVerified()) {
    return <div>You're already verified!</div>;
  }

  return (
    <div>
      {/* OTPless container */}
      <div id="otpless-login-page" className="w-full min-h-[100px]"></div>
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}

