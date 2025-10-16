'use client'

import { useState, useRef } from 'react'
import { Edit2, Trash2, BookOpen, Tag, Loader2 } from 'lucide-react'

interface FlashcardCardProps {
  id: string
  front: string
  back: string
  subject?: { id: string; name: string } | null
  topic?: { id: string; name: string } | null
  tags?: string[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  index?: number
  isDeleting?: boolean
}

export function FlashcardCard({
  id,
  front,
  back,
  subject,
  topic,
  tags = [],
  onEdit,
  onDelete,
  index = 0,
  isDeleting = false,
}: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleFlip = (e: React.MouseEvent) => {
    // Don't flip if clicking on action buttons
    if ((e.target as HTMLElement).closest('.action-button')) {
      return
    }

    setIsFlipped(!isFlipped)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(id)
  }

  return (
    <div
      className="relative cursor-pointer h-80"
      style={{
        perspective: '1000px',
      }}
      onClick={handleFlip}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full transition-all duration-500 ease-out hover:scale-105 active:scale-95"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 p-6 bg-surface border-2 border-primary/40 rounded-2xl shadow-md flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {subject && (
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-accent-pink" />
                  <span className="text-xs text-foreground-muted">{subject.name}</span>
                  {topic && <span className="text-xs text-foreground-muted">• {topic.name}</span>}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  disabled={isDeleting}
                  className="action-button p-2 bg-accent-pink/10 hover:bg-accent-pink/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Edit flashcard"
                >
                  <Edit2 size={16} className="text-accent-pink" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="action-button p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete flashcard"
                >
                  {isDeleting ? (
                    <Loader2 size={16} className="text-red-500 animate-spin" />
                  ) : (
                    <Trash2 size={16} className="text-red-500" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center px-4">
            <p className="text-xl font-semibold text-foreground text-center break-words">
              {front}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-accent-pink/10 text-accent-pink rounded-full text-xs"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs text-foreground-muted">+{tags.length - 3} more</span>
                )}
              </div>
            )}
            <p className="text-xs text-center text-foreground-muted">Click to reveal answer</p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 p-6 bg-surface border-2 border-accent-pink rounded-2xl shadow-md flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {subject && (
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-accent-pink" />
                  <span className="text-xs text-foreground-muted">{subject.name}</span>
                  {topic && <span className="text-xs text-foreground-muted">• {topic.name}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Answer */}
          <div className="flex-1 flex items-center justify-center px-4">
            <p className="text-xl font-semibold text-foreground text-center break-words">
              {back}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4">
            <p className="text-xs text-center text-foreground-muted">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  )
}
