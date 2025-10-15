'use client'

import { motion } from 'framer-motion'
import { Typewriter } from '@/components/ui/typewriter'
import { Sparkles, Brain, TrendingUp } from 'lucide-react'

export function LoadingStep() {
  const messages = [
    'Analyzing your responses...',
    'Calibrating your learning path...',
    'Optimizing study schedule...',
    'Building your personalized roadmap...',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center space-y-12"
    >
      {/* Animated Icon */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="mx-auto w-24 h-24 flex items-center justify-center"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-accent-pink rounded-full blur-xl"
          />
          <Brain className="relative w-24 h-24 text-accent-pink" />
        </div>
      </motion.div>

      {/* Typewriter Messages */}
      <div className="space-y-6">
        <div className="text-2xl md:text-3xl font-bold text-foreground min-h-[3rem]">
          <Typewriter
            words={messages}
            typingSpeed={70}
            deletingSpeed={50}
            delayBetweenWords={1500}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-foreground-muted"
        >
          This will only take a moment...
        </motion.p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        {[
          { icon: Sparkles, text: 'AI-Powered' },
          { icon: Brain, text: 'Personalized' },
          { icon: TrendingUp, text: 'Science-Backed' },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-primary/20"
            >
              <Icon className="text-accent-pink" size={18} />
              <span className="text-sm text-foreground font-medium">{item.text}</span>
            </motion.div>
          )
        })}
      </div>

    </motion.div>
  )
}
