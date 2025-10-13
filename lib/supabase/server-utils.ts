import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId } from './queries'
import type { Database } from '@/types/database'

type User = Database['public']['Tables']['users']['Row']

/**
 * Get the current logged-in user from Supabase
 * This combines Clerk authentication with Supabase user data
 */
export async function getCurrentUser(): Promise<User | null> {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  try {
    const supabaseUser = await getUserByClerkId(clerkUser.id)
    return supabaseUser
  } catch (error) {
    console.error('Error fetching user from Supabase:', error)
    return null
  }
}

/**
 * Require authentication and return the current user
 * Throws an error if user is not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized: User must be logged in')
  }

  return user
}

/**
 * Check if the current user has completed onboarding
 */
export async function hasCompletedOnboarding(): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return user.onboarding_completed
}

/**
 * Check if the current user has a premium subscription
 */
export async function isPremiumUser(): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return user.subscription_tier === 'CORE_PASS'
}
