'use client'

import { CheckCircle, Zap, BrainCircuit, BarChart, Feather, BookOpen, Target, Sparkles, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PricingSection } from '@/components/features/PricingSection'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { TextReveal } from '@/components/ui/text-reveal'
import { Typewriter } from '@/components/ui/typewriter'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d8e2dc] font-sans overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 px-6 py-4 flex justify-between items-center bg-[#d8e2dc]/80 backdrop-blur-md z-50"
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-[#9d8189]"
        >
          Padh.ai
        </motion.h1>
        <nav className="flex items-center gap-6">
          <motion.a
            whileHover={{ scale: 1.1, color: '#9d8189' }}
            href="#features"
            className="text-base text-[#4a4a4a] transition-colors"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, color: '#9d8189' }}
            href="#pricing"
            className="text-base text-[#4a4a4a] transition-colors"
          >
            Pricing
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/sign-up"
              className="text-white font-bold px-4 py-2 rounded-lg bg-[#f4acb7] hover:bg-[#f4acb7]/90 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      <main className="px-8">
        {/* Hero Section */}
        <AuroraBackground>
          <section className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content (asymmetric) */}
                <div className="text-left space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="inline-block px-4 py-2 rounded-full bg-[#f4acb7]/20 border border-[#f4acb7]/50 mb-6">
                      <span className="text-sm font-semibold text-[#9d8189]">AI-Powered Learning</span>
                    </div>
                  </motion.div>

                  <h2 className="text-6xl font-extrabold text-[#4a4a4a] leading-tight">
                    <TextReveal text="End the anxiety." />
                    <br />
                    <span className="text-[#f4acb7]">
                      <Typewriter
                        words={['Master UPSC.', 'Master JEE.', 'Master NEET.']}
                        className="text-6xl font-extrabold"
                      />
                    </span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-[#4a4a4a] leading-relaxed max-w-xl"
                  >
                    Padh.ai provides tangible relief from the stress of exam preparation. Get an AI-powered,
                    day-by-day study plan and optimize your learning.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/sign-up"
                        className="inline-block text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl bg-gradient-to-r from-[#f4acb7] to-[#ffcad4] hover:shadow-2xl transition-all"
                      >
                        Create Your Free Study Plan
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm text-[#9d8189]"
                  >
                    No credit card required. Start in seconds.
                  </motion.p>
                </div>

                {/* Right side - Floating cards (asymmetric) */}
                <div className="relative h-[500px] hidden md:block">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute top-0 right-0 w-64 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#ffcad4]/50 shadow-xl"
                  >
                    <Sparkles className="text-[#f4acb7] mb-4" size={32} />
                    <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">AI-Powered</h3>
                    <p className="text-sm text-[#4a4a4a]/80">Smart flashcards generated instantly</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute top-32 left-0 w-64 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#ffcad4]/50 shadow-xl"
                  >
                    <TrendingUp className="text-[#f4acb7] mb-4" size={32} />
                    <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">Track Progress</h3>
                    <p className="text-sm text-[#4a4a4a]/80">Advanced analytics for better results</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-0 right-12 w-64 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#ffcad4]/50 shadow-xl"
                  >
                    <Award className="text-[#f4acb7] mb-4" size={32} />
                    <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">Proven Results</h3>
                    <p className="text-sm text-[#4a4a4a]/80">Join thousands of successful students</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </AuroraBackground>

        {/* Infinite Moving Cards - Social Proof */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h3 className="text-3xl font-bold text-[#4a4a4a]">Trusted by Students Across India</h3>
          </motion.div>
          <InfiniteMovingCards
            items={[
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Target className="text-[#f4acb7] mr-3" size={24} />
                      <span className="font-bold text-[#4a4a4a]">UPSC Aspirant</span>
                    </div>
                    <p className="text-sm text-[#4a4a4a]/80">
                      "Padh.ai helped me structure my vast syllabus. The AI flashcards saved me hours every week!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Zap className="text-[#f4acb7] mr-3" size={24} />
                      <span className="font-bold text-[#4a4a4a]">JEE Student</span>
                    </div>
                    <p className="text-sm text-[#4a4a4a]/80">
                      "The analytics showed me exactly where I was weak. My mock test scores improved by 40%!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <BrainCircuit className="text-[#f4acb7] mr-3" size={24} />
                      <span className="font-bold text-[#4a4a4a]">NEET Aspirant</span>
                    </div>
                    <p className="text-sm text-[#4a4a4a]/80">
                      "Biology concepts became so much clearer with spaced repetition. I feel confident now!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Award className="text-[#f4acb7] mr-3" size={24} />
                      <span className="font-bold text-[#4a4a4a]">Successful Candidate</span>
                    </div>
                    <p className="text-sm text-[#4a4a4a]/80">
                      "The day-by-day study plan kept me on track. No more exam anxiety or last-minute panic!"
                    </p>
                  </div>
                ),
              },
            ]}
            speed="slow"
          />
        </section>

        {/* Features Section - Bento Grid */}
        <section id="features" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-[#4a4a4a]">Learn Smarter, Not Just Harder</h3>
            <p className="mt-2 text-lg text-[#4a4a4a]">From getting started to optimizing every study session.</p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto">
            {/* Large feature card */}
            <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#f4acb7]/10 to-[#ffcad4]/10">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 rounded-2xl bg-[#f4acb7]/20 mb-4">
                    <Zap size={32} className="text-[#f4acb7]" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#4a4a4a] mb-3">AI Flashcard Generator</h4>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#f4acb7] text-white text-xs font-semibold mb-4">
                    Core Pass
                  </span>
                  <p className="text-[#4a4a4a]/80 text-lg">
                    Stop wasting hours creating flashcards manually. Upload PDFs or paste text and let our AI create
                    relevant, high-quality flashcards instantly. Save time and focus on learning.
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 p-4 rounded-xl bg-white/50 border border-[#ffcad4]/30"
                >
                  <p className="text-sm text-[#4a4a4a]">Generate 100+ cards in seconds</p>
                </motion.div>
              </div>
            </BentoCard>

            {/* Medium cards */}
            <BentoCard className="md:col-span-1">
              <BookOpen size={28} className="text-[#f4acb7] mb-4" />
              <h4 className="text-xl font-bold text-[#4a4a4a] mb-2">Multi-Exam Planning</h4>
              <p className="text-[#4a4a4a]/80">
                Select UPSC, JEE, or NEET and get a clear, day-by-day study plan instantly.
              </p>
            </BentoCard>

            <BentoCard className="md:col-span-1">
              <Feather size={28} className="text-[#f4acb7] mb-4" />
              <h4 className="text-xl font-bold text-[#4a4a4a] mb-2">Unlimited Flashcards</h4>
              <p className="text-[#4a4a4a]/80">
                Create as many flashcards as you need with our simple, intuitive editor.
              </p>
            </BentoCard>

            <BentoCard className="md:col-span-1 bg-gradient-to-br from-[#9d8189]/10 to-transparent">
              <BrainCircuit size={28} className="text-[#f4acb7] mb-4" />
              <h4 className="text-xl font-bold text-[#4a4a4a] mb-2">AI-Optimized Scheduling</h4>
              <span className="inline-block px-3 py-1 rounded-full bg-[#f4acb7] text-white text-xs font-semibold mb-2">
                Core Pass
              </span>
              <p className="text-[#4a4a4a]/80">
                Advanced SRS that adapts to your personal forgetting curve for faster learning.
              </p>
            </BentoCard>

            <BentoCard className="md:col-span-2 bg-gradient-to-br from-[#ffe5d9]/50 to-transparent">
              <BarChart size={28} className="text-[#f4acb7] mb-4" />
              <h4 className="text-xl font-bold text-[#4a4a4a] mb-2">Advanced Analytics</h4>
              <span className="inline-block px-3 py-1 rounded-full bg-[#f4acb7] text-white text-xs font-semibold mb-2">
                Core Pass
              </span>
              <p className="text-[#4a4a4a]/80">
                Detailed breakdown of your strongest and weakest topics. Know exactly where you stand.
              </p>
            </BentoCard>

            <BentoCard className="md:col-span-1">
              <CheckCircle size={28} className="text-[#f4acb7] mb-4" />
              <h4 className="text-xl font-bold text-[#4a4a4a] mb-2">Smart SRS Review</h4>
              <p className="text-[#4a4a4a]/80">
                Automated review scheduling using proven algorithms so you never forget.
              </p>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center py-8 mt-16 border-t border-[#ffcad4]"
      >
        <p className="text-[#9d8189]">&copy; {new Date().getFullYear()} Padh.ai. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-[#9d8189] hover:text-[#4a4a4a]"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-[#9d8189] hover:text-[#4a4a4a]"
          >
            Contact
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-[#9d8189] hover:text-[#4a4a4a]"
          >
            Privacy Policy
          </motion.a>
        </div>
      </motion.footer>
    </div>
  )
}
