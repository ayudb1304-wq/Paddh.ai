import { getCurrentUser, isPremiumUser } from '@/lib/supabase/server-utils'
import { unauthorizedResponse, forbiddenResponse } from './response'
import type { Database } from '@/types/database'

type User = Database['public']['Tables']['users']['Row']

/**
 * Middleware to ensure user is authenticated
 * Returns user object if authenticated, or error response if not
 */
export async function withAuth(): Promise<
  { user: User } | { error: Response }
> {
  const user = await getCurrentUser()

  if (!user) {
    return { error: unauthorizedResponse('You must be logged in') }
  }

  return { user }
}

/**
 * Middleware to ensure user has premium subscription
 * Returns user object if premium, or error response if not
 */
export async function withPremium(): Promise<
  { user: User } | { error: Response }
> {
  const authResult = await withAuth()

  if ('error' in authResult) {
    return authResult
  }

  const hasPremium = await isPremiumUser()

  if (!hasPremium) {
    return {
      error: forbiddenResponse(
        'This feature requires a Core Pass subscription'
      ),
    }
  }

  return { user: authResult.user }
}

/**
 * Helper to handle API route errors consistently
 */
export function handleApiError(error: unknown): Response {
  console.error('API Error:', error)

  if (error instanceof Error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    )
  }

  return new Response(
    JSON.stringify({
      success: false,
      error: 'An unexpected error occurred',
    }),
    { status: 500 }
  )
}
