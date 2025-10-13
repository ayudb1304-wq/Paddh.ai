import { createServerClient } from '@/lib/supabase/client'
import { successResponse, serverErrorResponse } from '@/lib/api/response'

export async function GET() {
  try {
    // Use server client with service role to bypass RLS for testing
    const supabase = createServerClient()

    const { data: exams, error } = await supabase
      .from('exams')
      .select('*')
      .order('name')

    if (error) {
      throw error
    }

    return successResponse({
      message: 'Database connection successful!',
      examsCount: exams?.length || 0,
      exams: exams || []
    })
  } catch (error) {
    return serverErrorResponse('Database connection failed', error)
  }
}
