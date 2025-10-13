'use client'

import { motion } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'
import { BookOpen, Target, TrendingUp, Sparkles, Award, BrainCircuit } from 'lucide-react'

interface DashboardClientProps {
  user: {
    firstName: string | null
    lastName: string | null
    emailAddress: string
    imageUrl: string
  }
}

export function DashboardClient({ user }: DashboardClientProps) {
  const displayName = user.firstName || user.emailAddress.split('@')[0] || 'Student'

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50 border-b border-primary/20"
      >
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-accent-muted cursor-pointer"
          >
            Padh.ai
          </motion.h1>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              My Study Plan
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Flashcards
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Analytics
            </motion.a>
          </nav>
          <ThemeToggleButton />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-accent-pink"
              }
            }}
          />
        </div>
      </motion.header>

      <AuroraBackground>
        <main className="px-8 py-12">
          {/* Welcome Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto mb-16"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-bold text-foreground mb-4"
              >
                Welcome back, {displayName}! 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-foreground-muted"
              >
                Ready to continue your exam preparation journey?
              </motion.p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">0</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Flashcards Created</h3>
                <p className="text-sm text-foreground-muted mt-2">Start building your deck</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">0%</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Study Progress</h3>
                <p className="text-sm text-foreground-muted mt-2">Keep up the momentum</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">0</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Days Streak</h3>
                <p className="text-sm text-foreground-muted mt-2">Build your habit</p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-surface/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent-pink/20 to-accent-pink-light/20 border border-primary/20 hover:shadow-lg transition-all"
                >
                  <Sparkles className="text-accent-pink" size={24} />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Generate Flashcards</h4>
                    <p className="text-xs text-foreground-muted">AI-powered creation</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent-pink/20 to-accent-pink-light/20 border border-primary/20 hover:shadow-lg transition-all"
                >
                  <Target className="text-accent-pink" size={24} />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Create Study Plan</h4>
                    <p className="text-xs text-foreground-muted">Select your exam</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent-pink/20 to-accent-pink-light/20 border border-primary/20 hover:shadow-lg transition-all"
                >
                  <BrainCircuit className="text-accent-pink" size={24} />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Start Review</h4>
                    <p className="text-xs text-foreground-muted">Practice makes perfect</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Getting Started Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 bg-gradient-to-br from-accent-pink/10 to-accent-pink-light/10 backdrop-blur-sm rounded-3xl p-8 border border-primary/20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">Getting Started</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Select Your Exam</h4>
                    <p className="text-sm text-foreground-muted">Choose from UPSC, JEE, or NEET to get a customized study plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Create Your First Flashcard</h4>
                    <p className="text-sm text-foreground-muted">Upload PDFs or paste text to generate AI-powered flashcards</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Start Your Daily Review</h4>
                    <p className="text-sm text-foreground-muted">Build a consistent study habit with spaced repetition</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </AuroraBackground>
    </div>
  )
}
