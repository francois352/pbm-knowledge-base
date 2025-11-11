# PBM Knowledge Hub - Backend API

Node.js/Express backend API with PostgreSQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run database migrations:
```bash
npm run migrate
```

4. (Optional) Seed the database:
```bash
npm run seed
```

## Development

```bash
npm run dev
```

Server will start on http://localhost:3001

## Database

Using PostgreSQL with Knex.js for migrations and query building.

### Migrations

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Create new migration
npx knex migrate:make migration_name --knexfile src/db/knexfile.ts
```

### Seeds

```bash
# Run seeds
npm run seed

# Create new seed
npx knex seed:make seed_name --knexfile src/db/knexfile.ts
```

## API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Health Check
```
GET /health
```

### Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts
│   │   └── env.ts
│   ├── db/              # Database
│   │   ├── migrations/  # Schema migrations
│   │   ├── seeds/       # Database seeds
│   │   └── knexfile.ts
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models
│   ├── utils/           # Utility functions
│   ├── app.ts          # Express app setup
│   └── index.ts        # Entry point
├── tests/              # Test files
├── logs/               # Log files
├── uploads/            # Uploaded files
├── package.json
├── tsconfig.json
└── README.md
```

## Database Schema

See `src/db/migrations/001_initial_schema.ts` for complete schema.

Key tables:
- `users` - User accounts
- `content_articles` - Educational content
- `research_papers` - Research library PDFs
- `learning_paths` - Guided learning paths
- `hrv_sessions` - HRV biofeedback data
- `symptom_entries` - Daily mood/symptom tracking
- `forum_posts` - Community discussions
- `consultation_requests` - Lead generation

## Environment Variables

See `.env.example` for all required environment variables.

## Security

- Helmet.js for HTTP headers
- CORS with configurable origins
- Rate limiting
- JWT authentication
- GDPR compliance
- Input validation with Zod
- SQL injection protection (parameterized queries)

## Testing

```bash
npm test
npm run test:watch
```

## Build

```bash
npm run build
npm start
```

## License

PROPRIETARY - Neurofeedback Luxembourg
