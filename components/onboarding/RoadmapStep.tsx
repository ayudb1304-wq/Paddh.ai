'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { QuizAnswers } from './QuizStep'
import {
  CheckCircle,
  Target,
  Clock,
  TrendingUp,
  BookOpen,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react'

interface RoadmapStepProps {
  selectedExam: string
  answers: QuizAnswers
}

export function RoadmapStep({ selectedExam, answers }: RoadmapStepProps) {
  const router = useRouter()

  // Calculate days until exam
  const daysUntilExam = answers.targetDate
    ? Math.ceil((answers.targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  // Calculate total study hours
  const totalStudyHours = Math.floor(daysUntilExam * answers.dailyStudyHours)

  // Get personalized insights based on answers
  const getInsights = () => {
    const insights = []

    // Challenge-based insight
    if (answers.mainChallenge === 'time_management') {
      insights.push({
        icon: Clock,
        title: 'Smart Time Management',
        description: `We've structured your ${answers.dailyStudyHours}-hour daily schedule to maximize productivity without burnout.`,
      })
    } else if (answers.mainChallenge === 'retention') {
      insights.push({
        icon: Brain,
        title: 'Spaced Repetition Optimized',
        description:
          'Our scientifically-proven SRS algorithm will help you retain 73% more than traditional methods.',
      })
    } else if (answers.mainChallenge === 'motivation') {
      insights.push({
        icon: TrendingUp,
        title: 'Daily Wins & Streaks',
        description:
          'Small, achievable daily goals will keep you motivated and build unstoppable momentum.',
      })
    } else if (answers.mainChallenge === 'vast_syllabus') {
      insights.push({
        icon: Target,
        title: 'Prioritized Learning Path',
        description:
          `We've broken down the overwhelming syllabus into manageable, high-impact daily tasks.`,
      })
    } else {
      insights.push({
        icon: Sparkles,
        title: 'Anxiety-Free Preparation',
        description:
          'Daily progress tracking shows exactly where you stand, eliminating the guesswork and worry.',
      })
    }

    // Confidence-based insight
    if (answers.confidenceLevel <= 4) {
      insights.push({
        icon: BookOpen,
        title: 'Foundation-First Approach',
        description:
          `We'll start with core concepts to build your confidence before tackling advanced topics.`,
      })
    } else if (answers.confidenceLevel >= 7) {
      insights.push({
        icon: Zap,
        title: 'Advanced Fast-Track',
        description:
          `Your confidence shows you're ready. We'll focus on weak areas and exam-specific strategies.`,
      })
    } else {
      insights.push({
        icon: Target,
        title: 'Balanced Growth Plan',
        description:
          'Perfect balance of revision and new topics to steadily build your expertise.',
      })
    }

    // Confusing topic insight
    if (answers.confusingTopic) {
      insights.push({
        icon: Lightbulb,
        title: `Mastering ${answers.confusingTopic}`,
        description:
          `We've prioritized this topic in your schedule with extra practice and AI-generated flashcards.`,
      })
    }

    return insights.slice(0, 3) // Return top 3 insights
  }

  const insights = getInsights()

  const handleContinue = () => {
    router.push('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-10"
    >
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Your Personalized Roadmap is Ready!
        </h2>

        <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
          Based on your responses, we&apos;ve created a data-driven study plan designed specifically for{' '}
          <span className="font-bold text-accent-pink">{selectedExam}</span> aspirants like you.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/20 border border-accent-pink/30 text-center">
          <Target className="w-10 h-10 text-accent-pink mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground">{daysUntilExam}</p>
          <p className="text-sm text-foreground-muted">Days to Master</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/20 border border-accent-pink/30 text-center">
          <Clock className="w-10 h-10 text-accent-pink mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground">{totalStudyHours}+</p>
          <p className="text-sm text-foreground-muted">Total Study Hours</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/20 border border-accent-pink/30 text-center">
          <TrendingUp className="w-10 h-10 text-accent-pink mx-auto mb-3" />
          <p className="text-3xl font-bold text-foreground">73%</p>
          <p className="text-sm text-foreground-muted">More Effective</p>
        </div>
      </motion.div>

      {/* Personalized Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-bold text-foreground text-center">
          What Makes Your Plan Special
        </h3>

        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex gap-4 p-6 rounded-2xl bg-surface/80 border border-primary/20 hover:border-accent-pink/50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-xl bg-accent-pink/20">
                    <Icon className="w-6 h-6 text-accent-pink" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{insight.title}</h4>
                  <p className="text-foreground-muted leading-relaxed">{insight.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Statistical Hook */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/30 text-center"
      >
        <p className="text-xl md:text-2xl text-foreground leading-relaxed">
          Students using personalized, spaced-repetition study plans are{' '}
          <span className="font-extrabold text-green-500 text-3xl">73% more effective</span> at
          retention compared to traditional methods.
        </p>
        <p className="text-sm text-foreground-muted mt-4">
          Source: Multiple cognitive science studies on spaced repetition efficacy
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-center space-y-4 pt-8"
      >
        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-12 py-5 text-xl font-bold text-white rounded-xl bg-gradient-to-r from-accent-pink to-accent-pink-light shadow-2xl hover:shadow-3xl transition-all"
        >
          <span>Go to Dashboard</span>
          <ArrowRight size={24} />
        </motion.button>

        <p className="text-sm text-foreground-muted">
          Your journey to clarity starts now
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="text-sm text-foreground-muted text-center"
      >
        Step 5 of 5 · Complete!
      </motion.p>
    </motion.div>
  )
}

function Brain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}

function Lightbulb(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
