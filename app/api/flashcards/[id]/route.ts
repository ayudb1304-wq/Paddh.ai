import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

// GET /api/flashcards/[id] - Get single flashcard
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const supabase = createServerClient()

    // Get user from database
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (userError || !dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { data: flashcard, error } = await supabase
      .from('flashcards')
      .select(`
        *,
        subjects:subject_id(id, name),
        topics:topic_id(id, name)
      `)
      .eq('id', id)
      .eq('user_id', dbUser.id)
      .single()

    if (error || !flashcard) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 })
    }

    return NextResponse.json({ flashcard })
  } catch (error) {
    console.error('Error in GET /api/flashcards/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/flashcards/[id] - Update flashcard
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { front, back, subject_id, topic_id, tags } = body

    const supabase = createServerClient()

    // Get user from database
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (userError || !dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update flashcard
    const { data: flashcard, error } = await supabase
      .from('flashcards')
      .update({
        front,
        back,
        subject_id: subject_id || null,
        topic_id: topic_id || null,
        tags: tags || [],
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', dbUser.id)
      .select(`
        *,
        subjects:subject_id(id, name),
        topics:topic_id(id, name)
      `)
      .single()

    if (error || !flashcard) {
      console.error('Error updating flashcard:', error)
      return NextResponse.json({ error: 'Failed to update flashcard' }, { status: 500 })
    }

    return NextResponse.json({ flashcard })
  } catch (error) {
    console.error('Error in PATCH /api/flashcards/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/flashcards/[id] - Delete flashcard
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const supabase = createServerClient()

    // Get user from database
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (userError || !dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete flashcard
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id)
      .eq('user_id', dbUser.id)

    if (error) {
      console.error('Error deleting flashcard:', error)
      return NextResponse.json({ error: 'Failed to delete flashcard' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/flashcards/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
