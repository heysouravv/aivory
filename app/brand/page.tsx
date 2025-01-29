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
          <div className="max-w-5xl mx-auto space-y-20 text-center">
            {/* Hero Section */}
            <div className="space-y-6">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-7xl font-serif"
              >
                Shopping Made Simple ✨
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-700"
              >
                Find what you love, faster than ever.
              </motion.p>
            </div>

            {/* Problem Stats Section */}
            <motion.div variants={itemVariants} className="space-y-12">
              <h2 className="text-2xl sm:text-3xl font-serif">The Problem Today</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-black/5"
                >
                  <h3 className="text-5xl font-bold text-black mb-4">3hrs</h3>
                  <p className="text-lg text-gray-600">Average time comparing products online</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-black/5"
                >
                  <h3 className="text-5xl font-bold text-black mb-4">15+</h3>
                  <p className="text-lg text-gray-600">Tabs open during shopping</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-black/5"
                >
                  <h3 className="text-5xl font-bold text-black mb-4">70%</h3>
                  <p className="text-lg text-gray-600">Shoppers overwhelmed & quit</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Solution Section */}
            <motion.div variants={itemVariants} className="space-y-12">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl sm:text-3xl font-serif">Our Solution</h2>
                <p className="text-xl sm:text-2xl font-sans tracking-tight text-gray-800 leading-relaxed">
                  We're changing how you shop online.
                  One search. All your favorite stores.
                  Personalized results just for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black text-white p-10 rounded-3xl flex flex-col items-center text-center"
                >
                  <h3 className="text-3xl font-bold mb-4">2 Minutes</h3>
                  <p className="text-xl">Average time to find the perfect product with our search</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black text-white p-10 rounded-3xl flex flex-col items-center text-center"
                >
                  <h3 className="text-3xl font-bold mb-4">100+ Stores</h3>
                  <p className="text-xl">Search across your favorite brands in one place</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Closing Section */}
            <motion.div variants={itemVariants} className="space-y-8 max-w-3xl mx-auto">
              <p className="text-xl sm:text-2xl font-sans tracking-tight text-gray-800 leading-relaxed">
                No more endless scrolling. No more comparing dozens of websites.
                Just quick, personalized results that help you find and buy
                exactly what you want.
              </p>

              <p className="text-2xl sm:text-3xl font-serif italic text-gray-700">
                The future of shopping is personal, and it's coming soon.
              </p>

              <div className="pt-8">
                <p className="text-lg text-gray-600 font-sans tracking-tight bg-white/50 py-4 px-6 rounded-full inline-block">
                  Join {Math.floor(Math.random() * 100) + 2400} others waiting to revolutionize their shopping experience
                </p>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
      <Footer />
    </div>
  )
}