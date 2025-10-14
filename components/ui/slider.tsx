'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SliderProps {
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  label?: string
  unit?: string
  showValue?: boolean
  colorize?: boolean // For confidence slider with color gradient
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  unit = '',
  showValue = true,
  colorize = false,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100

  // Color based on value (for confidence slider)
  const getColor = () => {
    if (!colorize) return 'bg-accent-pink'
    if (percentage < 33) return 'bg-red-500'
    if (percentage < 66) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getTextColor = () => {
    if (!colorize) return 'text-accent-pink'
    if (percentage < 33) return 'text-red-500'
    if (percentage < 66) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="w-full space-y-4">
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-foreground font-semibold">{label}</label>
          {showValue && (
            <motion.span
              key={value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${getTextColor()}`}
            >
              {value}
              {unit}
            </motion.span>
          )}
        </div>
      )}

      <div className="relative pt-2 pb-6">
        {/* Track background */}
        <div className="h-3 bg-surface rounded-full border border-primary/20 overflow-hidden">
          {/* Progress fill */}
          <motion.div
            className={`h-full ${getColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Slider input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Thumb */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg ${getColor()} pointer-events-none`}
          style={{ left: `calc(${percentage}% - 12px)` }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Min/Max labels */}
        <div className="flex justify-between text-xs text-foreground-muted mt-2">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}
