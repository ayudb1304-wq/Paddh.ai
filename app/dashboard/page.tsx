import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from './dashboard-client'
import { createServerClient } from '@/lib/supabase/client'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const supabase = createServerClient()

  // Get user from database
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, onboarding_completed')
    .eq('clerk_id', user.id)
    .single()

  // Redirect to onboarding if not completed
  if (dbUser && !dbUser.onboarding_completed) {
    redirect('/onboarding')
  }

  // Fetch real stats
  let stats = {
    flashcardsCreated: 0,
    reviewsDue: 0,
    currentStreak: 0,
  }

  if (dbUser) {
    // Get flashcard count
    const { count: flashcardCount } = await supabase
      .from('flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', dbUser.id)

    // Get reviews due today
    const { count: dueCount } = await supabase
      .from('flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', dbUser.id)
      .lte('next_review_date', new Date().toISOString())

    // Get streak
    const { data: streak } = await supabase
      .from('streaks')
      .select('current_streak')
      .eq('user_id', dbUser.id)
      .single()

    stats = {
      flashcardsCreated: flashcardCount || 0,
      reviewsDue: dueCount || 0,
      currentStreak: streak?.current_streak || 0,
    }
  }

  // Extract only serializable data needed by the client
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0]?.emailAddress || '',
    imageUrl: user.imageUrl,
  }

  return <DashboardClient user={userData} stats={stats} />
}
