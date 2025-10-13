import { supabase, createServerClient } from './client'
import type { Database } from '@/types/database'

type Exam = Database['public']['Tables']['exams']['Row']
type Subject = Database['public']['Tables']['subjects']['Row']
type Topic = Database['public']['Tables']['topics']['Row']
type User = Database['public']['Tables']['users']['Row']
type Flashcard = Database['public']['Tables']['flashcards']['Row']

// ==================== EXAM QUERIES ====================

export async function getAllExams(): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getExamById(examId: string): Promise<Exam | null> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('id', examId)
    .single()

  if (error) throw error
  return data
}

export async function getExamByName(name: string): Promise<Exam | null> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('name', name)
    .single()

  if (error) throw error
  return data
}

// ==================== SUBJECT QUERIES ====================

export async function getSubjectsByExamId(examId: string): Promise<Subject[]> {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('exam_id', examId)
    .order('name')

  if (error) throw error
  return data || []
}

export async function getSubjectById(subjectId: string): Promise<Subject | null> {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', subjectId)
    .single()

  if (error) throw error
  return data
}

// ==================== TOPIC QUERIES ====================

export async function getTopicsBySubjectId(subjectId: string): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('subject_id', subjectId)
    .order('name')

  if (error) throw error
  return data || []
}

export async function getTopicById(topicId: string): Promise<Topic | null> {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', topicId)
    .single()

  if (error) throw error
  return data
}

// ==================== USER QUERIES ====================

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No rows returned
    throw error
  }
  return data
}

export async function createUser(userData: {
  clerk_id: string
  email: string
  first_name?: string
  last_name?: string
}): Promise<User> {
  const serverClient = createServerClient()

  const { data, error } = await serverClient
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUser(
  clerkId: string,
  updates: Partial<Database['public']['Tables']['users']['Update']>
): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('clerk_id', clerkId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ==================== FLASHCARD QUERIES ====================

export async function getFlashcardsByUserId(userId: string): Promise<Flashcard[]> {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getDueFlashcards(userId: string): Promise<Flashcard[]> {
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
    .lte('next_review_date', now)
    .order('next_review_date')

  if (error) throw error
  return data || []
}

export async function createFlashcard(
  flashcardData: Database['public']['Tables']['flashcards']['Insert']
): Promise<Flashcard> {
  const { data, error } = await supabase
    .from('flashcards')
    .insert(flashcardData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateFlashcard(
  flashcardId: string,
  updates: Database['public']['Tables']['flashcards']['Update']
): Promise<Flashcard> {
  const { data, error } = await supabase
    .from('flashcards')
    .update(updates)
    .eq('id', flashcardId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteFlashcard(flashcardId: string): Promise<void> {
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', flashcardId)

  if (error) throw error
}

// ==================== REVIEW QUERIES ====================

export async function createReview(
  reviewData: Database['public']['Tables']['reviews']['Insert']
): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .insert(reviewData)

  if (error) throw error
}

export async function getReviewHistory(
  userId: string,
  limit: number = 100
): Promise<Database['public']['Tables']['reviews']['Row'][]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .order('reviewed_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

// ==================== STATS QUERIES ====================

export async function getUserStats(userId: string) {
  const [flashcardsCount, dueCount, reviewsToday] = await Promise.all([
    // Total flashcards
    supabase
      .from('flashcards')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),

    // Due flashcards
    supabase
      .from('flashcards')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .lte('next_review_date', new Date().toISOString()),

    // Reviews today
    supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('reviewed_at', new Date().toISOString().split('T')[0])
  ])

  return {
    totalFlashcards: flashcardsCount.count || 0,
    dueFlashcards: dueCount.count || 0,
    reviewsToday: reviewsToday.count || 0,
  }
}
