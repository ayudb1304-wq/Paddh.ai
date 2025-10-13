# Phase 1: Data Layer Setup - Complete Guide

## ✅ What We've Built

Phase 1 is now complete with the following infrastructure:

### **1. Supabase Client & Utilities**
- ✅ Browser client ([lib/supabase/client.ts](lib/supabase/client.ts))
- ✅ Server client with service role
- ✅ Comprehensive query functions ([lib/supabase/queries.ts](lib/supabase/queries.ts))
- ✅ Server utilities for auth ([lib/supabase/server-utils.ts](lib/supabase/server-utils.ts))

### **2. API Infrastructure**
- ✅ Response helpers ([lib/api/response.ts](lib/api/response.ts))
- ✅ Authentication middleware ([lib/api/middleware.ts](lib/api/middleware.ts))
- ✅ Premium feature gating

### **3. Clerk-Supabase Sync**
- ✅ Webhook endpoint ([app/api/webhooks/clerk/route.ts](app/api/webhooks/clerk/route.ts))
- ✅ Automatic user creation on signup
- ✅ User profile updates
- ✅ User deletion handling

---

## 🔧 Setup Steps (To Complete)

### **Step 1: Update Supabase Credentials**

You mentioned you've already added the credentials in `.env.local`. Please ensure you have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get these from: [https://app.supabase.com/project/_/settings/api](https://app.supabase.com/project/_/settings/api)

### **Step 2: Configure Clerk Webhook**

1. **Go to Clerk Dashboard:**
   - Visit: [https://dashboard.clerk.com/last-active?path=webhooks](https://dashboard.clerk.com/last-active?path=webhooks)

2. **Create a New Webhook:**
   - Click "+ Add Endpoint"

3. **Configure Endpoint URL:**
   ```
   https://your-domain.vercel.app/api/webhooks/clerk
   ```

   For local development, you'll need to use a tunnel service like ngrok:
   ```bash
   # Install ngrok (if not already installed)
   # Then run:
   ngrok http 3000

   # Use the ngrok URL:
   https://abc123.ngrok.io/api/webhooks/clerk
   ```

4. **Select Events to Listen To:**
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`

5. **Copy the Signing Secret:**
   - After creating the webhook, Clerk will show you a "Signing Secret"
   - It looks like: `whsec_...`
   - Add it to your `.env.local`:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

6. **Save the Webhook**

### **Step 3: Restart Your Development Server**

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
npm run dev
```

---

## 🧪 Testing the Integration

### **Test 1: Database Connection**

Create a test API route to verify Supabase connection:

Create `app/api/test/db/route.ts`:

```typescript
import { getAllExams } from '@/lib/supabase/queries'
import { successResponse, serverErrorResponse } from '@/lib/api/response'

export async function GET() {
  try {
    const exams = await getAllExams()
    return successResponse({
      message: 'Database connection successful!',
      exams
    })
  } catch (error) {
    return serverErrorResponse('Database connection failed', error)
  }
}
```

Then visit: `http://localhost:3000/api/test/db`

You should see:
```json
{
  "success": true,
  "data": {
    "message": "Database connection successful!",
    "exams": [
      { "id": "...", "name": "UPSC", ... },
      { "id": "...", "name": "JEE", ... },
      { "id": "...", "name": "NEET", ... }
    ]
  }
}
```

### **Test 2: User Sync**

1. **Sign out** of your current account (if logged in)
2. **Create a new account** using the sign-up page
3. **Check Clerk Dashboard webhook logs:**
   - Go to: https://dashboard.clerk.com/last-active?path=webhooks
   - Click on your webhook
   - Check "Logs" tab - you should see successful `user.created` events

4. **Verify in Supabase:**
   - Go to: https://app.supabase.com/project/_/editor
   - Select the `users` table
   - You should see your new user with:
     - `clerk_id` matching your Clerk user ID
     - `email`, `first_name`, `last_name` populated
     - `onboarding_completed = false`
     - `subscription_tier = 'FREE'`

### **Test 3: User Retrieval**

Create `app/api/test/me/route.ts`:

```typescript
import { withAuth } from '@/lib/api/middleware'
import { successResponse } from '@/lib/api/response'

export async function GET() {
  const authResult = await withAuth()

  if ('error' in authResult) {
    return authResult.error
  }

  return successResponse({
    message: 'Successfully retrieved user',
    user: authResult.user
  })
}
```

Then visit: `http://localhost:3000/api/test/me` (while logged in)

You should see your user data from Supabase.

---

## 📚 Available Helper Functions

### **Authentication Helpers**

```typescript
import { getCurrentUser, requireAuth, hasCompletedOnboarding, isPremiumUser } from '@/lib/supabase/server-utils'

// Get current user (returns null if not logged in)
const user = await getCurrentUser()

// Require authentication (throws error if not logged in)
const user = await requireAuth()

// Check onboarding status
const hasOnboarded = await hasCompletedOnboarding()

// Check premium status
const hasPremium = await isPremiumUser()
```

### **API Middleware**

```typescript
import { withAuth, withPremium } from '@/lib/api/middleware'

export async function GET() {
  // Require authentication
  const authResult = await withAuth()
  if ('error' in authResult) return authResult.error

  const { user } = authResult

  // Your logic here...
}

export async function POST() {
  // Require premium subscription
  const premiumResult = await withPremium()
  if ('error' in premiumResult) return premiumResult.error

  const { user } = premiumResult

  // Premium feature logic...
}
```

### **Database Queries**

```typescript
import {
  getAllExams,
  getExamByName,
  getSubjectsByExamId,
  getUserByClerkId,
  getFlashcardsByUserId,
  getDueFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getUserStats
} from '@/lib/supabase/queries'

// Example: Get all exams
const exams = await getAllExams()

// Example: Get user's flashcards
const flashcards = await getFlashcardsByUserId(user.id)

// Example: Get due flashcards
const dueCards = await getDueFlashcards(user.id)

// Example: Get user stats
const stats = await getUserStats(user.id)
// Returns: { totalFlashcards, dueFlashcards, reviewsToday }
```

---

## 🚀 What's Next?

With Phase 1 complete, you now have:
- ✅ Full database connectivity
- ✅ User authentication & sync
- ✅ API infrastructure ready
- ✅ Helper functions for all common operations

**Next Steps:**
1. Test the integration using the test routes above
2. Verify webhook is working by creating a new user
3. Move to **Phase 2: Onboarding Flow**
   - Build exam selection page
   - Create profile setup
   - Generate study plans

---

## 🐛 Troubleshooting

### **Issue: "Missing Supabase environment variables"**
- Check that you've added all three Supabase env vars to `.env.local`
- Restart the dev server after adding env vars

### **Issue: "Missing CLERK_WEBHOOK_SECRET"**
- Make sure you've created the webhook in Clerk dashboard
- Copy the "Signing Secret" to your `.env.local`
- Restart the dev server

### **Issue: Webhook not firing**
- For local development, you need ngrok or similar tunnel
- Make sure the webhook URL in Clerk points to your ngrok URL + `/api/webhooks/clerk`
- Check that you selected the correct events (`user.created`, `user.updated`, `user.deleted`)

### **Issue: RLS Policy Errors**
- Check that you're using the correct Clerk JWT in Supabase
- Verify that RLS policies are enabled and created correctly
- For testing, you can temporarily disable RLS on a table (not recommended for production)

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Check Supabase logs: https://app.supabase.com/project/_/logs/explorer
4. Check Clerk webhook logs: https://dashboard.clerk.com/last-active?path=webhooks

---

**Phase 1 Status: ✅ COMPLETE**
**Ready for Phase 2: Onboarding Flow**
