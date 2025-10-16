'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { FlashcardCard } from '@/components/flashcards/FlashcardCard'
import { FlashcardStats } from '@/components/flashcards/FlashcardStats'
import { FlashcardFilters } from '@/components/flashcards/FlashcardFilters'
import { EmptyState } from '@/components/flashcards/EmptyState'
import { DeleteConfirmModal } from '@/components/flashcards/DeleteConfirmModal'
import { FlashcardForm } from '@/components/flashcards/FlashcardForm'

interface Flashcard {
  id: string
  front: string
  back: string
  subjects?: { id: string; name: string }
  topics?: { id: string; name: string }
  tags?: string[]
}

interface FlashcardsClientProps {
  initialFlashcards: Flashcard[]
  initialStats: {
    total: number
    due: number
  }
}

export function FlashcardsClient({ initialFlashcards, initialStats }: FlashcardsClientProps) {
  const [flashcards, setFlashcards] = useState(initialFlashcards)
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [flashcardToDelete, setFlashcardToDelete] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null)
  const [filters, setFilters] = useState<{
    search?: string
    subject_id?: string
    tags?: string[]
  }>({})

  const fetchFlashcards = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filters.search) params.append('search', filters.search)
      if (filters.subject_id) params.append('subject_id', filters.subject_id)
      if (filters.tags) params.append('tags', filters.tags.join(','))

      const response = await fetch(`/api/flashcards?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch flashcards')

      const data = await response.json()
      setFlashcards(data.flashcards || [])
      setStats(data.stats || { total: 0, due: 0 })
    } catch (error) {
      console.error('Error fetching flashcards:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch flashcards when filters change
  useEffect(() => {
    fetchFlashcards()
  }, [fetchFlashcards])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleEdit = (id: string) => {
    const flashcard = flashcards.find((f) => f.id === id)
    if (flashcard) {
      setEditingFlashcard(flashcard)
    }
  }

  const handleUpdateFlashcard = async (data: {
    front: string
    back: string
    subject_id?: string
    topic_id?: string
    tags: string[]
  }) => {
    if (!editingFlashcard) return

    try {
      const response = await fetch(`/api/flashcards/${editingFlashcard.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update flashcard')

      // Refresh flashcards
      await fetchFlashcards()
      setEditingFlashcard(null)
    } catch (error) {
      console.error('Error updating flashcard:', error)
      throw error
    }
  }

  const handleDelete = (id: string) => {
    setFlashcardToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!flashcardToDelete) return

    try {
      setDeletingId(flashcardToDelete)

      const response = await fetch(`/api/flashcards/${flashcardToDelete}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete flashcard')

      // Refresh flashcards
      await fetchFlashcards()
    } catch (error) {
      console.error('Error deleting flashcard:', error)
    } finally {
      setDeletingId(null)
      setFlashcardToDelete(null)
    }
  }

  return (
    <>
      {/* Edit Modal */}
      {editingFlashcard && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-surface border border-primary/20 rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Edit Flashcard</h2>
            <FlashcardForm
              initialData={{
                id: editingFlashcard.id,
                front: editingFlashcard.front,
                back: editingFlashcard.back,
                subject_id: editingFlashcard.subjects?.id,
                topic_id: editingFlashcard.topics?.id,
                tags: editingFlashcard.tags || [],
              }}
              onSubmit={handleUpdateFlashcard}
              onCancel={() => setEditingFlashcard(null)}
              submitLabel="Update Flashcard"
            />
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setFlashcardToDelete(null)
        }}
        onConfirm={confirmDelete}
      />

      {/* Stats */}
      <FlashcardStats total={stats.total} due={stats.due} />

      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">My Flashcards</h2>
        <Link href="/dashboard/flashcards/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-pink-light text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Plus size={20} />
                Create Flashcard
              </>
            )}
          </motion.button>
        </Link>
      </div>

      {/* Filters */}
      <FlashcardFilters onFilterChange={handleFilterChange} />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-pink" size={48} />
        </div>
      )}

      {/* Flashcards Grid */}
      {!loading && flashcards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard, index) => (
            <div key={flashcard.id} data-flashcard-id={flashcard.id}>
              <FlashcardCard
                id={flashcard.id}
                front={flashcard.front}
                back={flashcard.back}
                subject={flashcard.subjects || null}
                topic={flashcard.topics || null}
                tags={flashcard.tags || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={index}
                isDeleting={deletingId === flashcard.id}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && flashcards.length === 0 && (
        <EmptyState
          message={
            Object.keys(filters).length > 0
              ? 'No flashcards found matching your filters'
              : "You haven't created any flashcards yet"
          }
        />
      )}
    </>
  )
}
