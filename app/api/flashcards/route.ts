import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

// GET /api/flashcards - List flashcards with filters
export async function GET(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServerClient()

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse query parameters for filtering
    const { searchParams } = new URL(req.url)
    const subjectId = searchParams.get('subject_id')
    const topicId = searchParams.get('topic_id')
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)

    // Build query
    let query = supabase
      .from('flashcards')
      .select(`
        *,
        subjects:subject_id(id, name),
        topics:topic_id(id, name)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    // Apply filters
    if (subjectId) {
      query = query.eq('subject_id', subjectId)
    }

    if (topicId) {
      query = query.eq('topic_id', topicId)
    }

    if (search) {
      query = query.or(`front.ilike.%${search}%,back.ilike.%${search}%`)
    }

    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags)
    }

    const { data: flashcards, error } = await query

    if (error) {
      console.error('Error fetching flashcards:', error)
      return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 })
    }

    // Get stats
    const { count: totalCount } = await supabase
      .from('flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const { count: dueCount } = await supabase
      .from('flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .lte('next_review_date', new Date().toISOString())

    return NextResponse.json({
      flashcards,
      stats: {
        total: totalCount || 0,
        due: dueCount || 0,
      },
    })
  } catch (error) {
    console.error('Error in GET /api/flashcards:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/flashcards - Create new flashcard
export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { front, back, subject_id, topic_id, tags } = body

    // Validate required fields
    if (!front || !back) {
      return NextResponse.json(
        { error: 'Front and back content are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create flashcard with initial SRS values
    const { data: flashcard, error } = await supabase
      .from('flashcards')
      .insert({
        user_id: user.id,
        front,
        back,
        subject_id: subject_id || null,
        topic_id: topic_id || null,
        tags: tags || [],
        source: 'manual',
        ease_factor: 2.5,
        interval: 1,
        repetitions: 0,
        next_review_date: new Date().toISOString(),
      })
      .select(`
        *,
        subjects:subject_id(id, name),
        topics:topic_id(id, name)
      `)
      .single()

    if (error) {
      console.error('Error creating flashcard:', error)
      return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 })
    }

    return NextResponse.json({ flashcard }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/flashcards:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
