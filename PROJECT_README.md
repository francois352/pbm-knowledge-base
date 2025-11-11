# PBM Knowledge Hub - Full-Stack Platform

**Neurofeedback Luxembourg | Comprehensive PBM Educational Platform**

A full-stack web and mobile application combining deep photobiomodulation education with practical HRV biofeedback tools, community features, and lead generation.

---

## 🎯 Project Overview

The PBM Knowledge Hub is a comprehensive platform designed to:
- Educate patients about photobiomodulation and neurofeedback
- Provide HRV biofeedback tracking tools
- Build a community of practitioners and users
- Generate qualified leads for Neurofeedback Luxembourg
- Showcase Vielight products and services

### Key Features

✅ **Interactive Content Library** - Browse, search, and learn from curated educational content
✅ **HRV Biofeedback** - Camera-based heart rate tracking with guided breathing
✅ **Wellness Journal** - Daily mood and symptom tracking with correlation analysis
✅ **Community Forum** - Q&A, discussions, and user testimonials
✅ **Lead Generation** - Consultation requests and practitioner profiles
✅ **Research Library** - 36+ peer-reviewed papers on PBM
✅ **Multi-platform** - Responsive web app + native iOS/Android apps
✅ **GDPR Compliant** - EU-based data storage and privacy controls

---

## 📁 Project Structure

```
pbm-knowledge-base/
├── backend/              # Node.js/Express API + PostgreSQL
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Auth, validation, error handling
│   │   ├── db/          # Database migrations & seeds
│   │   └── config/      # Environment configuration
│   └── README.md
│
├── web/                 # Next.js web application
│   ├── src/
│   │   ├── app/        # Next.js 14 App Router pages
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities & API client
│   │   ├── hooks/      # Custom React hooks
│   │   └── contexts/   # React contexts
│   └── README.md
│
├── mobile/              # React Native (Expo) mobile app
│   ├── src/
│   │   ├── screens/    # Screen components
│   │   ├── navigation/ # Navigation setup
│   │   ├── components/ # Reusable components
│   │   └── services/   # API client
│   └── README.md
│
├── shared/              # Shared TypeScript types & utilities
│   ├── src/
│   │   ├── types/      # TypeScript definitions
│   │   ├── constants/  # App-wide constants
│   │   └── utils/      # Utility functions
│   └── README.md
│
├── content/             # Educational content
│   ├── patient-education/  # Articles (Markdown)
│   │   ├── neurofeedback/
│   │   ├── pbm/
│   │   └── wellness/
│   └── research-library/   # Research papers (PDFs)
│
├── docs/                # Legacy static demo site
│   └── (preserved for reference)
│
└── extracted-content/   # Extracted PDF content (18,000 words)
    └── (Lisa Lai's research, user guides)
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 14+ (recommended: elest.io hosted instance)
- Git

### Installation

1. **Clone and install:**
```bash
git clone <repository-url>
cd pbm-knowledge-base
npm install
```

2. **Configure environment:**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Web
cp web/.env.example web/.env.local
# Edit web/.env.local with API URL

# Mobile
cp mobile/.env.example mobile/.env
# Edit mobile/.env with API URL
```

3. **Set up database:**
```bash
cd backend
npm run migrate
npm run seed  # Optional: add sample data
cd ..
```

4. **Start development servers:**
```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Web app
npm run dev:web

# Terminal 3: Mobile app
npm run dev:mobile
```

**Access the apps:**
- Backend API: http://localhost:3001
- Web app: http://localhost:3000
- Mobile app: Expo DevTools at http://localhost:19006

---

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL (elest.io)
- Knex.js for migrations
- JWT authentication
- Zod validation

**Web:**
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- React Query
- PWA support

**Mobile:**
- React Native (Expo)
- Expo Camera for HRV
- React Navigation
- AsyncStorage

**Shared:**
- TypeScript strict mode
- Shared types across all platforms
- Common utilities and constants

### Database Schema

See `backend/src/db/migrations/001_initial_schema.ts` for the complete schema.

**Core Tables:**
- `users` - Authentication and profiles
- `content_articles` - Educational content
- `research_papers` - PDF research library
- `hrv_sessions` - Biofeedback data
- `symptom_entries` - Daily wellness tracking
- `forum_posts` / `forum_comments` - Community
- `consultation_requests` - Lead generation

---

## 📚 Documentation

Each sub-project has detailed documentation:

- [Backend API Documentation](backend/README.md)
- [Web App Documentation](web/README.md)
- [Mobile App Documentation](mobile/README.md)
- [Shared Package Documentation](shared/README.md)
- [Content Guidelines](content/README.md)

### Additional Docs

- `PBM-OFFER-DETAILS-2025.md` - Pricing and product packs
- `DEPLOYMENT-GUIDE.md` - Deployment instructions
- Legacy demo docs in root directory (preserved for reference)

---

## 🛠️ Development

### Workspace Commands

```bash
# Install all dependencies
npm install

# Development (backend + web concurrently)
npm run dev

# Build all projects
npm run build

# Run tests across all projects
npm run test

# Lint all code
npm run lint

# Format code
npm run format

# Clean all build artifacts
npm run clean
```

### Individual Project Commands

```bash
# Backend
npm run dev:backend
npm run build:backend

# Web
npm run dev:web
npm run build:web

# Mobile
npm run dev:mobile
npm run build:mobile
```

---

## 🚢 Deployment

### Backend (elest.io)

1. Create PostgreSQL database on elest.io
2. Set environment variables
3. Run migrations: `npm run migrate`
4. Deploy Node.js app to your hosting provider

### Web (Vercel - Recommended)

```bash
cd web
vercel deploy --prod
```

### Mobile (Expo EAS)

```bash
cd mobile
eas build --platform ios
eas build --platform android
eas submit --platform ios
eas submit --platform android
```

See individual README files for detailed deployment instructions.

---

## 🔐 Security & Privacy

- **GDPR Compliant** - EU-based database, data export/deletion
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Zod schemas on all inputs
- **SQL Injection Protection** - Parameterized queries
- **Rate Limiting** - API request throttling
- **HTTPS Only** - Enforced in production
- **Data Encryption** - Sensitive data encrypted at rest

---

## 🌍 Localization

Planned support for:
- 🇬🇧 English (default)
- 🇫🇷 French
- 🇩🇪 German

Translation infrastructure in place via i18n.

---

## 📊 Product Offering

### Vielight Product Packs

**Pack Autonomie** - €3,700 TTC
- Vielight Neuro Duo 4
- Vielight Vagus
- Complete user guide (FR/EN)

**Pack Guidé** - €4,000 TTC (RECOMMENDED)
- All Pack Autonomie items
- 2 hours personalized training
- Custom protocol development
- QEEG brain mapping integration

See `PBM-OFFER-DETAILS-2025.md` for complete details.

---

## 🤝 Contributing

This is a proprietary project for Neurofeedback Luxembourg. Internal contributions should:

1. Create feature branch from `main`
2. Follow TypeScript/ESLint conventions
3. Write tests for new features
4. Update documentation
5. Submit PR for review

---

## 📝 License

**PROPRIETARY** - Neurofeedback Luxembourg
All rights reserved. Unauthorized copying or distribution prohibited.

---

## 👥 Team

**Neurofeedback Luxembourg**
Contact: contact@neurofeedback-luxembourg.com
Website: https://neurofeedback-luxembourg.com

---

## 📮 Support

For technical issues or questions:
- Email: tech@neurofeedback-luxembourg.com
- Documentation: See individual README files
- Community: Join the forum at `/forum`

---

**Status:** ✅ Initial project structure complete
**Version:** 1.0.0
**Last Updated:** January 2025

🚀 **Ready for development!**
