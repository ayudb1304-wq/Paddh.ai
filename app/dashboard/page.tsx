import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from './dashboard-client'
import { createServerClient } from '@/lib/supabase/client'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Check if user has completed onboarding
  const supabase = createServerClient()
  const { data: dbUser } = await supabase
    .from('users')
    .select('onboarding_completed')
    .eq('clerk_id', user.id)
    .single()

  // Redirect to onboarding if not completed
  if (dbUser && !dbUser.onboarding_completed) {
    redirect('/onboarding')
  }

  // Extract only serializable data needed by the client
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0]?.emailAddress || '',
    imageUrl: user.imageUrl,
  }

  return <DashboardClient user={userData} />
}
