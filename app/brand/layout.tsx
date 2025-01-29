import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIVORY Manifesto',
  description: 'Shop smarter with AIVORY. Search many stores at once to find what you need.',
  openGraph: {
    title: 'AIVORY Manifesto',
    description: 'Revolutionize your shopping experience with AIVORY. Find products across multiple stores in seconds.',
  },
}

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}