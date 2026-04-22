import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Plans & Pricing',
  description:
    'Affordable Christian education starting at $41/month. Choose from Single Student, Family, or School plans. 14-day money-back guarantee.',
  openGraph: {
    title: 'The Gospel Academy Pricing',
    description: 'Christ-centered online education starting at $41/month. Single, Family, and School plans available.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
