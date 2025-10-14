'use client'

import { motion } from 'framer-motion'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = value === option.value

        return (
          <motion.label
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all
              border-2 ${
                isSelected
                  ? 'border-accent-pink bg-accent-pink/10 shadow-lg'
                  : 'border-primary/20 bg-surface/50 hover:border-accent-pink/50'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />

            {/* Custom radio button */}
            <div className="flex-shrink-0 mt-0.5">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-accent-pink' : 'border-foreground-muted'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`${name}-selected`}
                    className="w-3 h-3 rounded-full bg-accent-pink"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>

            {/* Label and description */}
            <div className="flex-1">
              <div className="font-semibold text-foreground">{option.label}</div>
              {option.description && (
                <p className="text-sm text-foreground-muted mt-1">{option.description}</p>
              )}
            </div>
          </motion.label>
        )
      })}
    </div>
  )
}
