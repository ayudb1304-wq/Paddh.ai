'use client'

import { motion } from 'framer-motion'
import { BentoCard } from '@/components/ui/bento-grid'
import { Target, Zap, BrainCircuit, ArrowLeft } from 'lucide-react'

interface ExamSelectionStepProps {
  onSelectExam: (exam: string) => void
  onBack: () => void
}

export function ExamSelectionStep({ onSelectExam, onBack }: ExamSelectionStepProps) {
  const exams = [
    {
      id: 'UPSC',
      name: 'UPSC',
      fullName: 'Union Public Service Commission',
      description: 'For those building a fortress of knowledge over years',
      icon: Target,
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
    },
    {
      id: 'JEE',
      name: 'JEE',
      fullName: 'Joint Entrance Examination',
      description: 'For those racing against time and complexity',
      icon: Zap,
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-500',
    },
    {
      id: 'NEET',
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      description: 'For those mastering vast volumes of information',
      icon: BrainCircuit,
      color: 'from-green-500/20 to-teal-500/20',
      iconColor: 'text-green-500',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          First, which summit are we conquering?
        </h2>
        <p className="text-xl text-foreground-muted">
          Choose your exam to get a personalized study roadmap
        </p>
      </motion.div>

      {/* Exam Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {exams.map((exam, index) => {
          const Icon = exam.icon

          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectExam(exam.id)}
              className="cursor-pointer"
            >
              <BentoCard
                className={`h-full bg-gradient-to-br ${exam.color} border-2 border-transparent hover:border-accent-pink transition-all`}
              >
                <div className="flex flex-col items-center text-center space-y-4 p-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 rounded-2xl bg-surface/50 ${exam.iconColor}`}
                  >
                    <Icon size={48} />
                  </motion.div>

                  {/* Exam Name */}
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{exam.name}</h3>
                    <p className="text-sm text-foreground-muted font-medium">{exam.fullName}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {exam.description}
                  </p>

                  {/* Select Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mt-auto pt-4 w-full"
                  >
                    <div className="px-6 py-3 rounded-lg bg-accent-pink text-white font-semibold text-center">
                      Select {exam.name}
                    </div>
                  </motion.div>
                </div>
              </BentoCard>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-sm text-foreground-muted text-center"
      >
        Step 3 of 8
      </motion.p>
    </motion.div>
  )
}
