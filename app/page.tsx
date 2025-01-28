"use client"

import Image from "next/image"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { motion } from "framer-motion"
import { useState } from "react"
import { initiate, verify, isUserVerified } from "./utils/otpless"
import { Modal } from "./components/modal"
import { ArrowRight } from "lucide-react"

export default function Page() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)

  if (isUserVerified()) {
    if (typeof window !== 'undefined') {
      window.location.href = "/brand";
    }
    return null;
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    
    setError("")
    setIsLoading(true)

    try {
      await initiate(phone)
      setShowOTPModal(true)
      console.log("OTP initiated")
    } catch (err: any) {
      console.error("Error:", err)
      setError(err.message || "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await verify(phone, otp)
      console.log("OTP verified")
      setShowOTPModal(false)
      window.location.href = "/brand"
    } catch (err: any) {
      console.error("Error:", err)
      setError(err.message || "Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const inputVariants = {
    focus: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  const arrowVariants = {
    hover: { 
      x: 3,
      transition: { 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#f7ffa3] flex flex-col">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-8 xl:gap-16 items-center w-full">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 sm:space-y-8 lg:space-y-10 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-first"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-[3.25rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-serif leading-[1.1] tracking-tight"
              >
                Find Your Perfect Match ✨
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-2xl sm:text-2xl md:text-3xl font-serif italic"
              >
                Text it like you mean it
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-xl md:text-2xl font-sans max-w-[28ch] mx-auto lg:mx-0"
              >
                Skip the endless scroll. Just tell us what your skin needs - we'll handle the rest.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <form onSubmit={handlePhoneSubmit} className="relative max-w-md mx-auto lg:mx-0">
                  <motion.div 
                    className="relative"
                    whileFocus="focus"
                    whileTap="tap"
                    variants={inputVariants}
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      +91
                    </span>
                    <motion.input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "")
                        setPhone(value.slice(0, 10))
                      }}
                      placeholder="Enter your phone number"
                      className="w-full h-[56px] pl-16 pr-14 text-lg rounded-full border-2 border-black bg-transparent 
                        focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black
                        transition-all duration-300"
                      maxLength={10}
                      required
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading || phone.length !== 10}
                      whileHover="hover"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center 
                        bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300 hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      ) : (
                        <motion.div>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative aspect-square w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto lg:order-last"
            >
              <motion.div
                className="absolute inset-0 rounded-blob overflow-hidden"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/hero.png"
                  alt="Woman with glowing skin using Alvory"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />

      {/* OTP Modal */}
      <Modal isOpen={showOTPModal} onClose={() => !isLoading && setShowOTPModal(false)}>
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-center">Verify your number</h2>
          <p className="text-center">We've sent a code to +91 {phone}</p>
          
          <form onSubmit={handleOTPVerify} className="space-y-4">
            <input
              type="text"
              id="otp-input"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                setOtp(value.slice(0, 6))
              }}
              placeholder="Enter OTP"
              className="w-full h-[56px] px-6 text-lg rounded-full border-2 border-black bg-transparent text-center"
              maxLength={6}
              required
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full h-[56px] rounded-full bg-black text-white transition-all duration-300
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

