# Padh.ai - Quick Reference Card

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm run start           # Run production server

# Database
npm run db:generate     # Generate Prisma Client (after schema changes)
npm run db:push         # Push schema to database
npm run db:seed         # Seed exam data (UPSC/JEE/NEET)
npm run db:studio       # Open database GUI (http://localhost:5555)

# Code Quality
npm run lint            # Run ESLint
```

## 📁 Key Directories

```
padh-ai/
├── app/                # Routes and pages
│   ├── api/           # Backend API routes
│   ├── (auth)/        # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/   # Protected dashboard pages
│   └── page.tsx       # Landing page
├── components/         # React components
├── lib/               # Business logic, utilities, DB client
├── prisma/            # Database schema and seeds
└── public/            # Static assets
```

## 🗄️ Database Models

```typescript
User → StudyPlan → Exam → Subject → Topic
User → Flashcard → Subject, Topic
User → Review → Flashcard
User → QuizAttempt
User → JournalEntry
User → Streak
User → Subscription
```

## 🔐 Environment Variables

Required for full functionality (see `.env.local`):

```bash
# Database (REQUIRED - NOT SET UP YET)
DATABASE_URL=

# Clerk Auth (✅ CONFIGURED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini (for AI flashcards - Phase 3)
GEMINI_API_KEY=

# Razorpay (for payments - Phase 4)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## 📊 Exam Types & Subjects

### UPSC (7 subjects)
History, Geography, Polity, Economy, Environment, Science & Tech, Current Affairs

### JEE (3 subjects)
Physics, Chemistry, Mathematics

### NEET (3 subjects)
Physics, Chemistry, Biology

## 🎨 Color Palette

```css
Background:    #d8e2dc
Light Accent:  #ffe5d9
Pink Accent:   #ffcad4
Strong Pink:   #f4acb7
Text/Dark:     #9d8189
Text Dark:     #4a4a4a
```

## 🔄 SRS Algorithm

**SM-2 Quality Ratings:**
- 5: Perfect response
- 4: Correct after hesitation
- 3: Correct with difficulty
- 2: Incorrect, but seemed easy
- 1: Incorrect, but remembered
- 0: Complete blackout

**Intervals:**
- First review: 1 day
- Second review: 6 days
- Subsequent: interval × easeFactor

## 🛣️ Route Structure

```
/                      ✅ Landing page (emotional narrative)
/sign-in              ✅ Sign in (custom Clerk UI)
/sign-up              ✅ Sign up (custom Clerk UI)
/dashboard            ✅ Protected dashboard (placeholder)
/onboarding           ⏳ Exam selection & setup (TODO)
/dashboard/flashcards ⏳ Flashcard management (TODO)
/dashboard/review     ⏳ Daily review queue (TODO)
/dashboard/quiz       ⏳ Active recall quizzes (TODO)
/dashboard/journal    ⏳ Daily journal (TODO)
/dashboard/analytics  ⏳ Analytics - Core Pass (TODO)
/api/*                ⏳ Backend API routes (TODO)
```

## 🔧 Prisma Commands

```bash
# After schema changes
prisma generate       # Generate client
prisma db push        # Push to database
prisma studio         # Open GUI

# Migrations (for production)
prisma migrate dev    # Create migration
prisma migrate deploy # Apply in production
```

## 📦 Key Dependencies

```json
{
  "next": "15.5.4",           // Framework
  "@prisma/client": "^6.17",  // ORM
  "@clerk/nextjs": "^6.33",   // Auth
  "lucide-react": "^0.545",   // Icons
  "recharts": "^3.2",         // Charts
  "tailwindcss": "^4"         // Styling
}
```

## ⚡ Development Tips

1. **Hot Reload**: Save any file to see changes instantly
2. **Type Safety**: TypeScript will catch errors before runtime
3. **Prisma Studio**: Use `npm run db:studio` to inspect/edit data
4. **Console Logs**: Check terminal and browser console for errors
5. **Environment**: Restart dev server after `.env` changes

## 🐛 Common Fixes

```bash
# Clear Next.js cache
rm -rf .next                    # Mac/Linux
rmdir /s .next                  # Windows

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset database
npm run db:push -- --force-reset
npm run db:seed
```

## 📚 Documentation Files

- `README.md` - Full project documentation
- `SETUP_GUIDE.md` - Step-by-step setup
- `IMPLEMENTATION_PROGRESS.md` - Feature tracker
- `PROJECT_SUMMARY.md` - High-level overview
- `QUICK_REFERENCE.md` - This file

## 🎯 Current Status (Updated Oct 11, 2025)

✅ **Phase 1 Complete**: Foundation, DB Schema, Landing Page
✅ **Authentication Complete**: Clerk fully integrated with custom UI
✅ **Landing Page Transformed**: Emotional narrative with problem-first approach
⏳ **Next**: Database setup + Onboarding flow

**Files Created/Updated**:
- `app/sign-in/[[...sign-in]]/page.tsx` - Custom sign-in
- `app/sign-up/[[...sign-up]]/page.tsx` - Custom sign-up
- `app/dashboard/page.tsx` - Protected dashboard (server)
- `app/dashboard/dashboard-client.tsx` - Dashboard UI (client)
- `middleware.ts` - Route protection
- `app/layout.tsx` - ClerkProvider wrapper
- `app/page.tsx` - Emotional narrative landing page

---

**Dev Server**: http://localhost:3000
**Database GUI**: http://localhost:5555 (after `npm run db:studio` - NOT SET UP YET)
**Last Updated**: October 11, 2025
