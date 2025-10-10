'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface InfiniteMovingCardsProps {
  items: { content: ReactNode }[]
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'normal',
  className = '',
}: InfiniteMovingCardsProps) => {
  const speedMap = {
    slow: 40,
    normal: 25,
    fast: 15,
  }

  const duration = speedMap[speed]

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#ffcad4]/50 shadow-lg"
          >
            {item.content}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
