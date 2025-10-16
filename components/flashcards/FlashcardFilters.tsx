'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Loader2 } from 'lucide-react'

interface Subject {
  id: string
  name: string
}

interface FlashcardFiltersProps {
  onFilterChange: (filters: {
    search?: string
    subject_id?: string
    tags?: string[]
  }) => void
}

export function FlashcardFilters({ onFilterChange }: FlashcardFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loadingSubjects, setLoadingSubjects] = useState(false)

  useEffect(() => {
    fetchSubjects()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters()
    }, 300)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, subjectId])

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true)
      const response = await fetch('/api/flashcards/subjects')
      if (!response.ok) throw new Error('Failed to fetch subjects')
      const data = await response.json()
      setSubjects(data.subjects || [])
    } catch (err) {
      console.error('Error fetching subjects:', err)
    } finally {
      setLoadingSubjects(false)
    }
  }

  const applyFilters = () => {
    onFilterChange({
      search: search || undefined,
      subject_id: subjectId || undefined,
    })
  }

  const clearFilters = () => {
    setSearch('')
    setSubjectId('')
    onFilterChange({})
  }

  const hasActiveFilters = search || subjectId

  return (
    <div className="mb-6">
      <div className="flex gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-muted"
            size={20}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flashcards..."
            className="w-full pl-12 pr-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Toggle Button */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
            showFilters
              ? 'bg-accent-pink text-white'
              : 'bg-surface/50 border border-primary/20 text-foreground hover:bg-surface'
          }`}
        >
          <Filter size={20} />
          Filters
        </motion.button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
            title="Clear all filters"
          >
            <X size={20} />
          </motion.button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-surface/50 border border-primary/20 rounded-xl space-y-4">
              {/* Subject Filter */}
              <div>
                <label htmlFor="subject-filter" className="block text-sm font-semibold text-foreground mb-2">
                  Filter by Subject
                </label>
                {loadingSubjects ? (
                  <div className="flex items-center justify-center py-3 text-foreground-muted">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Loading subjects...
                  </div>
                ) : (
                  <select
                    id="subject-filter"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all"
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/10">
                  <span className="text-sm text-foreground-muted">Active filters:</span>
                  {search && (
                    <span className="px-3 py-1 bg-accent-pink/20 text-accent-pink rounded-full text-sm">
                      Search: &quot;{search}&quot;
                    </span>
                  )}
                  {subjectId && (
                    <span className="px-3 py-1 bg-accent-pink/20 text-accent-pink rounded-full text-sm">
                      Subject: {subjects.find((s) => s.id === subjectId)?.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
