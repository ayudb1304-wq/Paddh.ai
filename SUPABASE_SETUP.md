# Supabase Setup Guide for Padh.ai

## Step 1: Create Supabase Account & Project

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Sign up** with GitHub (recommended) or email
3. **Create a new project**:
   - Project Name: `padh-ai` or `padhai-prod`
   - Database Password: (Generate a strong password and save it securely)
   - Region: Choose closest to your users (e.g., `ap-south-1` for Mumbai, India)
   - Pricing Plan: Start with **Free tier** (includes 500MB database, 1GB file storage)

4. **Wait 2-3 minutes** for project to be provisioned

5. **Get your credentials** from Project Settings → API:
   - Project URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - Project API Key (`anon` public key)
   - Service Role Key (secret - for admin operations)

## Step 2: Save Credentials

Add to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Existing Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 3: Database Schema

We'll create tables in the following order (respecting foreign key dependencies):

### Tables Overview:
1. **exams** - Exam metadata (UPSC, JEE, NEET)
2. **subjects** - Subjects within each exam
3. **topics** - Topics within subjects
4. **users** - User profiles (synced with Clerk)
5. **study_plans** - User study plans
6. **flashcards** - Study flashcards
7. **reviews** - Review history (SRS tracking)
8. **quiz_attempts** - Quiz results
9. **journal_entries** - Daily reflections
10. **streaks** - Streak tracking
11. **subscriptions** - Premium subscriptions

### SQL Schema (Run in Supabase SQL Editor)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Exams table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Subjects table
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  weightage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(exam_id, name)
);

-- 3. Topics table
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(subject_id, name)
);

-- 4. Users table (synced with Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  subscription_tier VARCHAR(20) DEFAULT 'FREE',
  selected_exam_id UUID REFERENCES exams(id),
  exam_date DATE,
  daily_study_hours INTEGER DEFAULT 4,
  preparation_level VARCHAR(20) DEFAULT 'BEGINNER',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Study Plans table
CREATE TABLE study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES exams(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  daily_tasks JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Flashcards table
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  tags TEXT[],
  source VARCHAR(20) DEFAULT 'MANUAL', -- MANUAL or AI_GENERATED
  ease_factor DECIMAL(3,2) DEFAULT 2.50,
  interval INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  quality INTEGER NOT NULL CHECK (quality >= 0 AND quality <= 5),
  time_spent INTEGER, -- in seconds
  reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Quiz Attempts table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  score INTEGER NOT NULL,
  total_cards INTEGER NOT NULL,
  time_spent INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Journal Entries table
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mood VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Streaks table
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(20) NOT NULL, -- FREE or CORE_PASS
  status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, CANCELLED, EXPIRED
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  razorpay_subscription_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_subjects_exam_id ON subjects(exam_id);
CREATE INDEX idx_topics_subject_id ON topics(subject_id);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX idx_flashcards_next_review ON flashcards(next_review_date);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_flashcard_id ON reviews(flashcard_id);
CREATE INDEX idx_study_plans_user_id ON study_plans(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_plans_updated_at BEFORE UPDATE ON study_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at BEFORE UPDATE ON streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Step 4: Row Level Security (RLS)

Enable RLS to ensure users can only access their own data:

```sql
-- Enable RLS on all user-specific tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (clerk_id = auth.jwt() ->> 'sub');

-- Study Plans policies
CREATE POLICY "Users can view own study plans"
  ON study_plans FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can create own study plans"
  ON study_plans FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own study plans"
  ON study_plans FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Flashcards policies
CREATE POLICY "Users can view own flashcards"
  ON flashcards FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can create own flashcards"
  ON flashcards FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own flashcards"
  ON flashcards FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can delete own flashcards"
  ON flashcards FOR DELETE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Reviews policies
CREATE POLICY "Users can view own reviews"
  ON reviews FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can create own reviews"
  ON reviews FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Quiz Attempts policies
CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can create own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Journal Entries policies
CREATE POLICY "Users can view own journal entries"
  ON journal_entries FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can create own journal entries"
  ON journal_entries FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Streaks policies
CREATE POLICY "Users can view own streaks"
  ON streaks FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own streaks"
  ON streaks FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'));

-- Public read access for exam metadata (exams, subjects, topics)
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exams"
  ON exams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view topics"
  ON topics FOR SELECT
  TO authenticated
  USING (true);
```

## Step 5: Seed Exam Data

```sql
-- Seed Exams
INSERT INTO exams (name, full_name, description) VALUES
('UPSC', 'Union Public Service Commission', 'Civil Services Examination for IAS, IPS, IFS'),
('JEE', 'Joint Entrance Examination', 'Engineering entrance for IITs, NITs, IIITs'),
('NEET', 'National Eligibility cum Entrance Test', 'Medical entrance for MBBS, BDS');

-- Get exam IDs for reference
DO $$
DECLARE
  upsc_id UUID;
  jee_id UUID;
  neet_id UUID;
  physics_sub UUID;
  chemistry_sub UUID;
  biology_sub UUID;
BEGIN
  -- Get exam IDs
  SELECT id INTO upsc_id FROM exams WHERE name = 'UPSC';
  SELECT id INTO jee_id FROM exams WHERE name = 'JEE';
  SELECT id INTO neet_id FROM exams WHERE name = 'NEET';

  -- UPSC Subjects
  INSERT INTO subjects (exam_id, name, weightage) VALUES
  (upsc_id, 'History', 100),
  (upsc_id, 'Geography', 100),
  (upsc_id, 'Polity', 150),
  (upsc_id, 'Economy', 100),
  (upsc_id, 'Environment & Ecology', 75),
  (upsc_id, 'Science & Technology', 75),
  (upsc_id, 'Current Affairs', 100);

  -- UPSC Topics (sample - add more as needed)
  INSERT INTO topics (subject_id, name)
  SELECT id, topic_name FROM subjects, unnest(ARRAY[
    'Ancient India', 'Medieval India', 'Modern India', 'World History'
  ]) AS topic_name WHERE name = 'History' AND exam_id = upsc_id;

  INSERT INTO topics (subject_id, name)
  SELECT id, topic_name FROM subjects, unnest(ARRAY[
    'Physical Geography', 'Indian Geography', 'World Geography', 'Economic Geography'
  ]) AS topic_name WHERE name = 'Geography' AND exam_id = upsc_id;

  INSERT INTO topics (subject_id, name)
  SELECT id, topic_name FROM subjects, unnest(ARRAY[
    'Indian Constitution', 'Union Government', 'State Government', 'Local Governance', 'Fundamental Rights'
  ]) AS topic_name WHERE name = 'Polity' AND exam_id = upsc_id;

  -- JEE Subjects
  INSERT INTO subjects (exam_id, name, weightage) VALUES
  (jee_id, 'Physics', 100),
  (jee_id, 'Chemistry', 100),
  (jee_id, 'Mathematics', 100);

  -- JEE Physics Topics
  SELECT id INTO physics_sub FROM subjects WHERE name = 'Physics' AND exam_id = jee_id;
  INSERT INTO topics (subject_id, name) VALUES
  (physics_sub, 'Mechanics'),
  (physics_sub, 'Thermodynamics'),
  (physics_sub, 'Electromagnetism'),
  (physics_sub, 'Optics'),
  (physics_sub, 'Modern Physics');

  -- JEE Chemistry Topics
  SELECT id INTO chemistry_sub FROM subjects WHERE name = 'Chemistry' AND exam_id = jee_id;
  INSERT INTO topics (subject_id, name) VALUES
  (chemistry_sub, 'Physical Chemistry'),
  (chemistry_sub, 'Organic Chemistry'),
  (chemistry_sub, 'Inorganic Chemistry');

  -- JEE Mathematics Topics
  INSERT INTO topics (subject_id, name)
  SELECT id, topic_name FROM subjects, unnest(ARRAY[
    'Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Vectors & 3D Geometry'
  ]) AS topic_name WHERE name = 'Mathematics' AND exam_id = jee_id;

  -- NEET Subjects
  INSERT INTO subjects (exam_id, name, weightage) VALUES
  (neet_id, 'Physics', 45),
  (neet_id, 'Chemistry', 45),
  (neet_id, 'Biology', 90);

  -- NEET Physics Topics
  SELECT id INTO physics_sub FROM subjects WHERE name = 'Physics' AND exam_id = neet_id;
  INSERT INTO topics (subject_id, name) VALUES
  (physics_sub, 'Mechanics'),
  (physics_sub, 'Thermodynamics'),
  (physics_sub, 'Electrostatics'),
  (physics_sub, 'Optics');

  -- NEET Chemistry Topics
  SELECT id INTO chemistry_sub FROM subjects WHERE name = 'Chemistry' AND exam_id = neet_id;
  INSERT INTO topics (subject_id, name) VALUES
  (chemistry_sub, 'Physical Chemistry'),
  (chemistry_sub, 'Organic Chemistry'),
  (chemistry_sub, 'Inorganic Chemistry');

  -- NEET Biology Topics
  SELECT id INTO biology_sub FROM subjects WHERE name = 'Biology' AND exam_id = neet_id;
  INSERT INTO topics (subject_id, name) VALUES
  (biology_sub, 'Diversity of Living Organisms'),
  (biology_sub, 'Plant Physiology'),
  (biology_sub, 'Human Physiology'),
  (biology_sub, 'Genetics & Evolution'),
  (biology_sub, 'Ecology & Environment');
END $$;
```

## Next Steps

After completing the Supabase setup:

1. Install the Supabase client library
2. Create utility functions for database operations
3. Implement Clerk webhook to sync users
4. Start building the onboarding flow

Your Supabase dashboard will be at: `https://app.supabase.com/project/YOUR_PROJECT_ID`
