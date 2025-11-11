# Deployment Guide - PBM Knowledge Hub

Complete deployment instructions for production environments.

---

## Deployment Options

1. **Docker Compose** - Quickest setup for testing/staging
2. **Managed Services** - Recommended for production
3. **Manual Deployment** - Full control

---

## Option 1: Docker Compose (Quickest)

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Setup

1. **Clone and configure:**
```bash
git clone <repository-url>
cd pbm-knowledge-base

# Create environment file
cat > .env << EOF
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
EOF
```

2. **Build and start:**
```bash
docker-compose up -d
```

3. **Run migrations:**
```bash
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed  # Optional
```

4. **Access applications:**
- Web: http://localhost:3000
- API: http://localhost:3001
- Database: localhost:5432

### Management

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# Database backup
docker-compose exec postgres pg_dump -U pbm_user pbm_knowledge_hub > backup.sql
```

---

## Option 2: Managed Services (Production)

### Architecture

```
Vercel (Web) → Backend (elest.io/Railway) → PostgreSQL (elest.io)
                    ↓
            Expo (Mobile Apps)
```

### Backend Deployment

#### Using elest.io (Recommended)

1. **Create PostgreSQL database:**
   - Go to [elest.io](https://elest.io)
   - Create PostgreSQL 14+ instance
   - Note connection details

2. **Deploy backend:**
   - Create Node.js 18+ app
   - Connect to GitHub repository
   - Set build command: `cd backend && npm run build`
   - Set start command: `cd backend && npm start`

3. **Environment variables:**
```bash
NODE_ENV=production
PORT=3001
DB_HOST=<elest-db-host>
DB_PORT=5432
DB_NAME=pbm_knowledge_hub
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_SSL=true
JWT_SECRET=<generate-secure-secret>
JWT_REFRESH_SECRET=<generate-secure-secret>
CORS_ORIGIN=https://your-domain.com
```

4. **Run migrations:**
```bash
npm run migrate
npm run seed  # Optional
```

#### Alternative: Railway.app

1. **New Project → Deploy from GitHub**
2. **Add PostgreSQL plugin**
3. **Configure environment variables** (same as above)
4. **Deploy**

### Web Deployment

#### Using Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd web
vercel deploy --prod
```

3. **Environment variables in Vercel dashboard:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

4. **Domain setup:**
   - Add custom domain in Vercel dashboard
   - Update CORS_ORIGIN in backend to include your domain

#### Alternative: Netlify

```bash
cd web
npm run build
# Deploy the 'out' directory
```

### Mobile Deployment

#### Using Expo EAS

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Configure:**
```bash
cd mobile
eas login
eas build:configure
```

3. **Update `mobile/.env`:**
```bash
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

4. **Build:**
```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

5. **Submit to stores:**
```bash
eas submit --platform ios
eas submit --platform android
```

---

## Option 3: Manual Deployment

### Server Requirements

- Ubuntu 20.04 LTS or similar
- Node.js 18+
- PostgreSQL 14+
- Nginx (reverse proxy)
- SSL certificate (Let's Encrypt)

### Backend Setup

1. **Install dependencies:**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# PM2 (process manager)
sudo npm install -g pm2
```

2. **Setup database:**
```bash
sudo -u postgres psql
CREATE DATABASE pbm_knowledge_hub;
CREATE USER pbm_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE pbm_knowledge_hub TO pbm_user;
\q
```

3. **Deploy code:**
```bash
cd /var/www
git clone <repository-url> pbm-knowledge-hub
cd pbm-knowledge-hub
npm install
```

4. **Configure environment:**
```bash
cd backend
cp .env.example .env
# Edit .env with production values
```

5. **Build and start:**
```bash
npm run build
npm run migrate

# Start with PM2
pm2 start dist/index.js --name pbm-backend
pm2 save
pm2 startup
```

### Web Setup

1. **Build:**
```bash
cd ../web
cp .env.example .env.local
# Edit .env.local
npm run build
```

2. **Start:**
```bash
pm2 start npm --name pbm-web -- start
pm2 save
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/pbm-knowledge-hub

# Backend API
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Web Application
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/pbm-knowledge-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Setup (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

---

## Post-Deployment

### 1. Health Checks

```bash
# Backend
curl https://api.your-domain.com/health

# Should return: {"status":"ok","timestamp":"..."}
```

### 2. Monitoring

Set up monitoring:
- **Backend**: PM2 monitoring or New Relic
- **Web**: Vercel Analytics
- **Database**: PostgreSQL monitoring
- **Uptime**: UptimeRobot or similar

### 3. Backups

```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U pbm_user pbm_knowledge_hub > /backups/pbm_db_$DATE.sql

# Add to cron (daily at 2 AM)
0 2 * * * /path/to/backup-script.sh
```

### 4. Security Checklist

- [ ] Environment variables secured
- [ ] Database uses strong password
- [ ] SSL/TLS enabled
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] JWT secrets are secure random strings

---

## Troubleshooting

### Backend won't start

```bash
# Check logs
pm2 logs pbm-backend

# Common issues:
# - Database connection failed → Check DB_HOST, DB_PASSWORD
# - Port already in use → Change PORT in .env
# - Migration failed → Check database permissions
```

### Web app can't connect to API

```bash
# Check NEXT_PUBLIC_API_URL in web/.env.local
# Verify CORS_ORIGIN in backend/.env matches web URL
# Check network/firewall rules
```

### Database connection errors

```bash
# Test connection
psql -h localhost -U pbm_user -d pbm_knowledge_hub

# Check PostgreSQL is running
sudo systemctl status postgresql

# Check firewall
sudo ufw status
```

---

## Scaling

### Horizontal Scaling

1. **Backend:** Deploy multiple instances behind load balancer
2. **Database:** Use read replicas for read-heavy operations
3. **CDN:** Serve static assets via CDN (Vercel Edge Network)

### Vertical Scaling

- Increase server resources as needed
- Monitor CPU, memory, and database performance
- Optimize queries and add indexes

---

## Maintenance

### Updates

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build
npm run build --workspaces

# Restart services
pm2 restart all

# Run new migrations
cd backend && npm run migrate
```

### Database Maintenance

```bash
# Vacuum database (monthly)
psql -U pbm_user -d pbm_knowledge_hub -c "VACUUM ANALYZE;"

# Check database size
psql -U pbm_user -d pbm_knowledge_hub -c "SELECT pg_size_pretty(pg_database_size('pbm_knowledge_hub'));"
```

---

## Support

For deployment issues:
- Check logs first
- Review this guide
- Contact: tech@neurofeedback-luxembourg.com

---

**Last Updated:** January 2025
