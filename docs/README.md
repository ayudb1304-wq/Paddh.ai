# Padh.ai Documentation Hub

Welcome to the complete documentation for Padh.ai - an AI-powered study platform designed specifically for UPSC, JEE, and NEET aspirants.

## 📚 Table of Contents

### Getting Started
- [Quick Start Guide](./setup/QUICK_START.md) - Get up and running in 5 minutes
- [Setup Guide](./setup/SETUP_GUIDE.md) - Detailed installation instructions
- [Project Overview](./PROJECT_OVERVIEW.md) - High-level architecture and design decisions

### Development Guides
- [Implementation Progress](./development/IMPLEMENTATION_PROGRESS.md) - Current status and completed features
- [Development Workflow](./development/WORKFLOW.md) - Day-to-day development guide
- [API Reference](./development/API_REFERENCE.md) - Backend API documentation

### Feature Documentation
- [GSAP Scroll Animations](./features/GSAP_SCROLL_ANIMATIONS.md) - Complete animation system
- [Animation Quick Reference](./features/ANIMATION_QUICK_REFERENCE.md) - Handy animation guide
- [Onboarding System](./features/ONBOARDING_SYSTEM.md) - User onboarding flow
- [Theme System](./features/THEME_SYSTEM.md) - Light/Dark theme implementation
- [Authentication](./features/AUTHENTICATION.md) - Clerk integration details

### Setup & Configuration
- [Database Setup](./setup/DATABASE_SETUP.md) - PostgreSQL & Prisma configuration
- [Supabase Setup](./setup/SUPABASE_SETUP.md) - Using Supabase as database
- [Environment Variables](./setup/ENVIRONMENT_VARIABLES.md) - Complete .env guide

### Phase Documentation
- [Phase 1: Foundation](./phases/PHASE_1_COMPLETE.md) - Initial setup and landing page
- [Phase 2: Authentication & Features](./phases/PHASE_2_AUTH.md) - User authentication
- [Phase 3: Premium Features](./phases/PHASE_3_NEXT_STEPS.md) - AI features roadmap

## 🎯 Quick Links

### For New Developers
1. Start with [Quick Start Guide](./setup/QUICK_START.md)
2. Read [Project Overview](./PROJECT_OVERVIEW.md)
3. Check [Implementation Progress](./development/IMPLEMENTATION_PROGRESS.md)

### For Frontend Developers
- [GSAP Scroll Animations](./features/GSAP_SCROLL_ANIMATIONS.md)
- [Animation Quick Reference](./features/ANIMATION_QUICK_REFERENCE.md)
- [Theme System](./features/THEME_SYSTEM.md)

### For Backend Developers
- [Database Setup](./setup/DATABASE_SETUP.md)
- [API Reference](./development/API_REFERENCE.md)
- [Development Workflow](./development/WORKFLOW.md)

### For DevOps
- [Deployment Guide](./setup/DEPLOYMENT.md)
- [Environment Variables](./setup/ENVIRONMENT_VARIABLES.md)

## 📊 Current Project Status

**Last Updated**: October 16, 2025

### ✅ Completed
- ✅ Next.js 15.5.4 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS v4 styling system
- ✅ Clerk authentication (Sign In/Sign Up)
- ✅ Protected dashboard with personalized content
- ✅ Emotional narrative landing page
- ✅ **GSAP scroll-triggered animations** (NEW)
- ✅ Light/Dark theme system with persistence
- ✅ Aurora backgrounds and Framer Motion animations
- ✅ Asymmetric Bento Grid layout
- ✅ Complete database schema (PostgreSQL + Prisma)
- ✅ SM-2 and AI-optimized SRS algorithms
- ✅ Seed data for UPSC/JEE/NEET exams

### 🚧 In Progress
- 🔄 Supabase database connection
- 🔄 User profile synchronization (Clerk → Database)
- 🔄 Enhanced onboarding flow

### 📋 Planned
- ⏳ Flashcard CRUD system
- ⏳ Daily review queue with SRS
- ⏳ Quiz system
- ⏳ Journal & streak tracking
- ⏳ AI flashcard generation (Premium)
- ⏳ Advanced analytics (Premium)
- ⏳ Razorpay payment integration

## 🏗️ Project Architecture

```
Padh.ai/
├── app/                                # Next.js App Router
│   ├── (auth)/                        # Auth routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/                     # Protected dashboard
│   ├── onboarding/                    # Onboarding flow
│   ├── api/                          # API routes
│   └── page.tsx                      # Landing page with GSAP animations
├── components/
│   ├── features/                     # Feature components
│   │   ├── PricingSection.tsx
│   │   └── AnimatedNeetCard.tsx
│   └── ui/                           # Reusable UI components
│       ├── aurora-background.tsx
│       ├── bento-grid.tsx
│       ├── text-reveal.tsx
│       ├── typewriter.tsx
│       └── infinite-moving-cards.tsx
├── hooks/
│   └── useGSAP.ts                    # Custom GSAP hook
├── lib/
│   ├── algorithms/                   # SRS algorithms
│   │   └── sm2.ts
│   ├── db/                           # Database
│   │   └── prisma.ts
│   └── supabase/                     # Supabase integration
│       └── queries.ts
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Seed data
├── docs/                             # 📚 THIS DOCUMENTATION
│   ├── README.md                     # This file
│   ├── setup/                        # Setup guides
│   ├── features/                     # Feature docs
│   ├── development/                  # Dev guides
│   └── phases/                       # Phase documentation
└── public/                           # Static assets
```

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 15.5.4 | React framework with App Router |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Animations | GSAP | 3.x | Scroll-triggered animations |
| Animations | Framer Motion | 12.23.24 | React animations |
| Database | PostgreSQL | - | Relational database |
| ORM | Prisma | 6.17.0 | Type-safe database client |
| Cloud DB | Supabase | - | PostgreSQL hosting |
| Auth | Clerk | 6.33.3 | Authentication & user management |
| Payments | Razorpay | - | Payment processing (planned) |
| AI | Google Gemini | - | AI flashcard generation (planned) |
| Deployment | Vercel | - | Hosting platform |

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Lint code

# Database
npm run db:generate     # Generate Prisma Client
npm run db:push         # Push schema to database
npm run db:seed         # Seed exam data
npm run db:studio       # Open Prisma Studio GUI
npm run seed:supabase   # Seed Supabase database

# Type Checking
npx tsc --noEmit        # Check TypeScript errors
```

## 📝 Documentation Conventions

### File Naming
- `README.md` - Overview/index files
- `SCREAMING_SNAKE_CASE.md` - Important standalone documents
- `kebab-case.md` - Regular documentation files

### Document Structure
Each documentation file should have:
1. **Title** - Clear, descriptive heading
2. **Overview** - Brief description and last updated date
3. **Table of Contents** - For longer documents
4. **Main Content** - Organized with clear sections
5. **Code Examples** - When applicable
6. **Related Links** - Cross-references to other docs

### Code Examples
```typescript
// Always include comments explaining the code
// Use TypeScript for type safety
// Show complete, working examples
```

## 🎓 Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)

### Tutorials & Guides
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [GSAP ScrollTrigger Tutorial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)

## 🤝 Contributing

### Documentation Guidelines
1. Keep documentation up-to-date with code changes
2. Use clear, concise language
3. Include code examples where helpful
4. Add screenshots for UI features
5. Cross-reference related documents

### Adding New Documentation
1. Place files in appropriate subdirectories
2. Update this README with links
3. Follow naming conventions
4. Include "Last Updated" date

## 📞 Getting Help

- **Bug Reports**: Create an issue in the repository
- **Feature Requests**: Open a discussion
- **Questions**: Check existing documentation first
- **Urgent Issues**: Contact the development team

## 🎉 Latest Updates

### October 16, 2025
- ✨ **GSAP Scroll-Triggered Animations**: Complete implementation of cinematic scroll animations
  - Hero section sequential reveals with blur effects
  - Problem section scrub and pin animations
  - Solution cards staggered entrance
  - Bento grid batch animations
  - Final CTA word-by-word reveal with bouncing button
  - Mobile-optimized with responsive behavior
  - Performance-optimized with hardware acceleration

### October 14, 2025
- ✨ **Enhanced Onboarding**: Improved user onboarding experience
- 🎨 **Theme System**: Light/Dark mode with persistence

### October 13, 2025
- ✅ **Phase 1 Complete**: Foundation and authentication
- 🎨 **Landing Page**: Emotional narrative design

### October 12, 2025
- 🔐 **Authentication**: Clerk integration with custom pages
- 🎨 **Theme Toggle**: Light/Dark theme switching

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for India's exam aspirants.**

**Development Status**: Active Development
**Target Launch**: Q1 2026
**Current Phase**: Phase 2 - Core Features
