import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

// GET /api/flashcards/subjects - Get subjects for user's selected exam
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServerClient()

    // Get user's selected exam
    const { data: user } = await supabase
      .from('users')
      .select('selected_exam_id')
      .eq('clerk_id', userId)
      .single()

    if (!user || !user.selected_exam_id) {
      return NextResponse.json({ error: 'User has not selected an exam' }, { status: 404 })
    }

    // Get subjects for the exam
    const { data: subjects, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('exam_id', user.selected_exam_id)
      .order('name')

    if (error) {
      console.error('Error fetching subjects:', error)
      return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 })
    }

    return NextResponse.json({ subjects: subjects || [] })
  } catch (error) {
    console.error('Error in GET /api/flashcards/subjects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
