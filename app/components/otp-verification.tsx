"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface OTPVerificationProps {
  phoneNumber: string
  onVerified: () => void
  onBack: () => void
}

export function OTPVerification({ phoneNumber, onVerified, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Here you would verify the OTP with your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      if (otp === "1234") { // Replace with actual OTP verification
        onVerified()
      } else {
        setError("Invalid OTP. Please try again.")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif">Verify your number</h2>
        <p className="text-lg">We sent a code to {phoneNumber}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={4}
          className="w-full h-[56px] px-6 text-lg rounded-full border-2 border-black bg-transparent 
            placeholder:text-black/75 transition-all duration-300
            focus:outline-none focus:border-black/80 hover:border-black/80 text-center"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-[56px] rounded-full border-2 border-black transition-all duration-300
              hover:bg-black hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 h-[56px] rounded-full bg-black text-white transition-all duration-300
              hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </motion.div>
  )
} 