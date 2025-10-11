'use client'

import { SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#d8e2dc] font-sans overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 px-6 py-4 flex justify-between items-center bg-[#d8e2dc]/80 backdrop-blur-md z-50"
      >
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-[#9d8189] cursor-pointer"
          >
            Padh.ai
          </motion.h1>
        </Link>
      </motion.header>

      <AuroraBackground>
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Welcome Card */}
            <div className="mb-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold text-[#4a4a4a] mb-3"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-[#4a4a4a]/80"
              >
                Continue your journey to exam success
              </motion.p>
            </div>

            {/* Clerk Sign In Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white/90 backdrop-blur-sm shadow-2xl border border-[#ffcad4]/30",
                    headerTitle: "text-[#4a4a4a]",
                    headerSubtitle: "text-[#4a4a4a]/70",
                    socialButtonsBlockButton: "border-[#ffcad4]/50 hover:bg-[#f4acb7]/10",
                    formButtonPrimary: "bg-gradient-to-r from-[#f4acb7] to-[#ffcad4] hover:opacity-90",
                    footerActionLink: "text-[#f4acb7] hover:text-[#9d8189]",
                    formFieldLabel: "text-[#4a4a4a]",
                    formFieldInput: "border-[#ffcad4]/50 focus:border-[#f4acb7]",
                    identityPreviewText: "text-[#4a4a4a]",
                    identityPreviewEditButton: "text-[#f4acb7]"
                  }
                }}
              />
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-[#4a4a4a]/80">
                Don't have an account?{' '}
                <Link
                  href="/sign-up"
                  className="text-[#f4acb7] font-semibold hover:text-[#9d8189] transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </div>
  )
}
