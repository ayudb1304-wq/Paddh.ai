'use client'

import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { TextReveal } from '@/components/ui/text-reveal'
import { Sparkles } from 'lucide-react'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const { user } = useUser()
  const firstName = user?.firstName || 'there'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center space-y-8"
    >
      {/* Welcome Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-block"
        >
          <Sparkles className="w-16 h-16 text-accent-pink mx-auto" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
          Welcome, {firstName}!
        </h1>
      </motion.div>

      {/* Empathetic Body Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <div className="text-xl md:text-2xl text-foreground leading-relaxed">
          <TextReveal text="We know the journey ahead feels overwhelming..." />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-xl md:text-2xl text-foreground leading-relaxed"
        >
          Let&apos;s build your path to clarity,{' '}
          <span className="font-bold text-accent-pink">together.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto"
        >
          In the next few minutes, we&apos;ll understand your goals, your challenges, and create a
          personalized study plan that actually works for you.
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(236, 72, 153, 0)',
              '0 0 0 10px rgba(236, 72, 153, 0)',
              '0 0 0 0 rgba(236, 72, 153, 0)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            },
          }}
          className="px-12 py-5 text-xl font-bold text-white rounded-xl bg-gradient-to-r from-accent-pink to-accent-pink-light shadow-2xl hover:shadow-3xl transition-all"
        >
          Let&apos;s Begin
        </motion.button>
      </motion.div>

      {/* Progress Indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="text-sm text-foreground-muted"
      >
        Step 1 of 5 · Takes about 2 minutes
      </motion.p>
    </motion.div>
  )
}
