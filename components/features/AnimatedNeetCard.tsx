// // components/features/AnimatedNeetCard.tsx
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion } from 'framer-motion'
// // No top-level anime.js import
// import { BrainCircuit } from 'lucide-react'
// //import type { AnimeInstance } from 'animejs' // Import types for safety

// export function AnimatedNeetCard() {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const iconRef = useRef<SVGSVGElement>(null)
//   const [hasAnimated, setHasAnimated] = useState(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(async (entry) => {
//           if (entry.isIntersecting && !hasAnimated) {
//             // Use a type assertion to bypass the incorrect TypeScript error
//             const anime = (await import('animejs') as any).default as (params: anime.AnimeParams) => AnimeInstance;

//             const paths = iconRef.current?.querySelectorAll('path')
//             if (paths && paths.length > 0) {
//               paths.forEach((path) => {
//                 const length = path.getTotalLength()
//                 path.style.strokeDasharray = `${length}`
//                 path.style.strokeDashoffset = `${length}`
//               })

//               // This will now work without type errors
//               anime({
//                 targets: paths,
//                 strokeDashoffset: [anime.setDashoffset, 0],
//                 easing: 'easeInOutSine',
//                 duration: 1500,
//                 delay: anime.stagger(100),
//               })
//             }
//             setHasAnimated(true)
//             observer.unobserve(entry.target)
//           }
//         })
//       },
//       { threshold: 0.5 }
//     )

//     if (cardRef.current) {
//       observer.observe(cardRef.current)
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current)
//       }
//     }
//   }, [hasAnimated])

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: 0.3 }}
//       whileHover={{ scale: 1.05, y: -5 }}
//       className="p-8 rounded-3xl bg-surface/80 backdrop-blur-sm border border-primary/20 shadow-xl"
//     >
//       <BrainCircuit
//         ref={iconRef}
//         className="text-accent-pink mb-6"
//         size={48}
//         strokeWidth={1.5}
//       />
//       <h4 className="text-2xl font-bold text-foreground mb-4">
//         For the Master Memorizer (NEET)
//       </h4>
//       <p className="text-foreground-muted leading-relaxed">
//         We know the sheer volume of information is daunting. Padh.ai helps you master a huge volume of
//         information, especially in Biology, using scientifically-proven techniques to ensure what you learn
//         stays learned.
//       </p>
//     </motion.div>
//   )
// }