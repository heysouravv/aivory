import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function Navigation() {
  return (
    <nav className="py-6 flex items-center justify-between">
      <Link 
        href="/" 
        className="text-2xl font-bold flex items-center gap-2 transition-transform duration-300 hover:scale-105"
      >
        AIV<span className="text-3xl animate-pulse">☀️</span>RY
      </Link>
      <Link 
        href="/waitlist" 
        className="flex items-center gap-2 transition-all duration-300 
          hover:scale-105 hover:opacity-70"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>JOIN</span>
      </Link>
    </nav>
  )
}

