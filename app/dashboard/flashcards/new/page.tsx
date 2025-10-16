'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { FlashcardForm } from '@/components/flashcards/FlashcardForm'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'

export default function NewFlashcardPage() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreateFlashcard = async (data: {
    front: string
    back: string
    subject_id?: string
    topic_id?: string
    tags: string[]
  }) => {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create flashcard')
      }

      setSuccessMessage('Flashcard created successfully!')

      // Redirect to flashcards list after a short delay
      setTimeout(() => {
        router.push('/dashboard/flashcards')
      }, 1500)
    } catch (error) {
      console.error('Error creating flashcard:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50 border-b border-primary/20">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-accent-muted cursor-pointer hover:text-primary transition-colors">
            Padh.ai
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/flashcards"
              className="text-base text-primary font-semibold"
            >
              Flashcards
            </Link>
            <Link
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Analytics
            </Link>
          </nav>
          <ThemeToggleButton />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10 border-2 border-accent-pink',
              },
            }}
          />
        </div>
      </header>

      <AuroraBackground>
        <main className="px-8 py-12 max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/dashboard/flashcards">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Flashcards
            </motion.button>
          </Link>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center"
            >
              {successMessage}
            </motion.div>
          )}

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-surface/80 backdrop-blur-sm border border-primary/20 rounded-3xl shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Flashcard</h1>
            <p className="text-foreground-muted mb-8">
              Add a new flashcard to your study collection. Fill in the question and answer, and
              optionally organize it by subject and topic.
            </p>

            <FlashcardForm
              onSubmit={handleCreateFlashcard}
              submitLabel="Create Flashcard"
            />
          </motion.div>
        </main>
      </AuroraBackground>
    </div>
  )
}
