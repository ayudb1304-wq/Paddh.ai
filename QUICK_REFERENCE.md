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

Required for full functionality (see `.env.example`):

```bash
# Database (REQUIRED)
DATABASE_URL=

# Clerk Auth (REQUIRED for auth features)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Google Gemini (for AI flashcards)
GEMINI_API_KEY=

# Razorpay (for payments)
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
/                      Landing page
/sign-in              Sign in (Clerk)
/sign-up              Sign up (Clerk)
/onboarding           Exam selection & setup
/dashboard            User dashboard
/dashboard/flashcards Flashcard management
/dashboard/review     Daily review queue
/dashboard/quiz       Active recall quizzes
/dashboard/journal    Daily journal
/dashboard/analytics  Analytics (Core Pass)
/api/*                Backend API routes
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

## 🎯 Current Status

✅ **Phase 1 Complete**: Foundation, DB, Landing Page
⏳ **Next**: Clerk auth + Onboarding flow

---

**Dev Server**: http://localhost:3000
**Database GUI**: http://localhost:5555 (after `npm run db:studio`)
