-- Enhanced Onboarding Migration
-- Run this in Supabase Dashboard -> SQL Editor
-- This adds all new columns for comprehensive student profiling

-- Add personal information
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS educational_background TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS previous_attempts INTEGER DEFAULT 0;

-- Add main_challenge if not exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS main_challenge TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS confidence_level INTEGER;

-- Add confusing topics (JSON array)
ALTER TABLE users ADD COLUMN IF NOT EXISTS confusing_topics JSONB;

-- Add learning preferences
ALTER TABLE users ADD COLUMN IF NOT EXISTS learning_style TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS study_environment TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS peak_productivity_time TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_study_duration INTEGER;

-- Add psychology & mental state
ALTER TABLE users ADD COLUMN IF NOT EXISTS self_discipline_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS procrastination_triggers TEXT[] DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS stress_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS exam_anxiety_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS burnout_history BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_stress_factors TEXT[] DEFAULT '{}';

-- Add coping & wellness
ALTER TABLE users ADD COLUMN IF NOT EXISTS coping_mechanisms TEXT[] DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS exercise_frequency TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS sleep_quality INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS meditation_practice BOOLEAN DEFAULT FALSE;

-- Add motivation & goals
ALTER TABLE users ADD COLUMN IF NOT EXISTS motivational_drivers TEXT[] DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS goal_orientation TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_feedback_style TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS intrinsic_motivation INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS extrinsic_motivation INTEGER;

-- Add support system
ALTER TABLE users ADD COLUMN IF NOT EXISTS family_support_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS has_peer_study_group BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS has_mentor BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS social_support_level INTEGER;

-- Add study habits
ALTER TABLE users ADD COLUMN IF NOT EXISTS consistency_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS distraction_level INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS notes_taking_method TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS revision_frequency TEXT;

-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_users_learning_style ON users(learning_style);
CREATE INDEX IF NOT EXISTS idx_users_goal_orientation ON users(goal_orientation);
CREATE INDEX IF NOT EXISTS idx_users_stress_level ON users(stress_level);
CREATE INDEX IF NOT EXISTS idx_users_burnout_history ON users(burnout_history);

-- Verify migration
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN (
    'age', 'location', 'confusing_topics', 'learning_style',
    'stress_level', 'goal_orientation', 'family_support_level'
  )
ORDER BY column_name;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Enhanced onboarding migration completed successfully!';
  RAISE NOTICE '📊 Added 40+ new columns to users table';
  RAISE NOTICE '🎯 Check the output above to verify columns were created';
END $$;
