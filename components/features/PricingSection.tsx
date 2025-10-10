import { CheckCircle, Zap, BrainCircuit, BarChart } from 'lucide-react'
import Link from 'next/link'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Free Tier */}
        <div className="p-8 rounded-2xl shadow-lg bg-white">
          <h4 className="text-2xl font-bold text-[#4a4a4a]">Free Plan</h4>
          <p className="mt-2 text-[#9d8189]">
            The "Clarity" Tier. Solve the universal problem of "Where do I start?"
          </p>
          <p className="text-4xl font-extrabold my-6 text-[#4a4a4a]">
            ₹0 <span className="text-base font-normal">/ forever</span>
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Multi-Exam Onboarding & Planning</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Unlimited Manual Flashcards</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Standard SRS Review</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Active Recall Quizzes</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Metacognitive Journal & Streaks</span>
            </li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full text-center font-bold py-3 px-8 text-lg rounded-lg border-2 border-[#f4acb7] text-[#f4acb7] bg-transparent hover:bg-[#f4acb7] hover:text-white transition-colors"
          >
            Start for Free
          </Link>
        </div>

        {/* Core Pass Tier */}
        <div className="p-8 rounded-2xl shadow-lg bg-white border-2 border-[#f4acb7]">
          <h4 className="text-2xl font-bold text-[#4a4a4a]">Core Pass</h4>
          <p className="mt-2 text-[#9d8189]">
            The "Efficiency" Tier. Learn smarter, not just harder.
          </p>
          <p className="text-4xl font-extrabold my-6 text-[#4a4a4a]">
            Coming Soon
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 font-semibold">
              <Zap size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>AI Flashcard Generator</span>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <BrainCircuit size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>AI-Optimized Scheduling</span>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <BarChart size={20} className="text-[#f4acb7] flex-shrink-0" />
              <span>Advanced Analytics</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#9d8189] flex-shrink-0" />
              <span>Everything in Free, and more.</span>
            </li>
          </ul>
          <button className="w-full text-white font-bold py-3 px-8 text-lg rounded-lg border-none bg-[#f4acb7] hover:bg-[#f4acb7]/90 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </section>
  )
}
