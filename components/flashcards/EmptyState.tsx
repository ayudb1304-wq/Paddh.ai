'use client'

import { motion } from 'framer-motion'
import { Plus, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  message?: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  message = "You haven't created any flashcards yet",
  actionLabel = 'Create Your First Flashcard',
  actionHref = '/dashboard/flashcards/new',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
        className="w-32 h-32 bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/10 rounded-full flex items-center justify-center mb-8"
      >
        <BookOpen className="text-accent-pink" size={64} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl font-bold text-foreground mb-4 text-center"
      >
        {message}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-foreground-muted text-center mb-8 max-w-md"
      >
        Flashcards are a powerful tool for memorization. Start creating your study materials now and
        make learning more effective.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link href={actionHref}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-pink-light text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            {actionLabel}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
