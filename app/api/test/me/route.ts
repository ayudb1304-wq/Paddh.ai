import { withAuth } from '@/lib/api/middleware'
import { successResponse } from '@/lib/api/response'

export async function GET() {
  const authResult = await withAuth()

  if ('error' in authResult) {
    return authResult.error
  }

  return successResponse({
    message: 'Successfully retrieved user from Supabase',
    user: authResult.user
  })
}
