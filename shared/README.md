# @pbm-knowledge-hub/shared

Shared TypeScript types, constants, and utilities for the PBM Knowledge Hub project.

## Installation

This package is part of the monorepo workspace and is automatically linked.

```bash
npm install
```

## Usage

```typescript
import {
  User,
  ContentArticle,
  HRVSession,
  DEFAULT_365_BREATHING,
  isValidEmail,
  formatDate,
} from '@pbm-knowledge-hub/shared';
```

## Structure

```
shared/
├── src/
│   ├── types/           # TypeScript type definitions
│   │   ├── user.types.ts
│   │   ├── content.types.ts
│   │   ├── hrv.types.ts
│   │   ├── wellness.types.ts
│   │   ├── forum.types.ts
│   │   └── leads.types.ts
│   ├── constants/       # Application constants
│   │   └── index.ts
│   ├── utils/          # Utility functions
│   │   ├── validation.ts
│   │   └── date.ts
│   └── index.ts        # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Types

### User Types
- `User`, `UserProfile`, `UserRole`, `UserPreferences`
- Authentication tokens and session management

### Content Types
- `ContentArticle`, `ResearchPaper`
- `LearningPath`, `UserProgress`
- Category and difficulty enums

### HRV Types
- `HRVSession`, `HRVSessionSummary`
- `BreathingGuide`, `CoherenceLevel`
- Raw biometric data structures

### Wellness Types
- `SymptomEntry`, `WellnessSummary`
- `Correlation`, `CorrelationAnalysis`

### Forum Types
- `ForumPost`, `ForumComment`, `ForumVote`
- Category and vote type enums

### Lead Types
- `ConsultationRequest`, `VielightProduct`
- `ProductPack`, `PractitionerProfile`

## Constants

Application-wide constants including:
- API configuration
- Pagination defaults
- HRV session parameters
- Content limits
- File upload restrictions
- Rate limiting
- GDPR compliance
- Product pricing

## Utilities

### Validation
- Email, phone, URL validation
- Slug sanitization
- Range and score validation

### Date
- Formatting functions
- Relative time display
- Date range calculations
- Streak tracking

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm run test

# Clean
npm run clean
```

## License

PROPRIETARY - Neurofeedback Luxembourg
