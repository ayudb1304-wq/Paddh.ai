'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Award, Zap, ArrowLeft, ArrowRight } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export interface MentalWellness {
  stressLevel: number
  examAnxietyLevel: number
  burnoutHistory: boolean
  copingMechanisms: string[]
  familySupportLevel: number
  hasPeerStudyGroup: boolean
  hasMentor: boolean
  motivationalDrivers: string[]
  goalOrientation: 'MASTERY' | 'PERFORMANCE' | 'BALANCED'
}

interface MentalWellnessStepProps {
  onComplete: (wellness: MentalWellness) => void
  onBack: () => void
  initialData?: MentalWellness | null
}

export function MentalWellnessStep({ onComplete, onBack, initialData }: MentalWellnessStepProps) {
  const [wellness, setWellness] = useState<Partial<MentalWellness>>(
    initialData || {
      stressLevel: 5,
      examAnxietyLevel: 5,
      burnoutHistory: false,
      copingMechanisms: [],
      familySupportLevel: 7,
      hasPeerStudyGroup: false,
      hasMentor: false,
      motivationalDrivers: [],
    }
  )

  const copingOptions = [
    'Exercise',
    'Meditation',
    'Talking to friends/family',
    'Journaling',
    'Music',
    'Taking breaks',
    'Hobbies',
    'Professional help'
  ]

  const motivationOptions = [
    'Achieving career goals',
    'Making family proud',
    'Personal growth',
    'Competition with peers',
    'Proving myself',
    'Financial security',
    'Passion for the subject',
    'Changing my life situation'
  ]

  const toggleCopingMechanism = (mechanism: string) => {
    const current = wellness.copingMechanisms || []
    if (current.includes(mechanism)) {
      setWellness({
        ...wellness,
        copingMechanisms: current.filter(m => m !== mechanism)
      })
    } else {
      setWellness({
        ...wellness,
        copingMechanisms: [...current, mechanism]
      })
    }
  }

  const toggleMotivation = (driver: string) => {
    const current = wellness.motivationalDrivers || []
    if (current.includes(driver)) {
      setWellness({
        ...wellness,
        motivationalDrivers: current.filter(d => d !== driver)
      })
    } else {
      setWellness({
        ...wellness,
        motivationalDrivers: [...current, driver]
      })
    }
  }

  const isValid =
    wellness.stressLevel !== undefined &&
    wellness.examAnxietyLevel !== undefined &&
    wellness.burnoutHistory !== undefined &&
    (wellness.copingMechanisms?.length || 0) > 0 &&
    wellness.familySupportLevel !== undefined &&
    (wellness.motivationalDrivers?.length || 0) > 0 &&
    wellness.goalOrientation

  const handleContinue = () => {
    if (isValid) {
      onComplete(wellness as MentalWellness)
    }
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
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      {/* Header */}
      <div className="space-y-3 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 rounded-2xl bg-accent-pink/20"
        >
          <Heart className="w-12 h-12 text-accent-pink" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Your Mental Wellness Matters
        </h2>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          Understanding your stress levels and support system helps us create a sustainable study plan
        </p>
      </div>

      <div className="space-y-8">
        {/* Stress & Anxiety */}
        <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20 space-y-6">
          <h3 className="text-xl font-bold text-foreground">Stress & Anxiety Levels</h3>

          <div>
            <label className="text-foreground font-semibold mb-3 block">
              Current Stress Level
            </label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={wellness.stressLevel || 5}
              onChange={(value) => setWellness({ ...wellness, stressLevel: value })}
              label="Stress Level"
              showValue={true}
              colorize={true}
            />
            <p className="text-sm text-foreground-muted mt-2">
              1 = Very relaxed, 10 = Extremely stressed
            </p>
          </div>

          <div>
            <label className="text-foreground font-semibold mb-3 block">
              Exam Anxiety Level
            </label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={wellness.examAnxietyLevel || 5}
              onChange={(value) => setWellness({ ...wellness, examAnxietyLevel: value })}
              label="Exam Anxiety"
              showValue={true}
              colorize={true}
            />
            <p className="text-sm text-foreground-muted mt-2">
              1 = Calm and confident, 10 = Very anxious
            </p>
          </div>

          <div>
            <label className="text-foreground font-semibold mb-3 block">
              Have you experienced burnout in the past?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => setWellness({ ...wellness, burnoutHistory: false })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  py-4 rounded-xl font-semibold transition-all
                  ${
                    wellness.burnoutHistory === false
                      ? 'bg-accent-pink text-white border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20 text-foreground'
                  }
                `}
              >
                No
              </motion.button>
              <motion.button
                onClick={() => setWellness({ ...wellness, burnoutHistory: true })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  py-4 rounded-xl font-semibold transition-all
                  ${
                    wellness.burnoutHistory === true
                      ? 'bg-accent-pink text-white border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20 text-foreground'
                  }
                `}
              >
                Yes
              </motion.button>
            </div>
          </div>
        </div>

        {/* Coping Mechanisms */}
        <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20 space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-accent-pink" size={24} />
            <h3 className="text-xl font-bold text-foreground">
              How do you cope with stress? (Select all that apply)
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {copingOptions.map((option) => {
              const isSelected = wellness.copingMechanisms?.includes(option)
              return (
                <motion.button
                  key={option}
                  onClick={() => toggleCopingMechanism(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-accent-pink/20 border-2 border-accent-pink text-accent-pink'
                        : 'bg-surface border-2 border-primary/20 text-foreground hover:border-accent-pink/50'
                    }
                  `}
                >
                  {option}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Support System */}
        <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20 space-y-6">
          <div className="flex items-center gap-3">
            <Users className="text-accent-pink" size={24} />
            <h3 className="text-xl font-bold text-foreground">Support System</h3>
          </div>

          <div>
            <label className="text-foreground font-semibold mb-3 block">
              Family Support Level
            </label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={wellness.familySupportLevel || 7}
              onChange={(value) => setWellness({ ...wellness, familySupportLevel: value })}
              label="Support Level"
              showValue={true}
            />
            <p className="text-sm text-foreground-muted mt-2">
              1 = No support, 10 = Extremely supportive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-foreground font-semibold mb-3 block">
                Do you have a peer study group?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setWellness({ ...wellness, hasPeerStudyGroup: true })}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    py-3 rounded-xl font-medium transition-all
                    ${
                      wellness.hasPeerStudyGroup
                        ? 'bg-accent-pink text-white'
                        : 'bg-surface border-2 border-primary/20'
                    }
                  `}
                >
                  Yes
                </motion.button>
                <motion.button
                  onClick={() => setWellness({ ...wellness, hasPeerStudyGroup: false })}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    py-3 rounded-xl font-medium transition-all
                    ${
                      !wellness.hasPeerStudyGroup
                        ? 'bg-accent-pink text-white'
                        : 'bg-surface border-2 border-primary/20'
                    }
                  `}
                >
                  No
                </motion.button>
              </div>
            </div>

            <div>
              <label className="text-foreground font-semibold mb-3 block">
                Do you have a mentor/guide?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setWellness({ ...wellness, hasMentor: true })}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    py-3 rounded-xl font-medium transition-all
                    ${
                      wellness.hasMentor
                        ? 'bg-accent-pink text-white'
                        : 'bg-surface border-2 border-primary/20'
                    }
                  `}
                >
                  Yes
                </motion.button>
                <motion.button
                  onClick={() => setWellness({ ...wellness, hasMentor: false })}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    py-3 rounded-xl font-medium transition-all
                    ${
                      !wellness.hasMentor
                        ? 'bg-accent-pink text-white'
                        : 'bg-surface border-2 border-primary/20'
                    }
                  `}
                >
                  No
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20 space-y-6">
          <div className="flex items-center gap-3">
            <Award className="text-accent-pink" size={24} />
            <h3 className="text-xl font-bold text-foreground">
              What motivates you? (Select all that apply)
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {motivationOptions.map((option) => {
              const isSelected = wellness.motivationalDrivers?.includes(option)
              return (
                <motion.button
                  key={option}
                  onClick={() => toggleMotivation(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-accent-pink/20 border-2 border-accent-pink text-accent-pink'
                        : 'bg-surface border-2 border-primary/20 text-foreground hover:border-accent-pink/50'
                    }
                  `}
                >
                  {option}
                </motion.button>
              )
            })}
          </div>

          <div>
            <label className="text-foreground font-semibold mb-3 block">
              What's your primary goal orientation?
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.button
                onClick={() => setWellness({ ...wellness, goalOrientation: 'MASTERY' })}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-4 rounded-xl transition-all
                  ${
                    wellness.goalOrientation === 'MASTERY'
                      ? 'bg-accent-pink/20 border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20'
                  }
                `}
              >
                <div className="font-bold mb-1">Mastery</div>
                <div className="text-sm text-foreground-muted">
                  Focus on deep understanding
                </div>
              </motion.button>

              <motion.button
                onClick={() => setWellness({ ...wellness, goalOrientation: 'PERFORMANCE' })}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-4 rounded-xl transition-all
                  ${
                    wellness.goalOrientation === 'PERFORMANCE'
                      ? 'bg-accent-pink/20 border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20'
                  }
                `}
              >
                <div className="font-bold mb-1">Performance</div>
                <div className="text-sm text-foreground-muted">
                  Focus on scores and ranks
                </div>
              </motion.button>

              <motion.button
                onClick={() => setWellness({ ...wellness, goalOrientation: 'BALANCED' })}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-4 rounded-xl transition-all
                  ${
                    wellness.goalOrientation === 'BALANCED'
                      ? 'bg-accent-pink/20 border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20'
                  }
                `}
              >
                <div className="font-bold mb-1">Balanced</div>
                <div className="text-sm text-foreground-muted">
                  Equal focus on both
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end items-center pt-8">

        <motion.button
          onClick={handleContinue}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-xl
            font-semibold text-lg transition-all
            ${
              isValid
                ? 'bg-accent-pink text-white hover:shadow-lg'
                : 'bg-surface text-foreground-muted cursor-not-allowed'
            }
          `}
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}
