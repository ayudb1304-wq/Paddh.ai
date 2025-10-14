import { createServerClient } from '@/lib/supabase/client'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const examType = searchParams.get('examType')
    const query = searchParams.get('query')

    if (!examType || !query) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: examType, query' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const supabase = createServerClient()

    // Get exam ID
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .select('id')
      .eq('name', examType)
      .single()

    if (examError || !exam) {
      return new Response(JSON.stringify({ error: 'Invalid exam type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get subjects for this exam
    const { data: subjects, error: subjectsError } = await supabase
      .from('subjects')
      .select('id')
      .eq('exam_id', exam.id)

    if (subjectsError) {
      console.error('Error fetching subjects:', subjectsError)
      return new Response(JSON.stringify({ error: 'Failed to fetch subjects' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const subjectIds = subjects?.map((s) => s.id) || []

    if (subjectIds.length === 0) {
      return new Response(JSON.stringify({ topics: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Search for topics matching the query across all subjects
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('name')
      .in('subject_id', subjectIds)
      .ilike('name', `%${query}%`)
      .limit(5)

    if (topicsError) {
      console.error('Error fetching topics:', topicsError)
      return new Response(JSON.stringify({ error: 'Failed to fetch topics' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Return unique topic names
    const uniqueTopics = [...new Set(topics?.map((t) => t.name) || [])]

    return new Response(JSON.stringify({ topics: uniqueTopics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in topics API:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
