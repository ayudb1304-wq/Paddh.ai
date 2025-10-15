'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { RadioGroup } from '@/components/ui/radio-group'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

interface QuizStepProps {
  selectedExam: string
  onComplete: (answers: QuizAnswers) => void
  onBack: () => void
  initialData?: QuizAnswers | null
}

export interface QuizAnswers {
  dailyStudyHours: number
  targetDate: Date
  mainChallenge: string
  confidenceLevel: number
}

export function QuizStep({ selectedExam, onComplete, onBack, initialData }: QuizStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(
    initialData || {
      dailyStudyHours: 4,
      confidenceLevel: 5,
    }
  )

  const questions = [
    {
      id: 'dailyHours',
      title: 'How many hours can you dedicate to studying each day?',
      subtitle: 'Be realistic. Consistency beats intensity.',
      component: (
        <Slider
          min={1}
          max={12}
          step={0.5}
          value={answers.dailyStudyHours || 4}
          onChange={(value) => setAnswers({ ...answers, dailyStudyHours: value })}
          label="Daily Study Hours"
          unit=" hrs"
          showValue={true}
        />
      ),
    },
    {
      id: 'targetDate',
      title: 'When is your exam?',
      subtitle: 'This helps us pace your preparation perfectly.',
      component: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-accent-pink" size={24} />
            <label className="text-foreground font-semibold">Target Exam Date</label>
          </div>
          <motion.input
            type="date"
            value={answers.targetDate?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              setAnswers({ ...answers, targetDate: new Date(e.target.value) })
            }
            min={new Date().toISOString().split('T')[0]}
            whileFocus={{ scale: 1.02 }}
            className="w-full px-6 py-4 text-lg rounded-xl bg-surface border-2 border-primary/20 focus:border-accent-pink focus:outline-none transition-all text-foreground"
          />
        </div>
      ),
    },
    {
      id: 'mainChallenge',
      title: `What's your biggest challenge right now?`,
      subtitle: 'Understanding this helps us personalize your experience.',
      component: (
        <RadioGroup
          name="mainChallenge"
          value={answers.mainChallenge || ''}
          onChange={(value) => setAnswers({ ...answers, mainChallenge: value })}
          options={[
            {
              value: 'time_management',
              label: 'Managing my time effectively',
              description: 'Struggling to balance preparation with other commitments',
            },
            {
              value: 'retention',
              label: 'Remembering what I study',
              description: 'Information seems to slip away after a few days',
            },
            {
              value: 'motivation',
              label: 'Staying consistent and motivated',
              description: 'Hard to maintain daily study habits',
            },
            {
              value: 'vast_syllabus',
              label: 'The sheer volume of content',
              description: 'Feeling overwhelmed by how much there is to cover',
            },
            {
              value: 'exam_anxiety',
              label: 'Exam pressure and anxiety',
              description: `Stress about whether I'm on the right track`,
            },
          ]}
        />
      ),
    },
    {
      id: 'confidence',
      title: 'On a scale of 1-10, how confident do you feel about your preparation right now?',
      subtitle: `There's no wrong answer. This is just to understand where you're starting from.`,
      component: (
        <Slider
          min={1}
          max={10}
          step={1}
          value={answers.confidenceLevel || 5}
          onChange={(value) => setAnswers({ ...answers, confidenceLevel: value })}
          label="Confidence Level"
          showValue={true}
          colorize={true}
        />
      ),
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const canProceed =
    currentQuestion === 0 ||
    currentQuestion === 3 ||
    (currentQuestion === 1 && answers.targetDate) ||
    (currentQuestion === 2 && answers.mainChallenge)

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers as QuizAnswers)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 0) {
      onBack()
    } else {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto space-y-8"
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

      {/* Question Progress */}
      <div className="text-center">
        <span className="text-sm text-foreground-muted">
          Question {currentQuestion + 1} of {questions.length}
        </span>
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
          {/* Question Title */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{currentQ.title}</h2>
            <p className="text-lg text-foreground-muted">{currentQ.subtitle}</p>
          </div>

          {/* Question Component */}
          <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20">
            {currentQ.component}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-end items-center pt-8">
        <motion.button
          onClick={handleNext}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all
            ${
              canProceed
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
