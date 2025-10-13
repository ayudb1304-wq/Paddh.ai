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
          selected_exam_id: string | null
          exam_date: string | null
          daily_study_hours: number
          preparation_level: string
          onboarding_completed: boolean
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
          selected_exam_id?: string | null
          exam_date?: string | null
          daily_study_hours?: number
          preparation_level?: string
          onboarding_completed?: boolean
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
          selected_exam_id?: string | null
          exam_date?: string | null
          daily_study_hours?: number
          preparation_level?: string
          onboarding_completed?: boolean
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
