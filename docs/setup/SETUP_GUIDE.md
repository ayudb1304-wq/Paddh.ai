# Padh.ai - Quick Setup Guide

This guide will help you get the Padh.ai MVP up and running on your local machine.

## Prerequisites Checklist

Before you begin, make sure you have:

- ✅ Node.js 18+ and npm installed
- ⬜ PostgreSQL database (one of the options below)
- ⬜ Clerk account (free tier available)
- ⬜ Google Gemini API key (for AI features)
- ⬜ Razorpay account (for payments)

---

## Step-by-Step Setup

### 1. Install Dependencies

The project is already set up with all necessary dependencies. If you need to reinstall:

```bash
cd padh-ai
npm install
```

### 2. Set Up Database

Choose one of these options:

#### Option A: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL**
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create Database**
   ```bash
   # Start PostgreSQL service (if not running)
   # Windows: Services → PostgreSQL
   # Mac: brew services start postgresql
   # Linux: sudo service postgresql start

   # Create database
   createdb padh_ai
   ```

3. **Update .env**
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/padh_ai?schema=public"
   ```
   Replace `your_password` with your PostgreSQL password.

#### Option B: Vercel Postgres (Recommended for Production)

1. Go to https://vercel.com/storage/postgres
2. Create a new Postgres database
3. Copy the connection string
4. Update `.env` with the connection string

#### Option C: Supabase (Free Tier Available)

1. Create account at https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI)
5. Update `.env` with the connection string

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed database with exam data (UPSC/JEE/NEET)
npm run db:seed
```

You should see output like:
```
Database seeded successfully!
{
  upsc: { id: '...', type: 'UPSC', name: '...' },
  jee: { id: '...', type: 'JEE', name: '...' },
  neet: { id: '...', type: 'NEET', name: '...' }
}
```

### 4. Set Up Clerk Authentication

1. **Create Clerk Account**
   - Go to https://clerk.com
   - Sign up for free account
   - Create new application

2. **Get API Keys**
   - In Clerk Dashboard → API Keys
   - Copy "Publishable Key" and "Secret Key"

3. **Update .env**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```

4. **Configure URLs** (already set in .env)
   ```env
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   ```

### 5. Set Up Google Gemini API (Optional for MVP, Required for AI Features)

1. Go to https://ai.google.dev
2. Click "Get API key"
3. Create new API key
4. Update .env:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### 6. Set Up Razorpay (Optional for MVP, Required for Payments)

1. Create account at https://razorpay.com
2. Go to Settings → API Keys
3. Generate keys (Test Mode for development)
4. Update .env:
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_key
   RAZORPAY_KEY_SECRET=your_secret_key
   ```

### 7. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

You should see the landing page! 🎉

---

## Verify Setup

### Check Database Connection

```bash
# Open Prisma Studio to view your database
npm run db:studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all tables
- See seeded exam data (Exam, Subject, Topic tables)
- Manually add/edit data

### Check Development Server

Visit these URLs:
- Landing Page: http://localhost:3000 ✅
- Sign In: http://localhost:3000/sign-in (after Clerk setup)
- Dashboard: http://localhost:3000/dashboard (after building auth)

---

## Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution**:
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env is correct
- Test connection: `psql "postgresql://postgres:password@localhost:5432/padh_ai"`

### Issue: "Prisma Client not generated"
**Solution**:
```bash
npm run db:generate
```

### Issue: "Environment variables not loaded"
**Solution**:
- Make sure .env file exists in root directory
- Restart dev server after changing .env
- Variables starting with NEXT_PUBLIC_ are required for client-side access

### Issue: Tailwind CSS not working
**Solution**:
- Check if `globals.css` is imported in `layout.tsx`
- Restart dev server
- Clear `.next` folder: `rm -rf .next` or `rmdir /s .next` (Windows)

### Issue: Port 3000 already in use
**Solution**:
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000, then taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:3000 | xargs kill
```

---

## What's Working Now

✅ **Landing Page**: Beautiful, responsive landing page with features and pricing
✅ **Database Schema**: Complete schema for all features
✅ **Seed Data**: UPSC, JEE, and NEET subjects and topics
✅ **SM-2 Algorithm**: Spaced repetition implementation ready
✅ **AI-SRS Algorithm**: Advanced scheduling for Core Pass users

## What's Next

The following features need to be built (see IMPLEMENTATION_PROGRESS.md):

1. **Authentication pages** (sign-in, sign-up)
2. **Onboarding flow** (exam selection, study plan creation)
3. **Dashboard** (overview of study progress)
4. **Flashcard system** (create, edit, review)
5. **Review system** (daily queue with SRS)
6. **Quiz system** (active recall practice)
7. **Journal & Streaks** (metacognitive reflection)
8. **AI features** (flashcard generation, optimized scheduling)
9. **Analytics** (performance metrics and insights)
10. **Payments** (Razorpay integration)

---

## Development Workflow

### Making Database Changes

1. Edit `prisma/schema.prisma`
2. Generate new client: `npm run db:generate`
3. Push to database: `npm run db:push`
4. (Optional) Update seed file and re-seed

### Adding New Features

1. Create API route in `app/api/[feature]/route.ts`
2. Create page in appropriate app folder
3. Create components in `components/`
4. Add utilities in `lib/`

### Testing

```bash
# Run development server
npm run dev

# Build for production (tests if build works)
npm run build

# Run production build
npm run start
```

---

## Need Help?

- Check `README.md` for full documentation
- See `IMPLEMENTATION_PROGRESS.md` for development status
- Review Prisma schema: `prisma/schema.prisma`
- Explore seed data: `prisma/seed.ts`

---

**Ready to build? Let's create something amazing for India's exam aspirants! 🚀**
