'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Eye,
  Ear,
  BookOpen,
  Hand,
  Music,
  Users,
  Coffee,
  Moon,
  Sun,
  Sunset,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

export interface LearningPsychology {
  learningStyle: 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic'
  studyEnvironment: 'quiet' | 'background_music' | 'study_group' | 'cafe'
  peakProductivityTime: 'early_morning' | 'morning' | 'afternoon' | 'evening' | 'night' | 'late_night'
  selfDisciplineLevel: number
}

interface LearningPsychologyStepProps {
  onComplete: (psychology: LearningPsychology) => void
  onBack: () => void
}

export function LearningPsychologyStep({ onComplete, onBack }: LearningPsychologyStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [psychology, setPsychology] = useState<Partial<LearningPsychology>>({
    selfDisciplineLevel: 5,
  })

  const questions = [
    {
      id: 'learningStyle',
      title: 'How do you learn best?',
      subtitle: 'Understanding your learning style helps us customize content delivery',
      options: [
        {
          value: 'visual',
          icon: Eye,
          label: 'Visual Learner',
          description: 'Diagrams, charts, images, and visual content'
        },
        {
          value: 'auditory',
          icon: Ear,
          label: 'Auditory Learner',
          description: 'Lectures, discussions, and verbal explanations'
        },
        {
          value: 'reading_writing',
          icon: BookOpen,
          label: 'Reading/Writing',
          description: 'Text, notes, lists, and written materials'
        },
        {
          value: 'kinesthetic',
          icon: Hand,
          label: 'Kinesthetic Learner',
          description: 'Hands-on practice and real-world examples'
        }
      ]
    },
    {
      id: 'studyEnvironment',
      title: "What's your ideal study environment?",
      subtitle: "We'll suggest study techniques that match your preferences",
      options: [
        {
          value: 'quiet',
          icon: Moon,
          label: 'Complete Silence',
          description: 'Library-like quiet for maximum focus'
        },
        {
          value: 'background_music',
          icon: Music,
          label: 'Background Music',
          description: 'Soft music or ambient sounds'
        },
        {
          value: 'study_group',
          icon: Users,
          label: 'Study Group',
          description: 'Learning with peers and discussions'
        },
        {
          value: 'cafe',
          icon: Coffee,
          label: 'Café/Light Noise',
          description: 'Gentle background chatter and activity'
        }
      ]
    },
    {
      id: 'peakProductivityTime',
      title: 'When are you most productive?',
      subtitle: "We'll schedule important topics during your peak hours",
      options: [
        {
          value: 'early_morning',
          icon: Sun,
          label: 'Early Morning',
          description: '4 AM - 7 AM (The early bird)'
        },
        {
          value: 'morning',
          icon: Sun,
          label: 'Morning',
          description: '7 AM - 12 PM (Morning person)'
        },
        {
          value: 'afternoon',
          icon: Sun,
          label: 'Afternoon',
          description: '12 PM - 5 PM (Midday energy)'
        },
        {
          value: 'evening',
          icon: Sunset,
          label: 'Evening',
          description: '5 PM - 9 PM (Post-dinner focus)'
        },
        {
          value: 'night',
          icon: Moon,
          label: 'Night',
          description: '9 PM - 12 AM (Night owl)'
        },
        {
          value: 'late_night',
          icon: Moon,
          label: 'Late Night',
          description: '12 AM - 4 AM (Midnight warrior)'
        }
      ]
    }
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  const canProceed = () => {
    if (currentQuestion === 0) return psychology.learningStyle
    if (currentQuestion === 1) return psychology.studyEnvironment
    if (currentQuestion === 2) return psychology.peakProductivityTime
    return false
  }

  const handleNext = () => {
    if (isLastQuestion && canProceed()) {
      onComplete(psychology as LearningPsychology)
    } else if (canProceed()) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 0) {
      onBack()
    } else {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSelect = (field: keyof LearningPsychology, value: any) => {
    setPsychology({ ...psychology, [field]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground-muted">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-pink to-accent-pink-light"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Question Header */}
          <div className="space-y-3 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-4 rounded-2xl bg-accent-pink/20"
            >
              <Brain className="w-12 h-12 text-accent-pink" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {currentQ.title}
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {currentQ.options.map((option) => {
              const Icon = option.icon
              const fieldName = currentQ.id as keyof LearningPsychology
              const isSelected = psychology[fieldName] === option.value

              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(fieldName, option.value)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-6 rounded-2xl border-2 transition-all text-left
                    ${
                      isSelected
                        ? 'bg-accent-pink/20 border-accent-pink shadow-lg'
                        : 'bg-surface border-primary/20 hover:border-accent-pink/50'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        p-3 rounded-xl
                        ${isSelected ? 'bg-accent-pink/30' : 'bg-primary/10'}
                      `}
                    >
                      <Icon
                        className={isSelected ? 'text-accent-pink' : 'text-foreground-muted'}
                        size={24}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`
                          font-bold text-lg mb-2
                          ${isSelected ? 'text-accent-pink' : 'text-foreground'}
                        `}
                      >
                        {option.label}
                      </h3>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <p className="text-sm text-foreground-muted">Step 3 of 7</p>

        <motion.button
          onClick={handleNext}
          disabled={!canProceed()}
          whileHover={canProceed() ? { scale: 1.05 } : {}}
          whileTap={canProceed() ? { scale: 0.95 } : {}}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-xl
            font-semibold text-lg transition-all
            ${
              canProceed()
                ? 'bg-accent-pink text-white hover:shadow-lg'
                : 'bg-surface text-foreground-muted cursor-not-allowed'
            }
          `}
        >
          <span>{isLastQuestion ? 'Continue' : 'Next Question'}</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}
