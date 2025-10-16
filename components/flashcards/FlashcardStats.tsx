'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react'

interface FlashcardStatsProps {
  total: number
  due: number
  new?: number
  mastered?: number
}

export function FlashcardStats({ total, due, new: newCount = 0, mastered = 0 }: FlashcardStatsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-surface border border-primary/20 rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
          <BookOpen className="text-accent-pink" size={24} />
          <span className="text-3xl font-bold text-foreground">{total}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground-muted">Total Cards</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="p-6 bg-surface border border-accent-pink/40 rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
          <Clock className="text-accent-pink" size={24} />
          <span className="text-3xl font-bold text-foreground">{due}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground-muted">Due Today</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-6 bg-surface border border-primary/20 rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="text-accent-pink" size={24} />
          <span className="text-3xl font-bold text-foreground">{newCount}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground-muted">New Cards</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="p-6 bg-surface border border-green-500/40 rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
          <Award className="text-green-500" size={24} />
          <span className="text-3xl font-bold text-foreground">{mastered}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground-muted">Mastered</h3>
      </motion.div>
    </div>
  )
}
