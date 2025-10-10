/**
 * SM-2 (SuperMemo 2) Algorithm Implementation
 * Used for spaced repetition scheduling
 *
 * Quality ratings:
 * 5 - perfect response
 * 4 - correct response after a hesitation
 * 3 - correct response recalled with serious difficulty
 * 2 - incorrect response; where the correct one seemed easy to recall
 * 1 - incorrect response; the correct one remembered
 * 0 - complete blackout
 */

export interface SM2Result {
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: Date
}

export interface SM2Input {
  quality: number // 0-5
  easeFactor: number
  interval: number
  repetitions: number
}

export function calculateSM2(input: SM2Input): SM2Result {
  let { quality, easeFactor, interval, repetitions } = input

  // Ensure quality is within valid range
  quality = Math.max(0, Math.min(5, quality))

  // Calculate new ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  // If quality < 3, reset repetitions and interval
  if (quality < 3) {
    repetitions = 0
    interval = 1
  } else {
    repetitions += 1

    if (repetitions === 1) {
      interval = 1
    } else if (repetitions === 2) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
  }

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview
  }
}

/**
 * AI-Optimized SRS (for Core Pass users)
 * Adjusts the standard SM-2 algorithm based on user's historical performance
 */
export interface AISRSInput extends SM2Input {
  averageQuality: number // User's average quality score across all reviews
  recentAccuracy: number // Percentage of correct answers in last 20 reviews
}

export function calculateAISRS(input: AISRSInput): SM2Result {
  const { averageQuality, recentAccuracy, ...sm2Input } = input

  // Start with standard SM-2
  const result = calculateSM2(sm2Input)

  // Adjust interval based on user's performance
  let intervalMultiplier = 1.0

  // If user is consistently performing well, increase intervals
  if (averageQuality >= 4.0 && recentAccuracy >= 0.9) {
    intervalMultiplier = 1.3 // 30% longer intervals
  } else if (averageQuality >= 3.5 && recentAccuracy >= 0.8) {
    intervalMultiplier = 1.15 // 15% longer intervals
  }
  // If user is struggling, decrease intervals
  else if (averageQuality <= 2.5 || recentAccuracy <= 0.6) {
    intervalMultiplier = 0.7 // 30% shorter intervals
  } else if (averageQuality <= 3.0 || recentAccuracy <= 0.75) {
    intervalMultiplier = 0.85 // 15% shorter intervals
  }

  // Apply the multiplier
  result.interval = Math.max(1, Math.round(result.interval * intervalMultiplier))

  // Recalculate next review date
  result.nextReview = new Date()
  result.nextReview.setDate(result.nextReview.getDate() + result.interval)

  return result
}
