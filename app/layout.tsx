import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: {
    default: 'AIVORY - One Search, All Stores',
    template: '%s | AIVORY'
  },
  description: 'Stop jumping between tabs. Find exactly what you want across all your favorite stores in one place.',
  keywords: ['shopping', 'ecommerce', 'product search', 'online shopping', 'multi-store search'],
  authors: [{ name: 'AIVORY' }],
  creator: 'AIVORY',
  publisher: 'AIVORY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aivory.in',
    siteName: 'AIVORY',
    title: 'AIVORY - One Search, All Stores',
    description: 'Stop jumping between tabs. Find exactly what you want across all your favorite stores in one place.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AIVORY - One Search, All Stores',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVORY - One Search, All Stores',
    description: 'Stop jumping between tabs. Find exactly what you want across all your favorite stores in one place.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
