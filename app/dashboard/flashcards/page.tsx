import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/client'
import { FlashcardsClient } from './flashcards-client'
import { AuroraBackground } from '@/components/ui/aurora-background'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'

export default async function FlashcardsPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const supabase = createServerClient()

  // Get user from database
  const { data: dbUser } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', user.id)
    .single()

  if (!dbUser) {
    redirect('/onboarding')
  }

  // Fetch flashcards
  const { data: flashcards } = await supabase
    .from('flashcards')
    .select(`
      *,
      subjects:subject_id(id, name),
      topics:topic_id(id, name)
    `)
    .eq('user_id', dbUser.id)
    .order('created_at', { ascending: false })

  // Get stats
  const { count: totalCount } = await supabase
    .from('flashcards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', dbUser.id)

  const { count: dueCount } = await supabase
    .from('flashcards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', dbUser.id)
    .lte('next_review_date', new Date().toISOString())

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md z-50 border-b border-primary/20">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-accent-muted cursor-pointer hover:text-primary transition-colors">
            Padh.ai
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/flashcards"
              className="text-base text-primary font-semibold"
            >
              Flashcards
            </Link>
            <Link
              href="#"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              Analytics
            </Link>
          </nav>
          <ThemeToggleButton />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10 border-2 border-accent-pink',
              },
            }}
          />
        </div>
      </header>

      <AuroraBackground>
        <main className="px-8 py-12 max-w-7xl mx-auto">
          <FlashcardsClient
            initialFlashcards={flashcards || []}
            initialStats={{
              total: totalCount || 0,
              due: dueCount || 0,
            }}
          />
        </main>
      </AuroraBackground>
    </div>
  )
}
