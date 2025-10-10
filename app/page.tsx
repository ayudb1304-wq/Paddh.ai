import { CheckCircle, Zap, BrainCircuit, BarChart, Feather, BookOpen, Target } from 'lucide-react'
import Link from 'next/link'
import { FeatureCard } from '@/components/features/FeatureCard'
import { PricingSection } from '@/components/features/PricingSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d8e2dc] font-sans">
      {/* Header */}
      <header className="sticky top-0 px-6 py-4 flex justify-between items-center bg-[#d8e2dc]/80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#9d8189]">Padh.ai</h1>
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-base text-[#4a4a4a] hover:text-[#9d8189] transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-base text-[#4a4a4a] hover:text-[#9d8189] transition-colors">
            Pricing
          </a>
          <Link
            href="/sign-up"
            className="text-white font-bold px-4 py-2 rounded-lg bg-[#f4acb7] hover:bg-[#f4acb7]/90 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="px-8">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-5xl font-extrabold text-[#4a4a4a] mb-4">
            End the anxiety. Master your exam.
          </h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto text-[#4a4a4a]">
            Padh.ai provides tangible relief from the stress of exam preparation. Get an AI-powered,
            day-by-day study plan for <span className="font-bold">UPSC, JEE, & NEET</span>, and optimize your learning.
          </p>
          <Link
            href="/sign-up"
            className="inline-block mt-8 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg bg-[#f4acb7] hover:bg-[#f4acb7]/90 transition-colors"
          >
            Create Your Free Study Plan
          </Link>
          <p className="mt-2 text-sm text-[#9d8189]">No credit card required.</p>
        </section>

        {/* Target Audience Section */}
        <section className="py-16 bg-[#ffe5d9] rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#4a4a4a]">Built for India's Toughest Exams</h3>
            <p className="mt-2 text-[#4a4a4a]">
              Clarity, control, and relief, tailored to the unique pressures of each exam.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center px-6">
            <div className="p-6">
              <Target size={40} className="mx-auto mb-4 text-[#f4acb7]" />
              <h4 className="text-xl font-semibold mb-2 text-[#4a4a4a]">UPSC Aspirants</h4>
              <p className="text-[#4a4a4a]">
                Conquer a vast, dynamic syllabus with deep conceptual understanding and structured writing practice.
              </p>
            </div>
            <div className="p-6">
              <Zap size={40} className="mx-auto mb-4 text-[#f4acb7]" />
              <h4 className="text-xl font-semibold mb-2 text-[#4a4a4a]">JEE Aspirants</h4>
              <p className="text-[#4a4a4a]">
                Sharpen problem-solving speed and accuracy in Physics, Chemistry, and Mathematics.
              </p>
            </div>
            <div className="p-6">
              <BrainCircuit size={40} className="mx-auto mb-4 text-[#f4acb7]" />
              <h4 className="text-xl font-semibold mb-2 text-[#4a4a4a]">NEET Aspirants</h4>
              <p className="text-[#4a4a4a]">
                Master a large volume of information with a focus on Biology and conceptual sciences.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#4a4a4a]">Learn Smarter, Not Just Harder</h3>
            <p className="mt-2 text-[#4a4a4a]">From getting started to optimizing every study session.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<BookOpen size={24} />}
              title="Multi-Exam Planning"
              description="Select your exam (UPSC, JEE, or NEET) and instantly get a clear, day-by-day study plan."
            />
            <FeatureCard
              icon={<Feather size={24} />}
              title="Unlimited Manual Flashcards"
              description="Create as many flashcards as you need with a simple editor to reinforce your learning."
            />
            <FeatureCard
              icon={<CheckCircle size={24} />}
              title="Standard SRS Review"
              description="Our app automatically schedules reviews using a proven algorithm so you never forget what you've learned."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="AI Flashcard Generator"
              tag="Core Pass"
              description="Stop wasting hours. Upload PDFs or paste text and let AI create relevant flashcards for you."
            />
            <FeatureCard
              icon={<BrainCircuit size={24} />}
              title="AI-Optimized Scheduling"
              tag="Core Pass"
              description="Learn faster. Our advanced SRS adapts to your personal forgetting curve to save you time."
            />
            <FeatureCard
              icon={<BarChart size={24} />}
              title="Advanced Analytics"
              tag="Core Pass"
              description="Know exactly where you stand with a detailed breakdown of your strongest and weakest topics."
            />
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-16 border-t border-[#ffcad4]">
        <p className="text-[#9d8189]">&copy; {new Date().getFullYear()} Padh.ai. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-sm text-[#9d8189] hover:text-[#4a4a4a]">About</a>
          <a href="#" className="text-sm text-[#9d8189] hover:text-[#4a4a4a]">Contact</a>
          <a href="#" className="text-sm text-[#9d8189] hover:text-[#4a4a4a]">Privacy Policy</a>
        </div>
      </footer>
    </div>
  )
}
