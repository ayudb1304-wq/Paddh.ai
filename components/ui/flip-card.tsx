'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  onFlip?: (isFlipped: boolean) => void
}

export function FlipCard({
  front,
  back,
  className = '',
  frontClassName = '',
  backClassName = '',
  onFlip,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleFlip = () => {
    if (!cardRef.current) return

    const newFlipState = !isFlipped

    // GSAP 3D flip animation
    gsap.to(cardRef.current, {
      rotateY: newFlipState ? 180 : 0,
      duration: 0.6,
      ease: 'power2.inOut',
      transformStyle: 'preserve-3d',
      onComplete: () => {
        setIsFlipped(newFlipState)
        onFlip?.(newFlipState)
      },
    })
  }

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{
        perspective: '1000px',
      }}
      onClick={handleFlip}
    >
      <motion.div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 backface-hidden ${frontClassName}`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 backface-hidden ${backClassName}`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
