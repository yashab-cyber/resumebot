import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ResumeBot - Transform Your Resume into an AI Chatbot',
  description: 'Create interactive AI-powered resume chatbots that engage recruiters and showcase your skills in a unique way.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
