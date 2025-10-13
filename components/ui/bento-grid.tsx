'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export const BentoGrid = ({ children, className = '' }: BentoGridProps) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,_auto)] ${className}`}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  colSpan?: string
  rowSpan?: string
}

export const BentoCard = ({ children, className = '', colSpan = '', rowSpan = '' }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden p-6 rounded-3xl bg-surface/60 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow ${colSpan} ${rowSpan} ${className}`}
    >
      {children}
    </motion.div>
  )
}
