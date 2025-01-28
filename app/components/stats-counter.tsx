"use client"

import { useEffect, useState } from "react"

export function StatsCounter() {
  const [count, setCount] = useState(2481)

  useEffect(() => {
    // Simulate increasing count
    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 15000) // New signup every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center gap-2 text-gray-600">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums">{count.toLocaleString()}</span>
        <span className="text-sm">people on waitlist</span>
      </div>
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    </div>
  )
}

