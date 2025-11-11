# Getting Started with PBM Knowledge Hub

Welcome! This guide will help you set up and run the PBM Knowledge Hub platform locally.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
psql --version  # Should be 14.0 or higher
git --version
```

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd pbm-knowledge-base
```

---

## Step 2: Install Dependencies

The project uses npm workspaces, so a single command installs everything:

```bash
npm install
```

This will install dependencies for:
- Root workspace
- Backend
- Web
- Mobile
- Shared package

**Expected output:**
```
added 2847 packages in 45s
```

---

## Step 3: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. **Start PostgreSQL:**
```bash
# macOS (with Homebrew)
brew services start postgresql@14

# Linux
sudo systemctl start postgresql

# Windows
# Use Services app or pg_ctl
```

2. **Create database:**
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE pbm_knowledge_hub;
CREATE USER pbm_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE pbm_knowledge_hub TO pbm_user;
\q
```

### Option B: elest.io (Recommended for Production)

1. Sign up at [elest.io](https://elest.io)
2. Create a PostgreSQL database
3. Note the connection details

---

## Step 4: Configure Environment Variables

### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```bash
# Database (use your credentials)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pbm_knowledge_hub
DB_USER=pbm_user
DB_PASSWORD=your_secure_password
DB_SSL=false

# JWT Secrets (generate secure random strings)
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Server
PORT=3001
NODE_ENV=development
```

**Generate JWT secrets:**
```bash
# Run these commands and paste output into .env
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For JWT_REFRESH_SECRET
```

### Web Configuration

```bash
cd ../web
cp .env.example .env.local
```

Edit `web/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Mobile Configuration

```bash
cd ../mobile
cp .env.example .env
```

Edit `mobile/.env`:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3001
```

---

## Step 5: Run Database Migrations

```bash
cd ../backend
npm run migrate
```

**Expected output:**
```
Batch 1 run: 1 migration
✅ Migration completed
```

This creates all database tables.

### (Optional) Seed Sample Data

```bash
npm run seed
```

This adds demo content, users, and sample data.

---

## Step 6: Start Development Servers

Open **three terminal windows**:

### Terminal 1: Backend API

```bash
cd backend
npm run dev
```

**Expected output:**
```
Server running on port 3001
Environment: development
Database connection established
```

**Verify:** Visit http://localhost:3001/health - should return `{"status":"ok"}`

### Terminal 2: Web Application

```bash
cd web
npm run dev
```

**Expected output:**
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

**Verify:** Visit http://localhost:3000 - you should see the homepage

### Terminal 3: Mobile Application

```bash
cd mobile
npm start
```

**Expected output:**
```
› Metro waiting on exp://192.168.1.x:8081
› Scan the QR code above with Expo Go (Android) or Camera app (iOS)
```

**To run:**
- **iOS Simulator:** Press `i`
- **Android Emulator:** Press `a`
- **Physical Device:** Scan QR code with Expo Go app

---

## Step 7: Verify Everything Works

### Test Backend API

```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Test Web App

1. Visit http://localhost:3000
2. You should see the PBM Knowledge Hub homepage
3. Navigate through different sections
4. Check browser console for errors (should be none)

### Test Mobile App

1. Ensure Expo Go is installed on your device or emulator is running
2. Scan QR code or press `i`/`a` in terminal
3. App should launch and show homepage

---

## Common Issues & Solutions

### Issue: Database connection failed

**Solution:**
1. Verify PostgreSQL is running: `psql -U pbm_user -d pbm_knowledge_hub`
2. Check credentials in `backend/.env`
3. Ensure database exists: `psql -l`

### Issue: Port already in use

**Error:** `EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Find and kill process using port
lsof -ti:3001 | xargs kill -9
```

### Issue: Module not found

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Migration failed

**Solution:**
```bash
# Rollback and retry
npm run migrate:rollback
npm run migrate
```

### Issue: Expo won't connect

**Solution:**
1. Ensure phone and computer are on same WiFi
2. Try tunnel mode: `npm start -- --tunnel`
3. Check firewall settings

---

## Development Workflow

### 1. Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
code .

# Test changes
npm test
```

### 2. Running Tests

```bash
# All projects
npm test

# Specific project
cd backend && npm test
cd web && npm test
```

### 3. Code Quality

```bash
# Lint all code
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

### 4. Database Migrations

**Create new migration:**
```bash
cd backend
npx knex migrate:make migration_name --knexfile src/db/knexfile.ts
```

**Run migrations:**
```bash
npm run migrate
```

**Rollback last migration:**
```bash
npm run migrate:rollback
```

---

## Project Structure Quick Reference

```
pbm-knowledge-base/
├── backend/         # API server (runs on :3001)
├── web/             # Web app (runs on :3000)
├── mobile/          # Mobile app (Expo)
├── shared/          # Shared TypeScript types
└── content/         # Educational content (Markdown)
```

---

## Next Steps

Now that you're set up, explore:

1. **📖 Read the Documentation**
   - [PROJECT_README.md](PROJECT_README.md) - Full project overview
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
   - Individual README files in each directory

2. **🛠️ Start Building**
   - Review existing code structure
   - Check out the database schema
   - Explore the API endpoints
   - Customize the UI

3. **📚 Learn the Tech Stack**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [React Native / Expo](https://docs.expo.dev/)
   - [PostgreSQL](https://www.postgresql.org/docs/)
   - [TypeScript](https://www.typescriptlang.org/docs/)

4. **🎨 Customize**
   - Update branding colors in `web/tailwind.config.js`
   - Modify content in `content/` directory
   - Add new features to match your needs

---

## Helpful Commands

```bash
# Development
npm run dev              # Start backend + web
npm run dev:backend      # Backend only
npm run dev:web          # Web only
npm run dev:mobile       # Mobile only

# Building
npm run build            # Build all projects
npm run build:backend    # Backend only
npm run build:web        # Web only

# Testing
npm test                 # Run all tests
npm run test:watch       # Watch mode

# Database
npm run migrate          # Run migrations
npm run migrate:rollback # Rollback last migration
npm run seed            # Seed database

# Code Quality
npm run lint            # Lint all code
npm run format          # Format with Prettier
npm run clean           # Clean build artifacts
```

---

## Getting Help

- **Documentation:** Check README files in each directory
- **Issues:** Search existing issues or create new one
- **Community:** Join the discussion in `/forum`
- **Email:** tech@neurofeedback-luxembourg.com

---

## Tips for Success

1. **Keep dependencies updated:** Run `npm outdated` periodically
2. **Use TypeScript:** Let the type system catch errors early
3. **Write tests:** Add tests for new features
4. **Follow conventions:** Check existing code for patterns
5. **Commit often:** Small, focused commits are best
6. **Ask questions:** Don't hesitate to reach out

---

**Happy coding! 🚀**

If you encounter any issues not covered here, please update this guide to help future developers.

---

**Last Updated:** January 2025
