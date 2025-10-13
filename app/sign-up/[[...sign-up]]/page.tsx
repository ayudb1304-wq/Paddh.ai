'use client'

import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50"
      >
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-accent-muted cursor-pointer"
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
                className="text-4xl font-bold text-foreground mb-3"
              >
                Start Your Journey
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-foreground-muted"
              >
                Join thousands mastering UPSC, JEE & NEET
              </motion.p>
            </div>

            {/* Clerk Sign Up Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-surface/90 backdrop-blur-sm shadow-2xl border border-primary/20",
                    headerTitle: "text-foreground",
                    headerSubtitle: "text-foreground-muted",
                    socialButtonsBlockButton: "border-primary/20 hover:bg-accent-pink/10",
                    formButtonPrimary: "bg-gradient-to-r from-accent-pink to-accent-pink-light hover:opacity-90",
                    footerActionLink: "text-accent-pink hover:text-accent-muted",
                    formFieldLabel: "text-foreground",
                    formFieldInput: "border-primary/20 focus:border-accent-pink",
                    identityPreviewText: "text-foreground",
                    identityPreviewEditButton: "text-accent-pink"
                  }
                }}
              />
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-foreground-muted">
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  className="text-accent-pink font-semibold hover:text-accent-muted transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </div>
  )
}
