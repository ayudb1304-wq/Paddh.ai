'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Search } from 'lucide-react'

export interface ConfusingTopic {
  topic: string
  subject: string
  priority: number
}

interface MultiTopicSelectorProps {
  selectedExam: string
  value: ConfusingTopic[]
  onChange: (topics: ConfusingTopic[]) => void
  maxTopics?: number
}

export function MultiTopicSelector({
  selectedExam,
  value,
  onChange,
  maxTopics = 5
}: MultiTopicSelectorProps) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<{ topic: string; subject: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/topics?examType=${selectedExam}&query=${encodeURIComponent(inputValue)}`
        )
        if (response.ok) {
          const data = await response.json()
          // Transform API response to include subject info
          const topicsWithSubjects = (data.topics || []).map((topic: string) => ({
            topic,
            subject: data.subject || 'General' // API should return subject info
          }))
          setSuggestions(topicsWithSubjects)
        }
      } catch (error) {
        console.error('Failed to fetch topic suggestions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce)
  }, [inputValue, selectedExam])

  const addTopic = (topic: string, subject: string) => {
    if (value.length >= maxTopics) {
      return
    }

    // Check if topic already exists
    if (value.some(t => t.topic.toLowerCase() === topic.toLowerCase())) {
      return
    }

    const newTopic: ConfusingTopic = {
      topic,
      subject,
      priority: value.length + 1
    }

    onChange([...value, newTopic])
    setInputValue('')
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const removeTopic = (index: number) => {
    const newTopics = value.filter((_, i) => i !== index)
    // Re-prioritize remaining topics
    const reprioritized = newTopics.map((topic, i) => ({
      ...topic,
      priority: i + 1
    }))
    onChange(reprioritized)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      // Add custom topic if no suggestions or exact match
      addTopic(inputValue.trim(), 'Custom')
    }
  }

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'bg-red-500/20 border-red-500/50 text-red-500'
    if (priority === 2) return 'bg-orange-500/20 border-orange-500/50 text-orange-500'
    if (priority === 3) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'
    return 'bg-blue-500/20 border-blue-500/50 text-blue-500'
  }

  const getPriorityLabel = (priority: number) => {
    if (priority === 1) return '1st Priority'
    if (priority === 2) return '2nd Priority'
    if (priority === 3) return '3rd Priority'
    return `${priority}th Priority`
  }

  return (
    <div className="space-y-4">
      {/* Selected Topics */}
      <div className="flex flex-wrap gap-3 min-h-[60px]">
        <AnimatePresence mode="popLayout">
          {value.map((topic, index) => (
            <motion.div
              key={`${topic.topic}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border-2
                ${getPriorityColor(topic.priority)}
                transition-all group
              `}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{topic.topic}</span>
                <span className="text-xs opacity-75">{getPriorityLabel(topic.priority)}</span>
              </div>
              <button
                onClick={() => removeTopic(index)}
                className="ml-2 hover:scale-110 transition-transform"
                aria-label={`Remove ${topic.topic}`}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {value.length === 0 && (
          <div className="text-foreground-muted italic flex items-center">
            Start typing to add topics that confuse you...
          </div>
        )}
      </div>

      {/* Input Field */}
      {value.length < maxTopics && (
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Search className="text-accent-pink" size={20} />
            <label className="text-foreground font-semibold text-sm">
              Add Confusing Topic ({value.length}/{maxTopics})
            </label>
          </div>

          <div className="relative">
            <motion.input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setShowSuggestions(true)
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g., Thermodynamics, Organic Chemistry, Indian Polity..."
              whileFocus={{ scale: 1.01 }}
              className="
                w-full px-6 py-3 rounded-xl
                bg-surface border-2 border-primary/20
                focus:border-accent-pink focus:outline-none
                transition-all text-foreground
                placeholder:text-foreground-muted
              "
            />

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  absolute z-10 w-full mt-2
                  bg-surface border-2 border-primary/20
                  rounded-xl shadow-xl overflow-hidden
                  max-h-60 overflow-y-auto
                "
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                    onClick={() => addTopic(suggestion.topic, suggestion.subject)}
                    className="
                      w-full px-6 py-3 text-left
                      border-b border-primary/10 last:border-0
                      transition-colors
                    "
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">{suggestion.topic}</span>
                      <span className="text-xs text-foreground-muted">{suggestion.subject}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {isLoading && (
              <p className="text-sm text-foreground-muted mt-2 flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading suggestions...
              </p>
            )}
          </div>

          <p className="text-xs text-foreground-muted mt-2">
            Press Enter to add a custom topic or select from suggestions
          </p>
        </div>
      )}

      {value.length >= maxTopics && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-accent-pink font-semibold"
        >
          Maximum {maxTopics} topics reached. Remove a topic to add more.
        </motion.div>
      )}
    </div>
  )
}
