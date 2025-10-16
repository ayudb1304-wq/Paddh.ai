'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Plus, X, Save } from 'lucide-react'

interface Subject {
  id: string
  name: string
}

interface Topic {
  id: string
  name: string
}

interface FlashcardFormProps {
  initialData?: {
    id?: string
    front: string
    back: string
    subject_id?: string
    topic_id?: string
    tags?: string[]
  }
  onSubmit: (data: {
    front: string
    back: string
    subject_id?: string
    topic_id?: string
    tags: string[]
  }) => Promise<void>
  onCancel?: () => void
  submitLabel?: string
}

export function FlashcardForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Flashcard',
}: FlashcardFormProps) {
  const [front, setFront] = useState(initialData?.front || '')
  const [back, setBack] = useState(initialData?.back || '')
  const [subjectId, setSubjectId] = useState(initialData?.subject_id || '')
  const [topicId, setTopicId] = useState(initialData?.topic_id || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [newTag, setNewTag] = useState('')

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [loadingSubjects, setLoadingSubjects] = useState(true)
  const [loadingTopics, setLoadingTopics] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Fetch subjects on mount
  useEffect(() => {
    fetchSubjects()
  }, [])

  // Fetch topics when subject changes
  useEffect(() => {
    if (subjectId) {
      fetchTopics(subjectId)
    } else {
      setTopics([])
      setTopicId('')
    }
  }, [subjectId])

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true)
      const response = await fetch('/api/flashcards/subjects')
      if (!response.ok) throw new Error('Failed to fetch subjects')
      const data = await response.json()
      setSubjects(data.subjects || [])
    } catch (err) {
      console.error('Error fetching subjects:', err)
      setError('Failed to load subjects')
    } finally {
      setLoadingSubjects(false)
    }
  }

  const fetchTopics = async (subjectId: string) => {
    try {
      setLoadingTopics(true)
      const response = await fetch(`/api/flashcards/topics/${subjectId}`)
      if (!response.ok) throw new Error('Failed to fetch topics')
      const data = await response.json()
      setTopics(data.topics || [])
    } catch (err) {
      console.error('Error fetching topics:', err)
      setError('Failed to load topics')
    } finally {
      setLoadingTopics(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!front.trim() || !back.trim()) {
      setError('Front and back content are required')
      return
    }

    try {
      setSubmitting(true)
      await onSubmit({
        front: front.trim(),
        back: back.trim(),
        subject_id: subjectId || undefined,
        topic_id: topicId || undefined,
        tags,
      })
    } catch (err) {
      console.error('Error submitting flashcard:', err)
      setError('Failed to save flashcard')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Front Content */}
      <div>
        <label htmlFor="front" className="block text-sm font-semibold text-foreground mb-2">
          Question / Front <span className="text-red-500">*</span>
        </label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all resize-none"
          placeholder="Enter the question or front of the card..."
          required
        />
      </div>

      {/* Back Content */}
      <div>
        <label htmlFor="back" className="block text-sm font-semibold text-foreground mb-2">
          Answer / Back <span className="text-red-500">*</span>
        </label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all resize-none"
          placeholder="Enter the answer or back of the card..."
          required
        />
      </div>

      {/* Subject Selection */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
          Subject (Optional)
        </label>
        {loadingSubjects ? (
          <div className="flex items-center justify-center py-3 text-foreground-muted">
            <Loader2 className="animate-spin mr-2" size={16} />
            Loading subjects...
          </div>
        ) : (
          <select
            id="subject"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full px-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Topic Selection */}
      {subjectId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label htmlFor="topic" className="block text-sm font-semibold text-foreground mb-2">
            Topic (Optional)
          </label>
          {loadingTopics ? (
            <div className="flex items-center justify-center py-3 text-foreground-muted">
              <Loader2 className="animate-spin mr-2" size={16} />
              Loading topics...
            </div>
          ) : (
            <select
              id="topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full px-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all"
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          )}
        </motion.div>
      )}

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-semibold text-foreground mb-2">
          Tags (Optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            id="tags"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTag()
              }
            }}
            className="flex-1 px-4 py-3 bg-surface/50 border border-primary/20 rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all"
            placeholder="Add a tag..."
          />
          <motion.button
            type="button"
            onClick={handleAddTag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-accent-pink text-white rounded-xl hover:bg-accent-pink-light transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
          </motion.button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-accent-pink/20 text-accent-pink rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-accent-pink/30 rounded-full p-0.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-pink-light text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              {submitLabel}
            </>
          )}
        </motion.button>

        {onCancel && (
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-surface/50 border border-primary/20 text-foreground rounded-xl font-semibold hover:bg-surface transition-all"
          >
            Cancel
          </motion.button>
        )}
      </div>
    </form>
  )
}
