'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react'

export interface PersonalProfile {
  age: number
  location: string
  educationalBackground: string
  previousAttempts: number
}

interface PersonalProfileStepProps {
  onComplete: (profile: PersonalProfile) => void
  onBack: () => void
  initialData?: PersonalProfile | null
}

export function PersonalProfileStep({ onComplete, onBack, initialData }: PersonalProfileStepProps) {
  const [profile, setProfile] = useState<Partial<PersonalProfile>>(
    initialData || {
      previousAttempts: 0,
    }
  )

  const isValid =
    profile.age &&
    profile.age >= 15 &&
    profile.age <= 100 &&
    profile.location &&
    profile.location.trim().length > 0 &&
    profile.educationalBackground &&
    profile.educationalBackground.trim().length > 0 &&
    profile.previousAttempts !== undefined

  const handleContinue = () => {
    if (isValid) {
      onComplete(profile as PersonalProfile)
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
          <User className="w-12 h-12 text-accent-pink" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Let&apos;s Get to Know You
        </h2>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          This helps us personalize your learning experience and provide better support
        </p>
      </div>

      {/* Form Fields */}
      <div className="bg-surface/50 rounded-3xl p-8 border border-primary/20 space-y-6">
        {/* Age */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="text-accent-pink" size={20} />
            <label className="text-foreground font-semibold">Your Age</label>
          </div>
          <motion.input
            type="number"
            value={profile.age || ''}
            onChange={(e) =>
              setProfile({ ...profile, age: parseInt(e.target.value) || undefined })
            }
            min={15}
            max={100}
            placeholder="e.g., 18"
            whileFocus={{ scale: 1.01 }}
            className="
              w-full px-6 py-4 text-lg rounded-xl
              bg-surface border-2 border-primary/20
              focus:border-accent-pink focus:outline-none
              transition-all text-foreground
              placeholder:text-foreground-muted
            "
          />
          {profile.age && (profile.age < 15 || profile.age > 100) && (
            <p className="text-sm text-red-500">Please enter a valid age (15-100)</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="text-accent-pink" size={20} />
            <label className="text-foreground font-semibold">City/State</label>
          </div>
          <motion.input
            type="text"
            value={profile.location || ''}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            placeholder="e.g., Mumbai, Maharashtra"
            whileFocus={{ scale: 1.01 }}
            className="
              w-full px-6 py-4 text-lg rounded-xl
              bg-surface border-2 border-primary/20
              focus:border-accent-pink focus:outline-none
              transition-all text-foreground
              placeholder:text-foreground-muted
            "
          />
        </div>

        {/* Educational Background */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-accent-pink" size={20} />
            <label className="text-foreground font-semibold">
              Current Educational Status
            </label>
          </div>
          <select
            value={profile.educationalBackground || ''}
            onChange={(e) =>
              setProfile({ ...profile, educationalBackground: e.target.value })
            }
            className="
              w-full px-6 py-4 text-lg rounded-xl
              bg-surface border-2 border-primary/20
              focus:border-accent-pink focus:outline-none
              transition-all text-foreground
              cursor-pointer
            "
          >
            <option value="">Select your current status</option>
            <option value="12th_student">12th Grade Student</option>
            <option value="12th_passout">12th Grade Passout</option>
            <option value="dropout">Drop Year</option>
            <option value="undergraduate">Undergraduate Student</option>
            <option value="graduate">Graduate</option>
            <option value="working_professional">Working Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Previous Attempts */}
        <div className="space-y-3">
          <label className="text-foreground font-semibold">
            How many times have you attempted this exam before?
          </label>
          <div className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((attempt) => (
              <motion.button
                key={attempt}
                onClick={() => setProfile({ ...profile, previousAttempts: attempt })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  py-4 rounded-xl font-bold text-lg transition-all
                  ${
                    profile.previousAttempts === attempt
                      ? 'bg-accent-pink text-white border-2 border-accent-pink'
                      : 'bg-surface border-2 border-primary/20 text-foreground hover:border-accent-pink/50'
                  }
                `}
              >
                {attempt === 4 ? '4+' : attempt}
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-foreground-muted">
            {profile.previousAttempts === 0 && "First time? That's great! We'll guide you through."}
            {profile.previousAttempts === 1 && "You have valuable experience. Let's build on it!"}
            {profile.previousAttempts && profile.previousAttempts >= 2 &&
              "Your persistence is admirable. We'll help you succeed this time!"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end items-center pt-4">

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
