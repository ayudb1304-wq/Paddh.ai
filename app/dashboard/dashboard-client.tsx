'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'
import { BookOpen, Target, TrendingUp, Award, BrainCircuit, Loader2 } from 'lucide-react'

interface DashboardClientProps {
  user: {
    firstName: string | null
    lastName: string | null
    emailAddress: string
    imageUrl: string
  }
  stats: {
    flashcardsCreated: number
    reviewsDue: number
    currentStreak: number
  }
}

export function DashboardClient({ user, stats }: DashboardClientProps) {
  const displayName = user.firstName || user.emailAddress.split('@')[0] || 'Student'
  const router = useRouter()
  const [navigating, setNavigating] = useState<string | null>(null)

  const handleNavigation = (path: string) => {
    setNavigating(path)
    router.push(path)
  }

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
            <Link
              href="/dashboard"
              className="text-base text-primary font-semibold transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/flashcards"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Flashcards
            </Link>
            <Link
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Analytics
            </Link>
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
                className="p-6 rounded-3xl bg-surface border border-primary/20 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">{stats.flashcardsCreated}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Flashcards Created</h3>
                <p className="text-sm text-foreground-muted mt-2">
                  {stats.flashcardsCreated === 0 ? 'Start building your deck' : 'Keep it up!'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-3xl bg-surface border border-primary/20 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">{stats.reviewsDue}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Reviews Due</h3>
                <p className="text-sm text-foreground-muted mt-2">
                  {stats.reviewsDue === 0 ? 'All caught up!' : 'Time to review'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-3xl bg-surface border border-primary/20 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="text-accent-pink" size={32} />
                  <span className="text-3xl font-bold text-foreground">{stats.currentStreak}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Days Streak</h3>
                <p className="text-sm text-foreground-muted mt-2">
                  {stats.currentStreak === 0 ? 'Build your habit' : 'Great work!'}
                </p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-surface rounded-2xl p-8 border border-primary/20 shadow-md"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.button
                  onClick={() => handleNavigation('/dashboard/flashcards/new')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={navigating === '/dashboard/flashcards/new'}
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent-pink/10 border border-accent-pink/30 hover:bg-accent-pink/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {navigating === '/dashboard/flashcards/new' ? (
                    <Loader2 className="text-accent-pink animate-spin" size={24} />
                  ) : (
                    <BookOpen className="text-accent-pink" size={24} />
                  )}
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Create Flashcard</h4>
                    <p className="text-xs text-foreground-muted">
                      {navigating === '/dashboard/flashcards/new' ? 'Loading...' : 'Manual creation'}
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/dashboard/flashcards')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={navigating === '/dashboard/flashcards'}
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent-pink/10 border border-accent-pink/30 hover:bg-accent-pink/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {navigating === '/dashboard/flashcards' ? (
                    <Loader2 className="text-accent-pink animate-spin" size={24} />
                  ) : (
                    <Target className="text-accent-pink" size={24} />
                  )}
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">My Flashcards</h4>
                    <p className="text-xs text-foreground-muted">
                      {navigating === '/dashboard/flashcards' ? 'Loading...' : 'Browse & manage'}
                    </p>
                  </div>
                </motion.button>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-primary/20 transition-all cursor-not-allowed opacity-50"
                >
                  <BrainCircuit className="text-accent-pink" size={24} />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Start Review</h4>
                    <p className="text-xs text-foreground-muted">Coming soon</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Getting Started Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-8 bg-accent-pink/5 rounded-2xl p-8 border border-accent-pink/20"
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
