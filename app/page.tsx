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
//import { AnimatedNeetCard } from '@/components/features/AnimatedNeetCard'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50"
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-accent-muted"
        >
          Padh.ai
        </motion.h1>
        <nav className="flex items-center gap-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#features"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#pricing"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </motion.a>
          <SignedOut>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-in"
                className="text-foreground font-semibold px-4 py-2 rounded-lg hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="text-white font-bold px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </SignedOut>
          <SignedIn>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="text-foreground font-semibold px-4 py-2 rounded-lg hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </motion.div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-primary"
                }
              }}
            />
          </SignedIn>
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
                  <h2 className="text-6xl font-extrabold text-foreground leading-tight">
                    <TextReveal text="It's 1 AM." />
                    <br />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Your books are open.
                    </motion.span>
                    <br />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-accent-pink"
                    >
                      But your mind is somewhere else.
                    </motion.span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-xl text-foreground leading-relaxed max-w-xl"
                  >
                    You're thinking about the mountain of syllabus you still haven't touched. You're wondering if
                    you're studying the right way. You're terrified of that one question:
                    <span className="font-bold text-primary"> "What if I don't make it?"</span>
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-xl text-foreground leading-relaxed max-w-xl font-semibold"
                  >
                    This isn't just exam stress. It's a crisis of confusion. And it ends today.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/dashboard"
                        className="inline-block text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all"
                      >
                        Create Your Free Study Plan
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-sm text-foreground-muted"
                  >
                    No credit card required. Just relief.
                  </motion.p>
                </div>

                {/* Right side - Floating cards (asymmetric) */}
                <div className="relative h-[500px] hidden md:block">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute top-0 right-0 w-64 p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
                  >
                    <Sparkles className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-foreground mb-2">AI-Powered</h3>
                    <p className="text-sm text-foreground-muted">Smart flashcards generated instantly</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute top-32 left-0 w-64 p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
                  >
                    <TrendingUp className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-foreground mb-2">Track Progress</h3>
                    <p className="text-sm text-foreground-muted">Advanced analytics for better results</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-0 right-12 w-64 p-6 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
                  >
                    <Award className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-foreground mb-2">Proven Results</h3>
                    <p className="text-sm text-foreground-muted">Join thousands of successful students</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </AuroraBackground>

        {/* Problem Section - The Crisis */}
        <section className="py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl font-bold text-foreground mb-6">
              You Have the Material. So Why Do You Feel So Lost?
            </h3>
            <p className="text-xl text-foreground-muted leading-relaxed max-w-4xl mx-auto">
              The market is flooded with coaching classes, online videos, and study materials. Yet, the anxiety only
              gets worse. You're drowning in content but starving for a clear path. You have all the "what," but no
              one has shown you the "how."
            </p>
          </motion.div>

          {/* Core Question Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="my-16 p-12 rounded-3xl bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/20 border-2 border-accent-pink/30 shadow-2xl"
          >
            <p className="text-4xl font-bold text-center text-foreground leading-tight">
              "Where do I start, what should I do today, and how do I know if I'm actually learning?"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-xl text-foreground leading-relaxed max-w-4xl mx-auto">
              This is the question that keeps millions of students awake at night. And it's the{' '}
              <span className="font-bold text-accent-pink">only question we exist to answer.</span>
            </p>
          </motion.div>
        </section>

        {/* Solution Section - Introducing Padh.ai */}
        <section className="py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl font-bold text-foreground mb-6">
              Introducing Padh.ai: Your AI Cognitive Coach
            </h3>
            <p className="text-xl text-foreground-muted leading-relaxed max-w-4xl mx-auto">
              Padh.ai is not another content library. It's a meta-learning engine designed to do one thing:{' '}
              <span className="font-bold text-accent-pink">
                teach you how to learn, while managing the anxiety of the journey.
              </span>
            </p>
          </motion.div>

          {/* Benefit-Driven Grid - Exam Specific */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
            >
              <Target className="text-accent-pink mb-6" size={48} />
              <h4 className="text-2xl font-bold text-foreground mb-4">For the Strategist (UPSC)</h4>
              <p className="text-foreground-muted leading-relaxed">
                We know you're not just studying, you're building a fortress of knowledge over years. Padh.ai
                structures your vast, dynamic syllabus into a conquerable, day-by-day mission, ensuring deep
                understanding, not just memorization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
            >
              <BrainCircuit className="text-accent-pink mb-6" size={48} />
              <h4 className="text-2xl font-bold text-foreground mb-4">For the Problem-Solver (JEE)</h4>
              <p className="text-foreground-muted leading-relaxed">
                We know every second counts. Your battle is against time and complexity. Padh.ai sharpens your
                problem-solving speed and accuracy by building a plan that prioritizes practice and mastery of core
                concepts in Physics, Chemistry, and Math.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
            >
              <Zap className="text-accent-pink mb-6" size={48} />
              <h4 className="text-2xl font-bold text-foreground mb-4">For the Memorizer (NEET)</h4>
              <p className="text-foreground-muted leading-relaxed">
              We know the sheer volume of information is daunting. Padh.ai helps you master a huge volume of information, especially in Biology, using scientifically-proven techniques to ensure what you learn stays learned.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Infinite Moving Cards - Social Proof */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h3 className="text-3xl font-bold text-foreground">Trusted by Students Across India</h3>
          </motion.div>
          <InfiniteMovingCards
            items={[
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Target className="text-accent-pink mr-3" size={24} />
                      <span className="font-bold text-foreground">UPSC Aspirant</span>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      "Padh.ai helped me structure my vast syllabus. The AI flashcards saved me hours every week!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Zap className="text-accent-pink mr-3" size={24} />
                      <span className="font-bold text-foreground">JEE Student</span>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      "The analytics showed me exactly where I was weak. My mock test scores improved by 40%!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <BrainCircuit className="text-accent-pink mr-3" size={24} />
                      <span className="font-bold text-foreground">NEET Aspirant</span>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      "Biology concepts became so much clearer with spaced repetition. I feel confident now!"
                    </p>
                  </div>
                ),
              },
              {
                content: (
                  <div>
                    <div className="flex items-center mb-3">
                      <Award className="text-accent-pink mr-3" size={24} />
                      <span className="font-bold text-foreground">Successful Candidate</span>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      "The day-by-day study plan kept me on track. No more exam anxiety or last-minute panic!"
                    </p>
                  </div>
                ),
              },
            ]}
            speed="slow"
          />
        </section>

        {/* Features Section - Step-by-Step Journey */}
        <section id="features" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl font-bold text-foreground">Your Path from Overwhelmed to In Control</h3>
            <p className="mt-4 text-xl text-foreground-muted">Follow these steps. Watch the anxiety transform into clarity.</p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto">
            {/* Step 1 - Large card */}
            <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-accent-pink/10 to-accent-pink-light/10">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 rounded-2xl bg-accent-pink/20 mb-4">
                    <BookOpen size={32} className="text-accent-pink" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl font-bold text-accent-pink">1</span>
                    <h4 className="text-2xl font-bold text-foreground">Get Your Instant Battle Plan</h4>
                  </div>
                  <p className="text-foreground-muted text-lg leading-relaxed">
                    Choose your exam—UPSC, JEE, or NEET. Tell us your target date. In seconds, Padh.ai generates a
                    clear, day-by-day study plan that tells you exactly what to focus on today.{' '}
                    <span className="font-bold text-accent-pink">The paralysis is over.</span>
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 p-4 rounded-xl bg-surface/50 border border-primary/20"
                >
                  <p className="text-sm text-foreground font-semibold">No more "Where do I start?"</p>
                </motion.div>
              </div>
            </BentoCard>

            {/* Step 2 */}
            <BentoCard className="md:col-span-1">
              <Feather size={32} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-accent-pink">2</span>
                <h4 className="text-xl font-bold text-foreground">Turn Knowledge into Memory</h4>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                As you study, create simple flashcards. This isn't just note-taking; it's the first step in actively
                encoding information into your long-term memory. Create as many as you need—we don't believe in
                limits.
              </p>
            </BentoCard>

            {/* Step 3 */}
            <BentoCard className="md:col-span-1">
              <CheckCircle size={32} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-accent-pink">3</span>
                <h4 className="text-xl font-bold text-foreground">Let Your Brain Forget... Almost</h4>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                Our system uses a proven Spaced Repetition (SRS) algorithm to schedule your reviews at the perfect
                moment—right before you forget. You stop wasting time on what you already know.
              </p>
            </BentoCard>

            {/* Step 4 - Core Pass */}
            <BentoCard className="md:col-span-1 bg-gradient-to-br from-accent-pink/10 to-transparent">
              <Zap size={32} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-accent-pink">4</span>
                <h4 className="text-xl font-bold text-foreground">The Unfair Advantage</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted leading-relaxed">
                What if you could save hours every week? Upload your notes or PDFs, and our AI generates high-quality
                flashcards for you. This is where you stop being a note-taker and become a pure learner.
              </p>
            </BentoCard>

            {/* Step 5 - Core Pass */}
            <BentoCard className="md:col-span-2 bg-gradient-to-br from-accent-muted/10 to-transparent">
              <BrainCircuit size={32} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-accent-pink">5</span>
                <h4 className="text-xl font-bold text-foreground">Your Personal Forgetting Curve, Solved</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted leading-relaxed">
                Our advanced AI scheduler learns how you forget. It then creates a review schedule that is perfectly
                optimized for your brain, saving you even more time compared to standard methods.
              </p>
            </BentoCard>

            {/* Step 6 - Core Pass */}
            <BentoCard className="md:col-span-1 bg-gradient-to-br from-accent-soft/20 to-transparent">
              <BarChart size={32} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-accent-pink">6</span>
                <h4 className="text-xl font-bold text-foreground">Know Exactly Where You Stand</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted leading-relaxed">
                No more guessing. Get a detailed, data-driven breakdown of your strongest and weakest topics. Focus
                your precious energy where it will have the maximum impact on your score.
              </p>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Final Call to Action */}
        <section className="py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-6xl font-extrabold text-foreground mb-6">
              Stop Wondering. <span className="text-accent-pink">Start Knowing.</span>
            </h2>
            <p className="text-xl text-foreground-muted leading-relaxed max-w-3xl mx-auto mb-10">
              The journey to your dream rank is long. But the path for today can be clear. Take the first step to end
              the anxiety and take back control of your preparation.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard"
                className="inline-block text-white font-bold px-12 py-5 text-xl rounded-xl shadow-2xl bg-gradient-to-r from-accent-pink to-accent-pink-light hover:shadow-3xl transition-all"
              >
                Create Your Free Study Plan Now
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-sm text-accent-muted"
            >
              It takes less than 2 minutes. Your future self will thank you.
            </motion.p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center py-8 mt-16 border-t border-primary/20"
      >
        <p className="text-accent-muted">&copy; {new Date().getFullYear()} Padh.ai. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-accent-muted hover:text-foreground"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-accent-muted hover:text-foreground"
          >
            Contact
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-sm text-accent-muted hover:text-foreground"
          >
            Privacy Policy
          </motion.a>
        </div>
      </motion.footer>
    </div>
  )
}
