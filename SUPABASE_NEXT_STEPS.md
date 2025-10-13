# Supabase Implementation - Next Steps

## ✅ Completed Setup

1. **Installed Supabase Client** ✅
   - Package: `@supabase/supabase-js`
   - Added to project dependencies

2. **Environment Variables Added** ✅
   - `.env.local` updated with Supabase placeholders
   - Ready for your actual credentials

3. **Supabase Client Utilities Created** ✅
   - `lib/supabase/client.ts` - Client initialization
   - `lib/supabase/queries.ts` - Database query functions
   - `types/database.ts` - TypeScript type definitions

4. **Comprehensive Documentation** ✅
   - `SUPABASE_SETUP.md` - Complete setup guide with SQL schemas

## 🔄 Your Next Steps (Manual Actions Required)

### Step 1: Create Supabase Project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Sign in
3. Click "New Project"
4. Fill in:
   - **Name**: `padh-ai` or `padhai-prod`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: `ap-south-1` (Mumbai) or closest to you
   - **Pricing**: Free tier
5. Wait 2-3 minutes for provisioning

### Step 2: Get Your Credentials (2 minutes)

1. In your Supabase project dashboard, go to:
   **Project Settings** → **API**

2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **Project API Key (anon public)**: `eyJhbGciOiJ...`
   - **Service Role Key**: `eyJhbGciOiJ...` (scroll down, keep secret!)

3. Update your `.env.local` file with the actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your_service_role_key
   ```

### Step 3: Run Database Setup (10 minutes)

1. In your Supabase dashboard, go to **SQL Editor**

2. Click **"New Query"**

3. **Copy and paste** the entire SQL schema from `SUPABASE_SETUP.md` (Step 3: Database Schema)
   - This creates all 11 tables
   - Sets up indexes
   - Adds triggers

4. Click **"Run"** to execute

5. Verify in **Table Editor** that all tables were created:
   - exams
   - subjects
   - topics
   - users
   - study_plans
   - flashcards
   - reviews
   - quiz_attempts
   - journal_entries
   - streaks
   - subscriptions

### Step 4: Set Up Row Level Security (5 minutes)

1. In **SQL Editor**, create another new query

2. **Copy and paste** the entire RLS policies section from `SUPABASE_SETUP.md` (Step 4: Row Level Security)

3. Click **"Run"** to execute

4. Verify in **Authentication** → **Policies** that policies exist for each table

### Step 5: Seed Exam Data (3 minutes)

1. In **SQL Editor**, create another new query

2. **Copy and paste** the seed data SQL from `SUPABASE_SETUP.md` (Step 5: Seed Exam Data)

3. Click **"Run"** to execute

4. Verify in **Table Editor**:
   - Open `exams` table - should see 3 rows (UPSC, JEE, NEET)
   - Open `subjects` table - should see 13 rows
   - Open `topics` table - should see 30+ rows

### Step 6: Restart Dev Server (1 minute)

After updating `.env.local` with your credentials:

```bash
# Stop the current dev server (Ctrl+C in terminal)
# Restart it:
npm run dev
```

The server needs to restart to pick up the new environment variables.

### Step 7: Test Database Connection (Optional)

Create a test API route to verify connectivity:

**File**: `app/api/test-db/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { getAllExams } from '@/lib/supabase/queries'

export async function GET() {
  try {
    const exams = await getAllExams()
    return NextResponse.json({ success: true, exams })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
```

Then visit: `http://localhost:3004/api/test-db`

Expected response:
```json
{
  "success": true,
  "exams": [
    {"id": "...", "name": "JEE", "full_name": "Joint Entrance Examination", ...},
    {"id": "...", "name": "NEET", "full_name": "National Eligibility cum Entrance Test", ...},
    {"id": "...", "name": "UPSC", "full_name": "Union Public Service Commission", ...}
  ]
}
```

## 📋 What We Can Build Next (After Supabase is Live)

Once your Supabase database is set up with credentials, we can immediately build:

### 1. User Sync with Clerk (HIGH PRIORITY)
Create a webhook to sync Clerk users to Supabase `users` table:
- When user signs up in Clerk → create record in Supabase
- Stores: clerk_id, email, first_name, last_name

### 2. Onboarding Flow
- Exam selection page (fetch from `exams` table)
- Store user's selected exam in `users.selected_exam_id`
- Generate study plan in `study_plans` table

### 3. Flashcard CRUD
- Create flashcard form
- Save to `flashcards` table
- List view with filters

### 4. Dashboard Stats (Real Data)
Replace placeholder "0" values with actual counts:
- Total flashcards from database
- Due flashcards count
- Current streak from `streaks` table

## 🚨 Important Notes

1. **Keep Service Role Key Secret**: Never expose in client-side code
2. **RLS is Critical**: Don't disable it - it ensures users can only access their own data
3. **Free Tier Limits**:
   - 500MB database
   - 1GB file storage
   - 2GB bandwidth/month
   - Unlimited API requests
4. **Backup Your SQL**: Keep copies of your schema and seed data

## 💡 Quick Commands

```bash
# Install Supabase client (already done)
npm install @supabase/supabase-js

# Check if env variables are loaded
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"

# Restart dev server
npm run dev
```

## 📚 Resources

- Supabase Dashboard: https://app.supabase.com
- Supabase Docs: https://supabase.com/docs
- JavaScript Client Docs: https://supabase.com/docs/reference/javascript
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security

---

**Once you complete these steps, ping me and we'll build the onboarding flow together!** 🚀
