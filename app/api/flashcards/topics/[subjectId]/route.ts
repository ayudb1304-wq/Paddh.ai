import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

// GET /api/flashcards/topics/[subjectId] - Get topics for a subject
export async function GET(req: Request, { params }: { params: Promise<{ subjectId: string }> }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subjectId } = await params

    const supabase = createServerClient()

    // Get topics for the subject
    const { data: topics, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', subjectId)
      .order('name')

    if (error) {
      console.error('Error fetching topics:', error)
      return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 })
    }

    return NextResponse.json({ topics: topics || [] })
  } catch (error) {
    console.error('Error in GET /api/flashcards/topics/[subjectId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
