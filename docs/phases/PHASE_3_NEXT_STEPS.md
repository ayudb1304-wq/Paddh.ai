# Phase 3: Next Implementation Steps

## Current Status ✅
- ✅ Authentication with Clerk fully integrated
- ✅ Landing page with emotional narrative complete
- ✅ Theme switching with light/dark modes (Focused Day / Soothing Night)
- ✅ All colors refactored to semantic tokens
- ✅ Dashboard placeholder ready

## Next Phase: Core Functionality Implementation

### Priority 1: Multi-Exam Onboarding System (HIGH PRIORITY)
**Objective:** Allow users to select their target exam and generate personalized study plans

#### Tasks:
1. **Create Exam Selection Page** (`/onboarding/exam-selection`)
   - Card-based UI for UPSC, JEE, NEET selection
   - Display exam-specific information (dates, subjects, difficulty)
   - Store selection in database (Supabase/PostgreSQL)

2. **Target Date & Current Level Assessment**
   - Calendar picker for exam target date
   - Self-assessment questionnaire (Current preparation level: Beginner/Intermediate/Advanced)
   - Time availability per day (hours)
   - Store user profile data

3. **Generate AI Study Plan**
   - Create day-by-day study schedule based on:
     - Time until exam
     - Daily availability
     - Current level
     - Exam syllabus (predefined for each exam)
   - Use OpenAI API to generate personalized recommendations
   - Display plan in calendar/timeline view

4. **Database Schema Setup**
   ```sql
   -- Users table extension
   ALTER TABLE users ADD COLUMN selected_exam VARCHAR(20);
   ALTER TABLE users ADD COLUMN exam_date DATE;
   ALTER TABLE users ADD COLUMN daily_study_hours INTEGER;
   ALTER TABLE users ADD COLUMN preparation_level VARCHAR(20);

   -- Study plans table
   CREATE TABLE study_plans (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     exam_type VARCHAR(20),
     start_date DATE,
     end_date DATE,
     daily_tasks JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

---

### Priority 2: Flashcard System (CORE FEATURE)
**Objective:** Allow users to create, review, and manage flashcards with SRS algorithm

#### Tasks:
1. **Create Flashcard Page** (`/dashboard/flashcards`)
   - List view of all flashcards (filterable by subject/topic)
   - Search functionality
   - Stats: Total cards, Due today, Mastered, Learning

2. **Manual Flashcard Creation**
   - Simple form: Front (question) + Back (answer)
   - Optional: Add tags, subject, difficulty level
   - Rich text editor support (markdown or WYSIWYG)

3. **Spaced Repetition Algorithm (SRS)**
   - Implement SM-2 algorithm (SuperMemo 2)
   - Track: ease factor, interval, repetitions, next review date
   - Database schema:
   ```sql
   CREATE TABLE flashcards (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     front TEXT NOT NULL,
     back TEXT NOT NULL,
     tags TEXT[],
     subject VARCHAR(100),
     ease_factor DECIMAL DEFAULT 2.5,
     interval INTEGER DEFAULT 1,
     repetitions INTEGER DEFAULT 0,
     next_review_date TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE review_sessions (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     flashcard_id UUID REFERENCES flashcards(id),
     quality INTEGER, -- 0-5 rating
     reviewed_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Review Interface**
   - Show flashcard front
   - "Show Answer" button reveals back
   - Self-grade buttons: Again, Hard, Good, Easy
   - Update SRS values based on rating
   - Track daily review streak

---

### Priority 3: AI Flashcard Generator (Premium Feature)
**Objective:** Auto-generate flashcards from uploaded PDFs/text using AI

#### Tasks:
1. **File Upload Interface**
   - PDF upload functionality
   - Text paste area
   - File size limits (e.g., 10MB)

2. **AI Processing Pipeline**
   - Extract text from PDF (use pdf-parse or similar)
   - Send to OpenAI API with prompt:
     ```
     "Extract key concepts from this text and create question-answer flashcard pairs.
     Format as JSON array: [{front: 'question', back: 'answer'}]"
     ```
   - Parse AI response and create flashcards in bulk

3. **Review & Edit Generated Cards**
   - Show all generated cards in preview
   - Allow user to edit/delete before saving
   - Bulk actions: Select all, Delete selected, Save all

4. **Database Integration**
   - Store generated cards with metadata (source: 'AI', uploaded_file_name)
   - Link to user's study plan if applicable

---

### Priority 4: Analytics & Progress Tracking
**Objective:** Visualize user's study progress and retention rates

#### Tasks:
1. **Dashboard Stats**
   - Cards reviewed today/this week
   - Review streak (consecutive days)
   - Retention rate (% of cards remembered)
   - Time spent studying

2. **Charts & Visualizations**
   - Line chart: Reviews over time
   - Bar chart: Cards by subject/topic
   - Pie chart: Card distribution (New, Learning, Mastered)
   - Heatmap: Study activity calendar

3. **Subject-Level Analytics**
   - Breakdown by subject (e.g., Polity, History for UPSC)
   - Identify weak areas (low retention subjects)
   - Suggest focused review sessions

---

### Priority 5: Metacognitive Journal (Unique Feature)
**Objective:** Help users reflect on their learning process

#### Tasks:
1. **Daily Journal Prompts**
   - "What did you learn today?"
   - "What was challenging?"
   - "What study strategies worked well?"
   - Optional daily notes with rich text

2. **Streak & Habit Building**
   - Track consecutive days of journaling
   - Gamification: Badges for 7-day, 30-day, 100-day streaks
   - Motivational quotes/tips

3. **Review Past Entries**
   - Timeline view of all journal entries
   - Search by date or keyword
   - Sentiment analysis (optional): Track mood over time

---

## Technical Stack Recommendations

### Frontend
- ✅ Next.js 14 (already in use)
- ✅ React 19 (already in use)
- ✅ Tailwind CSS v4 (already in use)
- ✅ Framer Motion (already in use)
- 📦 Recharts / Chart.js - For analytics visualizations
- 📦 react-markdown - For flashcard content
- 📦 react-pdf - For PDF preview

### Backend & Database
- 📦 Supabase OR PostgreSQL on Vercel
  - Real-time subscriptions for live updates
  - Row-level security for user data
  - Built-in auth integration with Clerk
- 📦 Prisma ORM (optional, for type-safe database queries)

### AI & Processing
- 📦 OpenAI API (GPT-4 Turbo or GPT-4o-mini for cost efficiency)
- 📦 pdf-parse or pdf.js - Extract text from PDFs
- 📦 LangChain (optional) - For advanced AI pipelines

### Deployment
- ✅ Vercel (current hosting)
- 📦 Vercel Postgres (for database)
- 📦 Vercel Blob Storage (for PDF uploads)

---

## Implementation Timeline (Estimated)

### Week 1-2: Onboarding & Study Plans
- [ ] Exam selection page
- [ ] User profile setup
- [ ] Basic study plan generation (static syllabus)
- [ ] Database schema setup

### Week 3-4: Flashcard Core
- [ ] Manual flashcard creation
- [ ] SRS algorithm implementation
- [ ] Review interface
- [ ] Basic analytics

### Week 5-6: AI Features
- [ ] PDF upload & parsing
- [ ] AI flashcard generation
- [ ] Batch card management
- [ ] Premium tier gating

### Week 7-8: Polish & Launch Prep
- [ ] Advanced analytics dashboard
- [ ] Metacognitive journal
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] User testing & bug fixes

---

## Immediate Next Steps (This Session)

1. **Set up Database** (Supabase recommended)
   - Create account
   - Initialize database
   - Set up tables for users, flashcards, study_plans

2. **Create Onboarding Flow**
   - Build exam selection page
   - Implement form validation
   - Store user choices

3. **Start Flashcard System**
   - Create database schema
   - Build manual card creation form
   - Implement basic list view

---

## Questions for User
1. Do you want to use Supabase (easier, real-time) or set up your own PostgreSQL?
2. Should we implement the free tier features first, or build AI features alongside?
3. Do you have an OpenAI API key already, or should we use a different AI provider?
4. What's your priority: Onboarding first or Flashcards first?

---

## Files to Create Next

1. `lib/db/` - Database connection and queries
2. `lib/ai/` - OpenAI integration utilities
3. `lib/srs/` - Spaced repetition algorithm
4. `app/onboarding/` - Onboarding flow pages
5. `app/dashboard/flashcards/` - Flashcard management
6. `app/dashboard/analytics/` - Progress tracking
7. `components/flashcards/` - Flashcard UI components
8. `types/` - TypeScript types for database models

Let me know which priority you'd like to tackle first!
