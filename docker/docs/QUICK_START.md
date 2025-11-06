# 🚀 Quick Start Guide

**TL;DR** - Get your backend up and running in 5 minutes!

## 📦 What You'll Deploy

- **Backend**: Express.js API (containerized)
- **Database**: PostgreSQL (containerized)
- **Frontend**: Next.js on Vercel (separate deployment)

---

## 🏃 Local Development (Fastest)

### Option 1: Database Only (Recommended for Dev)

Run PostgreSQL in Docker, backend on your host:

```bash
# 1. Start PostgreSQL
docker-compose -f docker/docker-compose.yml up -d

# 2. Run backend locally
cd server
npm install
npm run dev

# ✅ Backend: http://localhost:3001
# ✅ Database: localhost:5432
```

### Option 2: Full Docker Environment

Everything in containers:

```bash
# 1. Copy environment file
cp .env.docker.dev .env

# 2. Start all services
docker-compose -f docker/docker-compose.dev.yml up -d

# 3. View logs
docker-compose -f docker/docker-compose.dev.yml logs -f backend

# ✅ Backend: http://localhost:3001
# ✅ Database: localhost:5432
# ✅ Drizzle Studio: docker-compose -f docker/docker-compose.dev.yml --profile studio up -d
```

---

## ☁️ Azure Container Apps (Production)

### Prerequisites

- Azure account
- GitHub account
- 15 minutes

### Step 1: Setup GitHub Secrets

Go to **GitHub → Settings → Secrets → Actions** and add:

```bash
# Create Azure service principal
az ad sp create-for-rbac \
  --name "github-saas-deploy" \
  --role contributor \
  --scopes /subscriptions/{subscription-id} \
  --sdk-auth
```

Copy the JSON output to `AZURE_CREDENTIALS` secret.

### Step 2: Configure Workflow

Edit `.github/workflows/backend-deploy.yml`:

```yaml
env:
  REGISTRY: ghcr.io  # ← Keep this for free GitHub registry
  IMAGE_NAME: ${{ github.repository }}/saas-backend
  AZURE_RESOURCE_GROUP: saas-rg  # ← Your Azure resource group
  AZURE_CONTAINER_APP_NAME: saas-backend  # ← Your app name
```

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Add Docker deployment pipeline"
git push origin main
```

✅ **Done!** GitHub Actions will:
1. Build the backend image
2. Push to GitHub Container Registry
3. Deploy to Azure Container Apps

### Step 4: Configure Frontend (Vercel)

In your Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://saas-backend.azurecontainerapps.io
```

---

## 🖥️ VPS/Self-Hosted (Alternative)

### Prerequisites

- VPS/VM with Ubuntu 22.04+
- Docker installed
- Domain pointed to server

### One-Command Deploy

```bash
# 1. Clone repo
git clone <your-repo> && cd SaaS-Boilerplate

# 2. Setup environment
cp .env.docker.prod .env.production
nano .env.production  # Edit with your values

# 3. Deploy
docker-compose -f docker/docker-compose.prod.yml pull
docker-compose -f docker/docker-compose.prod.yml up -d

# ✅ Backend: http://your-server-ip:3001
```

### Enable Auto-Updates via GitHub Actions

Add these secrets to GitHub:

```
VPS_HOST=your.server.ip
VPS_USERNAME=ubuntu
VPS_SSH_KEY=<your-private-ssh-key>
```

Edit `.github/workflows/backend-deploy.yml` and set:

```yaml
deploy-vps:
  if: true  # ← Change from false to true
```

---

## 🎯 Common Commands

### Development

```bash
# Start dev environment
docker-compose -f docker/docker-compose.dev.yml up -d

# View backend logs
docker-compose -f docker/docker-compose.dev.yml logs -f backend

# Restart backend
docker-compose -f docker/docker-compose.dev.yml restart backend

# Stop everything
docker-compose -f docker/docker-compose.dev.yml down
```

### Production

```bash
# Pull latest images
docker-compose -f docker/docker-compose.prod.yml pull

# Start services
docker-compose -f docker/docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker/docker-compose.prod.yml --profile migrate up migrate

# Health check
curl http://localhost:3001/health

# View logs
docker-compose -f docker/docker-compose.prod.yml logs -f backend
```

---

## 🔑 Environment Variables Checklist

### Development (`.env`)

```env
# PostgreSQL
✅ POSTGRES_USER=user
✅ POSTGRES_PASSWORD=password
✅ POSTGRES_DB=saas
✅ POSTGRES_PORT=5432
✅ DATABASE_URL=postgresql://user:password@postgres:5432/saas

# Backend
✅ BACKEND_PORT=3001
✅ NODE_ENV=development
✅ CORS_ORIGINS=http://localhost:3000

# Authentication
✅ JWT_SECRET=your-dev-jwt-secret-key-change-this
✅ CLERK_SECRET_KEY=your_clerk_secret_key_here
✅ CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# API & Logging
✅ API_KEY=dev-api-key-12345
✅ LOG_LEVEL=debug

# Optional
✅ DRIZZLE_STUDIO_PORT=5555
```

### Production (`.env.production`)

```env
# Container Registry
⚠️ CONTAINER_REGISTRY=ghcr.io/username/repo
⚠️ IMAGE_TAG=latest

# PostgreSQL (CHANGE PASSWORDS!)
⚠️ POSTGRES_USER=prod_admin
⚠️ POSTGRES_PASSWORD=<strong-password>
⚠️ POSTGRES_DB=saas_production
⚠️ POSTGRES_PORT=5432
⚠️ DATABASE_URL=postgresql://prod_admin:<password>@postgres:5432/saas_production

# Backend
⚠️ BACKEND_PORT=3001
⚠️ NODE_ENV=production

# CORS & Security
⚠️ CORS_ORIGINS=https://yourdomain.com,https://your-vercel-app.vercel.app
⚠️ JWT_SECRET=<random-64-chars>
⚠️ API_KEY=<random-api-key>

# Authentication (Clerk)
⚠️ CLERK_SECRET_KEY=sk_live_...
⚠️ CLERK_PUBLISHABLE_KEY=pk_live_...

# Logging
⚠️ LOG_LEVEL=info

# Data Storage
⚠️ DATA_PATH=/var/lib/saas/data/postgres

# NGINX (if using --profile nginx)
⚠️ NGINX_HTTP_PORT=80
⚠️ NGINX_HTTPS_PORT=443
⚠️ DOMAIN_NAME=api.yourdomain.com
```

---

## 🧪 Testing Your Deployment

### 1. Health Check

```bash
curl http://localhost:3001/health
# Expected: {"status":"OK","message":"Server is running",...}
```

### 2. API Test

```bash
curl http://localhost:3001/api/posts
# Expected: List of posts or empty array
```

### 3. Database Connection

```bash
docker exec -it saas_postgres_prod psql -U user -d saas -c "SELECT version();"
# Expected: PostgreSQL version info
```

---

## 🆘 Troubleshooting

### Backend won't start?

```bash
# Check logs
docker-compose -f docker/docker-compose.prod.yml logs backend

# Common fixes:
# 1. Wrong DATABASE_URL → Check .env.production
# 2. Port in use → Stop conflicting service: lsof -i :3001
# 3. Image not found → Check CONTAINER_REGISTRY in .env.production
```

### Can't connect to database?

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Test connection
docker exec -it saas_postgres_prod psql -U user -d saas

# Verify DATABASE_URL format:
# postgresql://username:password@host:5432/database
```

### Image pull failed?

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Make package public: GitHub → Packages → saas-backend → Package settings → Change visibility
```

---

## 📊 Resource Requirements

### Minimum (Development)

- CPU: 2 cores
- RAM: 2GB
- Disk: 10GB

### Recommended (Production)

- CPU: 2-4 cores
- RAM: 4GB
- Disk: 20GB SSD

### Azure Container Apps (Pay-as-you-go)

- **Free Tier**: 180,000 vCPU-seconds + 360,000 GiB-seconds/month
- **Estimated Cost**: ~$10-30/month for small app

---

## 🎓 Next Steps

1. ✅ **Deploy Backend** (you're here!)
2. 📱 **Deploy Frontend** to Vercel
3. 🔐 **Configure Clerk** authentication
4. 🌐 **Set up Custom Domain** in Cloudflare
5. 📊 **Add Monitoring** (Sentry, LogTail)
6. 🚀 **Scale** as needed

---

## 🔗 Quick Links

- [Full Documentation](./README.md)
- [Azure Portal](https://portal.azure.com)
- [GitHub Actions](https://github.com/your-repo/actions)
- [Docker Hub](https://hub.docker.com)

---

**Questions?** Check the [FAQ](./README.md#-faq) or [Troubleshooting](./README.md#-troubleshooting) sections!
