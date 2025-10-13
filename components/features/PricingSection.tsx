import { CheckCircle, Zap, BrainCircuit, BarChart } from 'lucide-react'
import Link from 'next/link'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Free Tier */}
        <div className="p-8 rounded-2xl shadow-lg bg-surface">
          <h4 className="text-2xl font-bold text-foreground">Free Plan</h4>
          <p className="mt-2 text-accent-muted">
            The "Clarity" Tier. Solve the universal problem of "Where do I start?"
          </p>
          <p className="text-4xl font-extrabold my-6 text-foreground">
            ₹0 <span className="text-base font-normal">/ forever</span>
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-pink flex-shrink-0" />
              <span>Multi-Exam Onboarding & Planning</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-pink flex-shrink-0" />
              <span>Unlimited Manual Flashcards</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-pink flex-shrink-0" />
              <span>Standard SRS Review</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-pink flex-shrink-0" />
              <span>Active Recall Quizzes</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-pink flex-shrink-0" />
              <span>Metacognitive Journal & Streaks</span>
            </li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full text-center font-bold py-3 px-8 text-lg rounded-lg border-2 border-accent-pink text-accent-pink bg-transparent hover:bg-accent-pink hover:text-white transition-colors"
          >
            Start for Free
          </Link>
        </div>

        {/* Core Pass Tier */}
        <div className="p-8 rounded-2xl shadow-lg bg-surface border-2 border-accent-pink">
          <h4 className="text-2xl font-bold text-foreground">Core Pass</h4>
          <p className="mt-2 text-accent-muted">
            The "Efficiency" Tier. Learn smarter, not just harder.
          </p>
          <p className="text-4xl font-extrabold my-6 text-foreground">
            Coming Soon
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 font-semibold">
              <Zap size={20} className="text-accent-pink flex-shrink-0" />
              <span>AI Flashcard Generator</span>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <BrainCircuit size={20} className="text-accent-pink flex-shrink-0" />
              <span>AI-Optimized Scheduling</span>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <BarChart size={20} className="text-accent-pink flex-shrink-0" />
              <span>Advanced Analytics</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-accent-muted flex-shrink-0" />
              <span>Everything in Free, and more.</span>
            </li>
          </ul>
          <button className="w-full text-white font-bold py-3 px-8 text-lg rounded-lg border-none bg-accent-pink hover:bg-accent-pink/90 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </section>
  )
}
