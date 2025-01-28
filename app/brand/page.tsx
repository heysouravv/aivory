"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"
import { isUserVerified } from '../utils/otpless'

export default function BrandPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (!isUserVerified()) {
      window.location.href = "/"
    }
  }, [])

  useEffect(() => {
    // Check for authentication on client side only
    const user = localStorage.getItem("otplessUser")
    if (!user) {
      router.push("/")
      return
    }
    
    try {
      const parsedUser = JSON.parse(user)
      setUserData(parsedUser)
    } catch (err) {
      console.error("Error parsing user data:", err)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent" />
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <div className="min-h-screen bg-[#f7ffa3] flex flex-col">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Navigation />
        
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-grow py-16 sm:py-20 lg:py-24"
        >
          <div className="max-w-4xl mx-auto space-y-16 text-center">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-serif"
            >
              Welcome to AIvory ✨
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="space-y-8 text-xl sm:text-2xl"
            >
              <p className="font-serif italic">
                Where AI meets beauty and your perfect match awaits.
              </p>

              <p className="font-sans tracking-tight text-gray-800">
                We're reimagining skincare shopping in India. 
                <br></br>
                No more endless scrolling, no more trial and error. 
                <br></br>
                Just personalized recommendations that work for you.
              </p>

              <p className="font-sans tracking-tight text-gray-800">
                Our AI understands your unique skin needs and matches you with products
                that are perfect for you. We're building a future where finding the right
                skincare is as easy as having a conversation.
              </p>

              <p className="font-serif italic">
                Thank you for joining our waitlist. We'll notify you as soon as we launch!
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-8"
            >
              <p className="text-lg text-gray-600 font-sans tracking-tight">
                You're currently #{Math.floor(Math.random() * 100) + 2400} on our waitlist
              </p>
            </motion.div>
          </div>
        </motion.main>
      </div>
      <Footer />
    </div>
  )
} 