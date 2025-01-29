import Link from "next/link"
import { Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 pt-8"
        >
          <Link 
            href="/" 
            className="text-2xl font-bold flex items-center transition-all duration-300 hover:scale-105 hover:rotate-[2deg]"
          >
            AIV<span className="text-3xl animate-spin-slow">☀️</span>RY
          </Link>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <Link 
              href="https://www.instagram.com/thisisaivory" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-all duration-300 hover:scale-110 hover:-rotate-12"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            
            <Link 
              href="https://docs.google.com/document/d/1AG7K_vn7vbYtU_BRq6t6hBnwI8zu5AzRm4PZd9YkvdQ/edit?usp=sharing" 
              className="text-black relative font-sans text-sm group"
            >
              <span className="transition-all duration-300 group-hover:opacity-70">
                Work with us
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center mt-8 text-sm text-black/70 font-sans"
        >
          Made in India 🇮🇳
        </motion.div>
      </div>
    </motion.footer>
  )
}

