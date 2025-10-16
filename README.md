# Padh.ai - AI-Powered Study Platform

**End the anxiety. Master your exam.**

Padh.ai is an AI-powered study platform designed specifically for UPSC, JEE, and NEET aspirants. We transform exam preparation from overwhelming anxiety into structured clarity with cinematic animations and intelligent learning tools.

## 🎬 Latest Update - October 16, 2025

✨ **GSAP Scroll-Triggered Animations** - Experience a cinematic journey through our landing page with:
- Sequential hero reveals with blur effects
- Scroll-linked scrub animations
- Pin animations for emphasis (desktop)
- Staggered card entrances
- Word-by-word CTA reveals
- 60fps hardware-accelerated performance
- Mobile-optimized responsive behavior

## ✨ Features

### Free Tier
- ✅ Multi-Exam Onboarding & Planning (UPSC/JEE/NEET)
- ✅ Unlimited Manual Flashcards
- ✅ Standard SRS Review (SM-2 Algorithm)
- ✅ Active Recall Quizzes
- ✅ Metacognitive Journal & Streaks

### Core Pass (Premium - ₹299/month)
- ⚡ AI Flashcard Generator (PDF/Text to Flashcards)
- 🧠 AI-Optimized Scheduling (Personalized SRS)
- 📊 Advanced Analytics Dashboard

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP 3.x + Framer Motion 12.x
- **Database**: PostgreSQL with Prisma 6.17.0
- **Authentication**: Clerk 6.33.3
- **Payments**: Razorpay (planned)
- **AI**: Google Gemini API (planned)
- **Deployment**: Vercel

## 📚 Documentation

**All documentation has been organized in the `/docs` folder for easy access:**

- **[Documentation Hub](./docs/README.md)** - Start here for complete navigation
- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Complete project details and architecture
- **[GSAP Animations Guide](./docs/features/GSAP_SCROLL_ANIMATIONS.md)** - Full animation implementation
- **[Animation Quick Reference](./docs/features/ANIMATION_QUICK_REFERENCE.md)** - Handy animation guide
- **[Implementation Progress](./docs/development/IMPLEMENTATION_PROGRESS.md)** - Current status tracker
- **[Setup Guides](./docs/setup/)** - Database, Supabase, environment setup

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Clerk account (for authentication)
- Google Gemini API key (for AI features)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd padh-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Clerk dashboard
   - `CLERK_SECRET_KEY`: From Clerk dashboard
   - `GEMINI_API_KEY`: From Google AI Studio
   - `RAZORPAY_KEY_ID`: From Razorpay dashboard
   - `RAZORPAY_KEY_SECRET`: From Razorpay dashboard

4. **Set up the database**

   ```bash
   # Generate Prisma Client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed the database with exam data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup Options

#### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL
# Create a database
createdb padh_ai

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/padh_ai?schema=public"
```

#### Option 2: Vercel Postgres
1. Create a Vercel account
2. Create a new Postgres database
3. Copy the connection string to `.env`

#### Option 3: Supabase
1. Create a Supabase project
2. Get the connection string from Settings → Database
3. Update `.env` with the connection string

## Project Structure

```
padh-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── onboarding/        # Onboarding flow
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/
│   ├── features/          # Feature components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── algorithms/        # SM-2 and AI-SRS algorithms
│   ├── db/                # Prisma client
│   └── utils.ts           # Utility functions
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data for exams
└── public/                # Static assets
```

## Development Workflow

### Database Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed the database
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Building for Production

```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Set up Vercel Postgres (or use external database)
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/padh-ai)

## Environment Variables

See `.env.example` for all required environment variables.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@padh.ai or join our Discord community.

---

Built with ❤️ for India's exam aspirants.
