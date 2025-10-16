'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
  backgroundImage?: string
  showAurora?: boolean
}

export const AuroraBackground = ({
  children,
  className = '',
  backgroundImage,
  showAurora = true
}: AuroraBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image Layer */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      )}

      {/* Animated aurora gradients */}
      {showAurora && (
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: backgroundImage ? 0.3 : 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Gradient blobs - reduced opacity when image is present */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full ${
                backgroundImage
                  ? 'bg-gradient-to-r from-accent-pink/20 via-accent-pink-light/10 to-transparent'
                  : 'bg-gradient-to-r from-accent-pink/30 via-accent-pink-light/20 to-transparent'
              } blur-3xl`}
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full ${
                backgroundImage
                  ? 'bg-gradient-to-l from-accent-muted/15 via-primary/8 to-transparent'
                  : 'bg-gradient-to-l from-accent-muted/20 via-primary/10 to-transparent'
              } blur-3xl`}
            />
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -100, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full ${
                backgroundImage
                  ? 'bg-gradient-to-br from-accent-pink/15 via-transparent to-accent-soft/20'
                  : 'bg-gradient-to-br from-accent-pink/20 via-transparent to-accent-soft/30'
              } blur-3xl`}
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
