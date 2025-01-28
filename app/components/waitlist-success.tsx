"use client"

import { motion } from "framer-motion"

export function WaitlistSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-center max-w-2xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-serif">Welcome to the Waitlist! 🌟</h2>
      
      <div className="space-y-6 text-lg sm:text-xl">
        <p>
          Thank you for joining our journey to revolutionize skincare shopping in India.
          We're working hard to create a personalized experience just for you.
        </p>
        
        <p>
          At Alvory, we believe finding the right skincare shouldn't be a puzzle.
          We're building a platform that understands your unique needs and matches
          you with products that actually work for your skin.
        </p>
        
        <p>
          While you wait, we're perfecting our AI to ensure you get the most
          accurate and helpful recommendations when we launch.
        </p>
        
        <p className="font-serif italic">
          You're currently #{Math.floor(Math.random() * 100) + 2400} on our waitlist.
          We'll text you as soon as we're ready!
        </p>
      </div>
    </motion.div>
  )
} 