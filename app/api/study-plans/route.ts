import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'

export async function POST(req: Request) {
  try {
    // Authenticate user
    const { userId } = await auth()

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Parse request body
    const body = await req.json()
    const {
      // Personal profile
      age,
      location,
      educationalBackground,
      previousAttempts,

      // Exam & study plan
      examType,
      dailyStudyHours,
      targetDate,

      // Quiz answers
      mainChallenge,
      confidenceLevel,

      // Learning psychology
      learningStyle,
      studyEnvironment,
      peakProductivityTime,
      selfDisciplineLevel,

      // Mental wellness
      stressLevel,
      examAnxietyLevel,
      burnoutHistory,
      copingMechanisms,
      familySupportLevel,
      hasPeerStudyGroup,
      hasMentor,
      motivationalDrivers,
      goalOrientation,
    } = body

    // Validate required fields
    if (!examType || !dailyStudyHours || !targetDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: examType, dailyStudyHours, targetDate' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const supabase = createServerClient()

    // Get exam ID from exam type
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .select('id, name')
      .eq('name', examType)
      .single()

    if (examError || !exam) {
      return new Response(JSON.stringify({ error: 'Invalid exam type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get user record from Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Update user with comprehensive onboarding data
    const { error: updateError } = await supabase
      .from('users')
      .update({
        // Personal profile
        age: age || null,
        location: location || null,
        educational_background: educationalBackground || null,
        previous_attempts: previousAttempts || 0,

        // Exam & study plan
        selected_exam_id: exam.id,
        exam_date: targetDate,
        daily_study_hours: dailyStudyHours,

        // Quiz answers
        main_challenge: mainChallenge || null,
        confidence_level: confidenceLevel || null,
        preparation_level: confidenceLevel ? `${confidenceLevel}/10` : null,

        // Learning psychology
        learning_style: learningStyle || null,
        study_environment: studyEnvironment || null,
        peak_productivity_time: peakProductivityTime || null,
        self_discipline_level: selfDisciplineLevel || null,

        // Mental wellness
        stress_level: stressLevel || null,
        exam_anxiety_level: examAnxietyLevel || null,
        burnout_history: burnoutHistory || false,
        coping_mechanisms: copingMechanisms || [],
        family_support_level: familySupportLevel || null,
        has_peer_study_group: hasPeerStudyGroup || false,
        has_mentor: hasMentor || false,
        motivational_drivers: motivationalDrivers || [],
        goal_orientation: goalOrientation || null,

        // Completion flag
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('clerk_id', userId)

    if (updateError) {
      console.error('Error updating user:', updateError)
      return new Response(JSON.stringify({ error: 'Failed to update user data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create study plan with comprehensive metadata
    const { data: studyPlan, error: studyPlanError } = await supabase
      .from('study_plans')
      .insert({
        user_id: user.id,
        exam_id: exam.id,
        start_date: new Date().toISOString(),
        end_date: targetDate,
        daily_tasks: {
          dailyHours: dailyStudyHours,
          mainChallenge: mainChallenge || null,
          confidenceLevel: confidenceLevel || null,

          // Include psychology & wellness data for AI-powered plan generation
          learningStyle,
          studyEnvironment,
          peakProductivityTime,
          selfDisciplineLevel,
          stressLevel,
          examAnxietyLevel,
          burnoutHistory,
          copingMechanisms,
          motivationalDrivers,
          goalOrientation,
        },
      })
      .select()
      .single()

    if (studyPlanError) {
      console.error('Error creating study plan:', studyPlanError)
      return new Response(JSON.stringify({ error: 'Failed to create study plan' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Initialize streak for user
    const { error: streakError } = await supabase
      .from('streaks')
      .upsert(
        {
          user_id: user.id,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        }
      )

    if (streakError) {
      console.error('Error initializing streak:', streakError)
      // Don't fail the request if streak creation fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        studyPlan,
        message: 'Study plan created successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in study-plans API:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
