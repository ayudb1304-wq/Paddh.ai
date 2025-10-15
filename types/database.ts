export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exams: {
        Row: {
          id: string
          name: string
          full_name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          full_name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          full_name?: string
          description?: string | null
          created_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          exam_id: string
          name: string
          weightage: number
          created_at: string
        }
        Insert: {
          id?: string
          exam_id: string
          name: string
          weightage?: number
          created_at?: string
        }
        Update: {
          id?: string
          exam_id?: string
          name?: string
          weightage?: number
          created_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          subject_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          name?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          first_name: string | null
          last_name: string | null
          subscription_tier: string

          // Basic onboarding
          onboarding_completed: boolean
          selected_exam_id: string | null
          exam_date: string | null
          daily_study_hours: number
          preparation_level: string
          main_challenge: string | null
          confidence_level: number | null

          // Personal information
          age: number | null
          location: string | null
          educational_background: string | null
          previous_attempts: number | null

          // Multiple confusing topics

          // Learning style & preferences
          learning_style: string | null  // visual, auditory, reading_writing, kinesthetic
          study_environment: string | null  // quiet, background_music, study_group, cafe
          peak_productivity_time: string | null  // early_morning, morning, afternoon, evening, night, late_night
          preferred_study_duration: number | null  // in minutes

          // Psychology & mental state
          self_discipline_level: number | null  // 1-10
          procrastination_triggers: string[]
          stress_level: number | null  // 1-10
          exam_anxiety_level: number | null  // 1-10
          burnout_history: boolean
          current_stress_factors: string[]

          // Coping & wellness
          coping_mechanisms: string[]
          exercise_frequency: string | null  // daily, weekly, rarely, never
          sleep_quality: number | null  // 1-10
          meditation_practice: boolean

          // Motivation & goals
          motivational_drivers: string[]
          goal_orientation: string | null  // mastery, performance, balanced
          preferred_feedback_style: string | null  // encouraging, direct, analytical, balanced
          intrinsic_motivation: number | null  // 1-10
          extrinsic_motivation: number | null  // 1-10

          // Support system
          family_support_level: number | null  // 1-10
          has_peer_study_group: boolean
          has_mentor: boolean
          social_support_level: number | null  // 1-10

          // Study habits & patterns
          consistency_level: number | null  // 1-10
          distraction_level: number | null  // 1-10
          notes_taking_method: string | null
          revision_frequency: string | null

          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          subscription_tier?: string

          // Basic onboarding
          onboarding_completed?: boolean
          selected_exam_id?: string | null
          exam_date?: string | null
          daily_study_hours?: number
          preparation_level?: string
          main_challenge?: string | null
          confidence_level?: number | null

          // Personal information
          age?: number | null
          location?: string | null
          educational_background?: string | null
          previous_attempts?: number | null

          // Multiple confusing topics

          // Learning style & preferences
          learning_style?: string | null
          study_environment?: string | null
          peak_productivity_time?: string | null
          preferred_study_duration?: number | null

          // Psychology & mental state
          self_discipline_level?: number | null
          procrastination_triggers?: string[]
          stress_level?: number | null
          exam_anxiety_level?: number | null
          burnout_history?: boolean
          current_stress_factors?: string[]

          // Coping & wellness
          coping_mechanisms?: string[]
          exercise_frequency?: string | null
          sleep_quality?: number | null
          meditation_practice?: boolean

          // Motivation & goals
          motivational_drivers?: string[]
          goal_orientation?: string | null
          preferred_feedback_style?: string | null
          intrinsic_motivation?: number | null
          extrinsic_motivation?: number | null

          // Support system
          family_support_level?: number | null
          has_peer_study_group?: boolean
          has_mentor?: boolean
          social_support_level?: number | null

          // Study habits & patterns
          consistency_level?: number | null
          distraction_level?: number | null
          notes_taking_method?: string | null
          revision_frequency?: string | null

          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          subscription_tier?: string

          // Basic onboarding
          onboarding_completed?: boolean
          selected_exam_id?: string | null
          exam_date?: string | null
          daily_study_hours?: number
          preparation_level?: string
          main_challenge?: string | null
          confidence_level?: number | null

          // Personal information
          age?: number | null
          location?: string | null
          educational_background?: string | null
          previous_attempts?: number | null

          // Multiple confusing topics

          // Learning style & preferences
          learning_style?: string | null
          study_environment?: string | null
          peak_productivity_time?: string | null
          preferred_study_duration?: number | null

          // Psychology & mental state
          self_discipline_level?: number | null
          procrastination_triggers?: string[]
          stress_level?: number | null
          exam_anxiety_level?: number | null
          burnout_history?: boolean
          current_stress_factors?: string[]

          // Coping & wellness
          coping_mechanisms?: string[]
          exercise_frequency?: string | null
          sleep_quality?: number | null
          meditation_practice?: boolean

          // Motivation & goals
          motivational_drivers?: string[]
          goal_orientation?: string | null
          preferred_feedback_style?: string | null
          intrinsic_motivation?: number | null
          extrinsic_motivation?: number | null

          // Support system
          family_support_level?: number | null
          has_peer_study_group?: boolean
          has_mentor?: boolean
          social_support_level?: number | null

          // Study habits & patterns
          consistency_level?: number | null
          distraction_level?: number | null
          notes_taking_method?: string | null
          revision_frequency?: string | null

          created_at?: string
          updated_at?: string
        }
      }
      study_plans: {
        Row: {
          id: string
          user_id: string
          exam_id: string
          start_date: string
          end_date: string
          daily_tasks: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exam_id: string
          start_date: string
          end_date: string
          daily_tasks?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exam_id?: string
          start_date?: string
          end_date?: string
          daily_tasks?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          topic_id: string | null
          front: string
          back: string
          tags: string[] | null
          source: string
          ease_factor: number
          interval: number
          repetitions: number
          next_review_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          topic_id?: string | null
          front: string
          back: string
          tags?: string[] | null
          source?: string
          ease_factor?: number
          interval?: number
          repetitions?: number
          next_review_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          topic_id?: string | null
          front?: string
          back?: string
          tags?: string[] | null
          source?: string
          ease_factor?: number
          interval?: number
          repetitions?: number
          next_review_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          flashcard_id: string
          quality: number
          time_spent: number | null
          reviewed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flashcard_id: string
          quality: number
          time_spent?: number | null
          reviewed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          flashcard_id?: string
          quality?: number
          time_spent?: number | null
          reviewed_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          score: number
          total_cards: number
          time_spent: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          score: number
          total_cards: number
          time_spent?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          score?: number
          total_cards?: number
          time_spent?: number | null
          created_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          content: string
          mood: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          mood?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          mood?: string | null
          created_at?: string
        }
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: string
          status: string
          start_date: string
          end_date: string | null
          razorpay_subscription_id: string | null
          razorpay_payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: string
          status?: string
          start_date?: string
          end_date?: string | null
          razorpay_subscription_id?: string | null
          razorpay_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: string
          status?: string
          start_date?: string
          end_date?: string | null
          razorpay_subscription_id?: string | null
          razorpay_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
