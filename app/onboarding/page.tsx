'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { OnboardingProgressBar } from '@/components/onboarding/OnboardingProgressBar'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { PersonalProfileStep, PersonalProfile } from '@/components/onboarding/PersonalProfileStep'
import { ExamSelectionStep } from '@/components/onboarding/ExamSelectionStep'
import { LearningPsychologyStep, LearningPsychology } from '@/components/onboarding/LearningPsychologyStep'
import { QuizStep, QuizAnswers } from '@/components/onboarding/QuizStep'
import { MentalWellnessStep, MentalWellness } from '@/components/onboarding/MentalWellnessStep'
import { LoadingStep } from '@/components/onboarding/LoadingStep'
import { RoadmapStep } from '@/components/onboarding/RoadmapStep'

type OnboardingStep =
  | 'welcome'
  | 'profile'
  | 'exam'
  | 'psychology'
  | 'quiz'
  | 'wellness'
  | 'loading'
  | 'roadmap'

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile | null>(null)
  const [selectedExam, setSelectedExam] = useState<string>('')
  const [learningPsychology, setLearningPsychology] = useState<LearningPsychology | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [mentalWellness, setMentalWellness] = useState<MentalWellness | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  // Step handlers
  const handleProfileComplete = (profile: PersonalProfile) => {
    setPersonalProfile(profile)
    setCurrentStep('exam')
  }

  const handleSelectExam = (exam: string) => {
    setSelectedExam(exam)
    setCurrentStep('psychology')
  }

  const handlePsychologyComplete = (psychology: LearningPsychology) => {
    setLearningPsychology(psychology)
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers)
    setCurrentStep('wellness')
  }

  const handleWellnessComplete = async (wellness: MentalWellness) => {
    setMentalWellness(wellness)
    setCurrentStep('loading')
    setIsSubmitting(true)

    try {
      // Combine all collected data
      const response = await fetch('/api/study-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Personal profile
          age: personalProfile?.age,
          location: personalProfile?.location,
          educationalBackground: personalProfile?.educationalBackground,
          previousAttempts: personalProfile?.previousAttempts,

          // Exam & study plan
          examType: selectedExam,
          dailyStudyHours: quizAnswers?.dailyStudyHours,
          targetDate: quizAnswers?.targetDate.toISOString(),

          // Quiz answers
          mainChallenge: quizAnswers?.mainChallenge,
          confidenceLevel: quizAnswers?.confidenceLevel,

          // Learning psychology
          learningStyle: learningPsychology?.learningStyle,
          studyEnvironment: learningPsychology?.studyEnvironment,
          peakProductivityTime: learningPsychology?.peakProductivityTime,
          selfDisciplineLevel: learningPsychology?.selfDisciplineLevel,

          // Mental wellness
          stressLevel: wellness.stressLevel,
          examAnxietyLevel: wellness.examAnxietyLevel,
          burnoutHistory: wellness.burnoutHistory,
          copingMechanisms: wellness.copingMechanisms,
          familySupportLevel: wellness.familySupportLevel,
          hasPeerStudyGroup: wellness.hasPeerStudyGroup,
          hasMentor: wellness.hasMentor,
          motivationalDrivers: wellness.motivationalDrivers,
          goalOrientation: wellness.goalOrientation,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create study plan')
      }

      // Minimum loading time for better UX
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setCurrentStep('roadmap')
    } catch (error) {
      console.error('Error creating study plan:', error)
      alert('Failed to create study plan. Please try again.')
      setCurrentStep('wellness')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  // Calculate current step number for progress bar
  const getStepNumber = (step: OnboardingStep): number => {
    const stepMap: Record<OnboardingStep, number> = {
      welcome: 1,
      profile: 2,
      exam: 3,
      psychology: 4,
      quiz: 5,
      wellness: 6,
      loading: 7,
      roadmap: 8,
    }
    return stepMap[step]
  }

  const totalSteps = 8
  const currentStepNumber = getStepNumber(currentStep)

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Progress Bar - Show for all steps except loading and roadmap */}
      {currentStep !== 'loading' && currentStep !== 'roadmap' && (
        <OnboardingProgressBar currentStep={currentStepNumber} totalSteps={totalSteps} />
      )}

      <AuroraBackground>
        <main className="px-8 py-12 min-h-screen flex items-center justify-center pt-24">
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <WelcomeStep key="welcome" onNext={() => setCurrentStep('profile')} />
            )}

            {currentStep === 'profile' && (
              <PersonalProfileStep
                key="profile"
                onComplete={handleProfileComplete}
                onBack={() => setCurrentStep('welcome')}
                initialData={personalProfile}
              />
            )}

            {currentStep === 'exam' && (
              <ExamSelectionStep
                key="exam"
                onSelectExam={handleSelectExam}
                onBack={() => setCurrentStep('profile')}
              />
            )}

            {currentStep === 'psychology' && (
              <LearningPsychologyStep
                key="psychology"
                onComplete={handlePsychologyComplete}
                onBack={() => setCurrentStep('exam')}
                initialData={learningPsychology}
              />
            )}

            {currentStep === 'quiz' && (
              <QuizStep
                key="quiz"
                selectedExam={selectedExam}
                onComplete={handleQuizComplete}
                onBack={() => setCurrentStep('psychology')}
                initialData={quizAnswers}
              />
            )}

            {currentStep === 'wellness' && (
              <MentalWellnessStep
                key="wellness"
                onComplete={handleWellnessComplete}
                onBack={() => setCurrentStep('quiz')}
                initialData={mentalWellness}
              />
            )}

            {currentStep === 'loading' && <LoadingStep key="loading" />}

            {currentStep === 'roadmap' && quizAnswers && (
              <RoadmapStep key="roadmap" selectedExam={selectedExam} answers={quizAnswers} />
            )}
          </AnimatePresence>
        </main>
      </AuroraBackground>
    </div>
  )
}
