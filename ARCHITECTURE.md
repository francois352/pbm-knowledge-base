# PBM Knowledge Hub - Architecture Documentation

## System Architecture

### Overview

The PBM Knowledge Hub is a full-stack monorepo application with three main components:

1. **Backend API** - RESTful API with PostgreSQL database
2. **Web Application** - Next.js responsive web app
3. **Mobile Application** - React Native (Expo) for iOS/Android

All components share TypeScript types and utilities through the `shared` package.

---

## High-Level Architecture

```
┌─────────────┐         ┌─────────────┐
│   Mobile    │         │     Web     │
│    (RN)     │         │  (Next.js)  │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │    REST API (HTTPS)   │
       │                       │
       └───────────┬───────────┘
                   │
           ┌───────▼───────┐
           │   Backend API │
           │  (Node/Express)│
           └───────┬───────┘
                   │
           ┌───────▼───────┐
           │  PostgreSQL   │
           │   (elest.io)  │
           └───────────────┘
```

---

## Backend Architecture

### Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **ORM**: Knex.js
- **Authentication**: JWT
- **Validation**: Zod
- **Logging**: Winston

### API Structure

```
backend/src/
├── routes/          # Express route definitions
├── controllers/     # Request handlers
├── services/        # Business logic layer
├── middleware/      # Auth, validation, error handling
├── models/          # Data models (if needed)
├── db/
│   ├── migrations/  # Database schema versions
│   └── seeds/       # Test/demo data
├── config/          # Environment and app config
└── utils/           # Helper functions
```

### API Endpoints (Planned)

```
/api/v1/
├── /auth
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /refresh
│   └── POST   /logout
├── /content
│   ├── GET    /articles
│   ├── GET    /articles/:slug
│   ├── GET    /search
│   └── GET    /categories
├── /research
│   ├── GET    /papers
│   └── GET    /papers/:id
├── /hrv
│   ├── GET    /sessions
│   ├── POST   /sessions
│   └── GET    /stats
├── /wellness
│   ├── GET    /entries
│   ├── POST   /entries
│   └── GET    /correlations
├── /forum
│   ├── GET    /posts
│   ├── POST   /posts
│   ├── GET    /posts/:id
│   └── POST   /posts/:id/comments
└── /leads
    ├── POST   /consultation-requests
    └── GET    /products
```

### Authentication Flow

```
1. User → POST /auth/login {email, password}
2. Server validates credentials
3. Server returns {accessToken, refreshToken}
4. Client stores tokens (localStorage/AsyncStorage)
5. Client includes Authorization: Bearer <token> in headers
6. Server validates JWT on protected routes
7. Token refresh with /auth/refresh when expired
```

### Database Design

**Key Principles:**
- Normalized schema (3NF)
- UUID primary keys for distributed systems
- Timestamps (created_at, updated_at) on all tables
- Soft deletes where applicable
- Indexes on frequently queried fields

**Relationships:**
- Users → Content (one-to-many: author)
- Users → Progress (one-to-many)
- Users → HRV Sessions (one-to-many)
- Users → Forum Posts/Comments (one-to-many)
- Learning Paths → Articles (many-to-many via learning_path_items)
- Posts → Comments (one-to-many, self-referential for threads)

---

## Web Application Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS
- **State Management**: Zustand (for global state)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form
- **Theme**: next-themes

### Application Structure

```
web/src/
├── app/              # Next.js App Router
│   ├── (auth)/      # Auth-required routes
│   ├── (public)/    # Public routes
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Homepage
├── components/
│   ├── ui/          # Reusable UI components
│   ├── features/    # Feature-specific components
│   └── layout/      # Layout components
├── lib/
│   ├── api.ts       # API client
│   ├── hooks/       # Custom hooks
│   └── utils/       # Utility functions
├── contexts/        # React contexts
└── styles/          # Global styles
```

### Key Features

**Server-Side Rendering (SSR)**
- Initial page loads from server
- SEO-friendly content pages
- Dynamic metadata per page

**Progressive Web App (PWA)**
- Service worker for offline support
- Install prompt for mobile
- App manifest for home screen

**Data Fetching Strategy**
- React Query for caching and sync
- Optimistic updates for better UX
- Background refetching

**Routing Structure**
```
/                    → Homepage
/content             → Content library
/content/[slug]      → Article detail
/research            → Research papers
/hrv                 → HRV dashboard
/hrv/session         → Active HRV session
/wellness            → Wellness journal
/forum               → Forum home
/forum/[postId]      → Thread detail
/profile             → User profile
/consultation        → Lead form
```

---

## Mobile Application Architecture

### Technology Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State**: Zustand
- **Data**: React Query
- **Storage**: AsyncStorage
- **Camera**: Expo Camera (for HRV)

### Navigation Structure

```
Stack Navigator
├── Main (Tab Navigator)
│   ├── Home
│   ├── Content
│   ├── HRV
│   ├── Forum
│   └── Profile
├── ArticleDetail
├── HRVSession
└── Login
```

### Platform-Specific Considerations

**iOS:**
- Camera/microphone permissions
- Face ID/Touch ID integration (future)
- HealthKit integration (future)

**Android:**
- Camera permissions
- Background service for notifications
- Material Design compliance

---

## Shared Package

### Purpose

Maintain consistency across backend, web, and mobile by sharing:
- TypeScript type definitions
- Constants and enums
- Validation schemas
- Utility functions

### Structure

```
shared/src/
├── types/           # TypeScript definitions
│   ├── user.types.ts
│   ├── content.types.ts
│   ├── hrv.types.ts
│   ├── wellness.types.ts
│   ├── forum.types.ts
│   └── leads.types.ts
├── constants/       # App-wide constants
│   └── index.ts
└── utils/           # Shared utilities
    ├── validation.ts
    └── date.ts
```

---

## Data Flow

### Content Consumption Flow

```
1. User requests article → Web/Mobile
2. Check cache (React Query) → Cache Hit? Return
3. API Request → GET /api/v1/content/articles/:slug
4. Backend queries PostgreSQL
5. Return article data
6. Update cache
7. Render content
```

### HRV Session Flow

```
1. User starts session → Mobile/Web
2. Request camera permissions
3. Capture video frames
4. Process with TensorFlow.js (PPG detection)
5. Calculate heart rate & coherence in real-time
6. Display breathing pacer
7. Session complete → POST /api/v1/hrv/sessions
8. Save to database
9. Update user stats
```

### Forum Interaction Flow

```
1. User views forum → GET /api/v1/forum/posts
2. User creates post → POST /api/v1/forum/posts
3. Backend validates & saves
4. Other users see post (via polling or WebSockets future)
5. User comments → POST /api/v1/forum/posts/:id/comments
6. Threading support via parent_id
7. Voting → POST /api/v1/forum/votes
```

---

## Security Architecture

### Authentication

- JWT-based authentication
- Access tokens (15 min expiry)
- Refresh tokens (7 day expiry)
- Secure HTTP-only cookies (web)
- AsyncStorage (mobile)

### Authorization

- Role-based access control (RBAC)
- User roles: user, practitioner, admin
- Middleware checks on protected routes
- Resource ownership validation

### Data Protection

- HTTPS only in production
- SQL injection prevention (parameterized queries)
- XSS prevention (React escaping)
- CSRF tokens (future)
- Rate limiting (100 req/15min per IP)
- Input validation (Zod schemas)

### GDPR Compliance

- Explicit consent collection
- Data export functionality
- Right to deletion
- Cookie consent
- Privacy policy enforcement
- EU-based data storage (elest.io)

---

## Performance Optimization

### Backend

- Database query optimization
- Indexing on frequently queried fields
- Connection pooling
- Response compression (gzip)
- Caching headers

### Web

- Code splitting (Next.js automatic)
- Image optimization (next/image)
- Font optimization (next/font)
- Static generation for content pages
- CDN deployment (Vercel Edge Network)

### Mobile

- Lazy loading of screens
- Image caching
- AsyncStorage for offline data
- Optimized list rendering (FlatList)
- Bundle size monitoring

---

## Monitoring & Logging

### Backend

- Winston for structured logging
- Error tracking (future: Sentry)
- Performance monitoring (future: New Relic)
- Database query logging

### Frontend

- Error boundaries for graceful failures
- Analytics (future: Google Analytics)
- Performance monitoring (future: Vercel Analytics)

---

## Scalability Considerations

### Current Setup
- Monolithic backend
- Single PostgreSQL instance
- Stateless API (horizontally scalable)

### Future Scaling Paths
- Load balancer for multiple API instances
- PostgreSQL read replicas
- Redis for caching/sessions
- CDN for static assets
- Microservices (if needed)

---

## Development Workflow

```
1. Feature branch from main
2. Local development with hot reload
3. Write tests (unit + integration)
4. Lint and format code
5. Create PR
6. Code review
7. Merge to main
8. CI/CD pipeline runs
9. Deploy to staging
10. QA testing
11. Deploy to production
```

---

## Deployment Architecture

### Production Environment

```
┌─────────────────┐
│   Vercel        │  ← Web (Next.js)
│   (Edge CDN)    │
└─────────────────┘

┌─────────────────┐
│   Expo EAS      │  ← Mobile builds
│   (App Stores)  │
└─────────────────┘

┌─────────────────┐
│   Backend Host  │  ← API (Node.js)
│   (elest.io or  │
│    similar)      │
└─────────────────┘

┌─────────────────┐
│   PostgreSQL    │  ← Database
│   (elest.io)    │
└─────────────────┘
```

---

## Technology Decisions & Rationale

| Choice | Rationale |
|--------|-----------|
| Monorepo | Share code, unified development experience |
| TypeScript | Type safety, better IDE support |
| PostgreSQL | ACID compliance, complex queries, JSON support |
| Next.js | SEO, SSR, great DX, Vercel ecosystem |
| Expo | Managed workflow, faster mobile development |
| React Query | Powerful caching, automatic refetching |
| Knex.js | SQL query builder, migrations support |
| JWT | Stateless auth, scalable |
| Zod | Runtime validation, type inference |

---

## Future Enhancements

- [ ] WebSocket support for real-time forum updates
- [ ] GraphQL API option
- [ ] Redis caching layer
- [ ] Elasticsearch for better content search
- [ ] Video content support
- [ ] Multi-language i18n
- [ ] Advanced analytics dashboard
- [ ] AI-powered content recommendations
- [ ] Stripe payment integration
- [ ] Email marketing integration (Mailchimp)

---

**Last Updated:** January 2025
**Version:** 1.0.0
