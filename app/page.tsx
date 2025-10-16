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
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  // Refs for GSAP animations
  const heroLine1Ref = useRef<HTMLSpanElement>(null)
  const heroLine2Ref = useRef<HTMLSpanElement>(null)
  const heroLine3Ref = useRef<HTMLSpanElement>(null)
  const heroPara1Ref = useRef<HTMLParagraphElement>(null)
  const heroPara2Ref = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const heroCard1Ref = useRef<HTMLDivElement>(null)
  const heroCard2Ref = useRef<HTMLDivElement>(null)
  const heroCard3Ref = useRef<HTMLDivElement>(null)

  const problemHeadlineRef = useRef<HTMLHeadingElement>(null)
  const problemQuoteRef = useRef<HTMLDivElement>(null)

  const solutionCard1Ref = useRef<HTMLDivElement>(null)
  const solutionCard2Ref = useRef<HTMLDivElement>(null)
  const solutionCard3Ref = useRef<HTMLDivElement>(null)

  const bentoGridRef = useRef<HTMLDivElement>(null)

  const finalHeadlineRef = useRef<HTMLHeadingElement>(null)
  const finalCtaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return

    // Check if device is mobile for responsive optimizations
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // ===== HERO SECTION ANIMATIONS =====
      // Animate headline lines sequentially on scroll
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroLine1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Line 1: "It's 1 AM." - fade in and move up
      heroTimeline.fromTo(
        heroLine1Ref.current,
        { opacity: 0, y: 30, filter: isMobile ? 'blur(5px)' : 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
      )

      // Line 2: "Your books are open." - fade in and move up
      heroTimeline.fromTo(
        heroLine2Ref.current,
        { opacity: 0, y: 30, filter: isMobile ? 'blur(5px)' : 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      // Line 3: "But your mind is somewhere else." - dramatic blur-in effect
      heroTimeline.fromTo(
        heroLine3Ref.current,
        { opacity: 0, y: 40, filter: isMobile ? 'blur(10px)' : 'blur(20px)', scale: 0.95 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )

      // Paragraphs: Sequential fade in and slide up
      gsap.fromTo(
        [heroPara1Ref.current, heroPara2Ref.current, heroCtaRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroPara1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Floating cards: Animate from off-screen/scaled-down
      gsap.fromTo(
        heroCard1Ref.current,
        { opacity: 0, x: 100, scale: 0.8, rotate: 45 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroCard1Ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        heroCard2Ref.current,
        { opacity: 0, x: -100, scale: 0.8, rotate: -45 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroCard2Ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        heroCard3Ref.current,
        { opacity: 0, x: 100, scale: 0.8, rotate: 30 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroCard3Ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ===== PROBLEM SECTION ANIMATIONS =====
      // Scrub animation for headline (blur to clear)
      gsap.fromTo(
        problemHeadlineRef.current,
        { opacity: 0.3, filter: isMobile ? 'blur(5px)' : 'blur(10px)', scale: 0.95 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: problemHeadlineRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )

      // Pin animation for quote block (only on desktop for better performance)
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: problemQuoteRef.current,
          start: 'top center',
          end: '+=300',
          pin: true,
          pinSpacing: true,
        })

        // Scale up the quote during pin
        gsap.fromTo(
          problemQuoteRef.current,
          { scale: 0.95 },
          {
            scale: 1.05,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: problemQuoteRef.current,
              start: 'top center',
              end: '+=300',
              scrub: 1,
            },
          }
        )
      } else {
        // Simple fade-in animation for mobile
        gsap.fromTo(
          problemQuoteRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: problemQuoteRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ===== SOLUTION SECTION ANIMATIONS =====
      // Stagger the benefit cards entering from bottom
      gsap.fromTo(
        [solutionCard1Ref.current, solutionCard2Ref.current, solutionCard3Ref.current],
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: solutionCard1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ===== BENTO GRID ANIMATIONS =====
      // Batch animate all bento cards
      const bentoCards = bentoGridRef.current?.querySelectorAll('.bento-card')
      if (bentoCards) {
        ScrollTrigger.batch(bentoCards, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 60, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
              }
            )
          },
          start: 'top 85%',
        })
      }

      // ===== FINAL CTA ANIMATIONS =====
      // Word-by-word reveal for headline
      const finalHeadlineWords = finalHeadlineRef.current?.querySelectorAll('.word')
      if (finalHeadlineWords) {
        gsap.fromTo(
          finalHeadlineWords,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: finalHeadlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // CTA button: Scale from 0 with bounce
      gsap.fromTo(
        finalCtaRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: finalCtaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Cleanup
    return () => {
      ctx.revert()
    }
  }, [])

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

      <main>
        {/* Hero Section */}
        <AuroraBackground backgroundImage="/images/hero-books-background.jpg">
          <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content (asymmetric) */}
                <div className="text-left space-y-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
                    <span ref={heroLine1Ref} className="inline-block">
                      It's 1 AM.
                    </span>
                    <br />
                    <span ref={heroLine2Ref} className="inline-block">
                      Your books are open.
                    </span>
                    <br />
                    <span ref={heroLine3Ref} className="inline-block text-accent-pink drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                      But your mind is somewhere else.
                    </span>
                  </h2>

                  <p
                    ref={heroPara1Ref}
                    className="text-base md:text-lg text-white/95 leading-relaxed max-w-xl drop-shadow-lg"
                  >
                    You're thinking about the mountain of syllabus you still haven't touched. You're wondering if
                    you're studying the right way. You're terrified of that one question:
                    <span className="font-bold text-primary drop-shadow-md"> "What if I don't make it?"</span>
                  </p>

                  <p
                    ref={heroPara2Ref}
                    className="text-base md:text-lg text-white leading-relaxed max-w-xl font-semibold drop-shadow-lg"
                  >
                    This isn't just exam stress. It's a crisis of confusion. And it ends today.
                  </p>

                  <div
                    ref={heroCtaRef}
                    className="flex flex-col sm:flex-row gap-4 pt-2"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/dashboard"
                        className="inline-block text-white font-bold px-6 py-3 text-base rounded-xl shadow-xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all"
                      >
                        Create Your Free Study Plan
                      </Link>
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-sm text-white/80 drop-shadow-md"
                  >
                    No credit card required. Just relief.
                  </motion.p>
                </div>

                {/* Right side - Floating cards (asymmetric) */}
                <div className="relative h-[500px] hidden md:block">
                  <div
                    ref={heroCard1Ref}
                    className="absolute top-0 right-0 w-64 p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    <Sparkles className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">AI-Powered</h3>
                    <p className="text-sm text-white/80">Smart flashcards generated instantly</p>
                  </div>

                  <div
                    ref={heroCard2Ref}
                    className="absolute top-32 left-0 w-64 p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    <TrendingUp className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">Track Progress</h3>
                    <p className="text-sm text-white/80">Advanced analytics for better results</p>
                  </div>

                  <div
                    ref={heroCard3Ref}
                    className="absolute bottom-0 right-12 w-64 p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    <Award className="text-primary mb-4" size={32} />
                    <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">Proven Results</h3>
                    <p className="text-sm text-white/80">Join thousands of successful students</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AuroraBackground>

        {/* Problem Section - The Crisis */}
        <section className="py-16 max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h3 ref={problemHeadlineRef} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              You Have the Material. So Why Do You Feel So Lost?
            </h3>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-4xl mx-auto">
              The market is flooded with coaching classes, online videos, and study materials. Yet, the anxiety only
              gets worse. You're drowning in content but starving for a clear path.
            </p>
          </motion.div>

          {/* Core Question Highlight */}
          <div
            ref={problemQuoteRef}
            className="my-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-accent-pink/20 to-accent-pink-light/20 border-2 border-accent-pink/30 shadow-2xl"
          >
            <p className="text-2xl md:text-3xl font-bold text-center text-foreground leading-tight">
              "Where do I start, what should I do today, and how do I know if I'm actually learning?"
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
              This is the question that keeps millions of students awake at night. And it's the{' '}
              <span className="font-bold text-accent-pink">only question we exist to answer.</span>
            </p>
          </motion.div>
        </section>

        {/* Solution Section - Introducing Padh.ai */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Introducing Padh.ai: Your AI Cognitive Coach
            </h3>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-4xl mx-auto">
              Padh.ai is not another content library. It's a meta-learning engine designed to do one thing:{' '}
              <span className="font-bold text-accent-pink">
                teach you how to learn, while managing the anxiety of the journey.
              </span>
            </p>
          </motion.div>

          {/* Benefit-Driven Grid - Exam Specific */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div
              ref={solutionCard1Ref}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform cursor-pointer"
            >
              <Target className="text-accent-pink mb-6" size={40} />
              <h4 className="text-xl md:text-2xl font-bold text-foreground mb-4">For the Strategist (UPSC)</h4>
              <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                We know you're not just studying, you're building a fortress of knowledge over years. Padh.ai
                structures your vast, dynamic syllabus into a conquerable, day-by-day mission, ensuring deep
                understanding, not just memorization.
              </p>
            </div>

            <div
              ref={solutionCard2Ref}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform cursor-pointer"
            >
              <BrainCircuit className="text-accent-pink mb-6" size={40} />
              <h4 className="text-xl md:text-2xl font-bold text-foreground mb-4">For the Problem-Solver (JEE)</h4>
              <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                We know every second counts. Your battle is against time and complexity. Padh.ai sharpens your
                problem-solving speed and accuracy by building a plan that prioritizes practice and mastery of core
                concepts in Physics, Chemistry, and Math.
              </p>
            </div>

            <div
              ref={solutionCard3Ref}
              className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl hover:scale-105 hover:-translate-y-2 transition-transform cursor-pointer"
            >
              <Zap className="text-accent-pink mb-6" size={40} />
              <h4 className="text-xl md:text-2xl font-bold text-foreground mb-4">For the Memorizer (NEET)</h4>
              <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
              We know the sheer volume of information is daunting. Padh.ai helps you master a huge volume of information, especially in Biology, using scientifically-proven techniques to ensure what you learn stays learned.
              </p>
            </div>

          </div>
        </section>

        {/* Infinite Moving Cards - Social Proof */}
        <section className="py-16 px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Trusted by Students Across India</h3>
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
        <section id="features" className="py-20 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">Your Path from Overwhelmed to In Control</h3>
            <p className="mt-4 text-base md:text-lg text-foreground-muted">Follow these steps. Watch the anxiety transform into clarity.</p>
          </motion.div>

          <div ref={bentoGridRef}>
            <BentoGrid className="max-w-7xl mx-auto">
              {/* Step 1 - Large card */}
              <BentoCard className="bento-card md:col-span-2 md:row-span-2 bg-gradient-to-br from-accent-pink/10 to-accent-pink-light/10">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 rounded-2xl bg-accent-pink/20 mb-4">
                    <BookOpen size={28} className="text-accent-pink" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-accent-pink">1</span>
                    <h4 className="text-lg md:text-xl font-bold text-foreground">Get Your Instant Battle Plan</h4>
                  </div>
                  <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
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
                  <p className="text-xs md:text-sm text-foreground font-semibold">No more "Where do I start?"</p>
                </motion.div>
              </div>
            </BentoCard>

            {/* Step 2 */}
            <BentoCard className="bento-card md:col-span-1">
              <Feather size={28} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent-pink">2</span>
                <h4 className="text-base md:text-lg font-bold text-foreground">Turn Knowledge into Memory</h4>
              </div>
              <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
                As you study, create simple flashcards. This isn't just note-taking; it's the first step in actively
                encoding information into your long-term memory. Create as many as you need—we don't believe in
                limits.
              </p>
            </BentoCard>

            {/* Step 3 */}
            <BentoCard className="bento-card md:col-span-1">
              <CheckCircle size={28} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent-pink">3</span>
                <h4 className="text-base md:text-lg font-bold text-foreground">Let Your Brain Forget... Almost</h4>
              </div>
              <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
                Our system uses a proven Spaced Repetition (SRS) algorithm to schedule your reviews at the perfect
                moment—right before you forget. You stop wasting time on what you already know.
              </p>
            </BentoCard>

            {/* Step 4 - Core Pass */}
            <BentoCard className="bento-card md:col-span-1 bg-gradient-to-br from-accent-pink/10 to-transparent">
              <Zap size={28} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent-pink">4</span>
                <h4 className="text-base md:text-lg font-bold text-foreground">The Unfair Advantage</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
                What if you could save hours every week? Upload your notes or PDFs, and our AI generates high-quality
                flashcards for you. This is where you stop being a note-taker and become a pure learner.
              </p>
            </BentoCard>

            {/* Step 5 - Core Pass */}
            <BentoCard className="bento-card md:col-span-2 bg-gradient-to-br from-accent-muted/10 to-transparent">
              <BrainCircuit size={28} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent-pink">5</span>
                <h4 className="text-base md:text-lg font-bold text-foreground">Your Personal Forgetting Curve, Solved</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
                Our advanced AI scheduler learns how you forget. It then creates a review schedule that is perfectly
                optimized for your brain, saving you even more time compared to standard methods.
              </p>
            </BentoCard>

            {/* Step 6 - Core Pass */}
            <BentoCard className="bento-card md:col-span-1 bg-gradient-to-br from-accent-soft/20 to-transparent">
              <BarChart size={28} className="text-accent-pink mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-accent-pink">6</span>
                <h4 className="text-base md:text-lg font-bold text-foreground">Know Exactly Where You Stand</h4>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-pink text-white text-xs font-semibold mb-3">
                Core Pass
              </span>
              <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
                No more guessing. Get a detailed, data-driven breakdown of your strongest and weakest topics. Focus
                your precious energy where it will have the maximum impact on your score.
              </p>
            </BentoCard>
          </BentoGrid>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Final Call to Action */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h2 ref={finalHeadlineRef} className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              <span className="word inline-block">Stop</span>{' '}
              <span className="word inline-block">Wondering.</span>{' '}
              <span className="word inline-block text-accent-pink">Start</span>{' '}
              <span className="word inline-block text-accent-pink">Knowing.</span>
            </h2>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-3xl mx-auto mb-10">
              The journey to your dream rank is long. But the path for today can be clear. Take the first step to end
              the anxiety and take back control of your preparation.
            </p>

            <div ref={finalCtaRef}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/dashboard"
                  className="inline-block text-white font-bold px-8 py-4 text-base md:text-lg rounded-xl shadow-2xl bg-gradient-to-r from-accent-pink to-accent-pink-light hover:shadow-3xl transition-all"
                >
                  Create Your Free Study Plan Now
                </Link>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-sm text-accent-muted"
            >
              It takes less than 2 minutes. Your future self will thank you.
            </motion.p>
          </div>
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
