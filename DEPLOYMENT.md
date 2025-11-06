# 🚀 Deployment Pipeline Summary

This document provides an overview of the complete
Docker deployment pipeline for the SaaS Blog Web App.

---

## 📁 File Structure

```
SaaS-Boilerplate/
├── docker/
│   ├── Dockerfile.backend              # Multi-stage production Dockerfile
│   ├── docker-compose.yml              # Local dev (PostgreSQL only)
│   ├── docker-compose.dev.yml          # Full dev environment
│   ├── docker-compose.prod.yml         # Production (registry-based)
│   ├── nginx.conf                      # NGINX main config
│   ├── nginx-prod.conf                 # NGINX production site config
│   ├── README.md                       # Complete deployment guide
│   ├── QUICK_START.md                  # Quick start guide
│   ├── DEPLOYMENT_CHECKLIST.md         # Pre-deployment checklist
│   └── scripts/
│       └── test-deployment.sh          # Deployment testing script
├── .github/
│   └── workflows/
│       └── backend-deploy.yml          # CI/CD pipeline
├── server/
│   └── .dockerignore                   # Backend Docker ignore rules
├── .dockerignore                       # Root Docker ignore rules
├── .env.docker.dev                     # Dev environment template
├── .env.docker.prod                    # Prod environment template
└── DEPLOYMENT.md                       # This file
```

---

## 🎯 Deployment Architecture

### Frontend (Vercel)

- **Platform**: Vercel
- **Framework**: Next.js 15
- **Port**: 3000
- **Deployment**: Automatic via Vercel GitHub integration

### Backend (Containerized)

- **Platform**: Azure Container Apps / VPS / Self-hosted
- **Framework**: Express.js
- **Port**: 3001
- **Deployment**: Docker container via GitHub Actions

### Database (Containerized)

- **Database**: PostgreSQL 16
- **Port**: 5432
- **Deployment**: Docker container with persistent volumes

---

## 🔄 Deployment Workflows

### 1. Local Development (Fast)

**Use Case**: Quick development without Docker

```bash
# Start PostgreSQL only
docker-compose -f docker/docker-compose.yml up -d

# Run backend locally
cd server && npm run dev
```

**Services**:

- ✅ PostgreSQL: `localhost:5432`
- ✅ Backend: Run on host machine
- ✅ Frontend: Run on host machine or Vercel

---

### 2. Development Environment (Full Docker)

**Use Case**: Test complete containerized setup

#### Option A: With External Database (Neon, Supabase)

```bash
# Setup environment with external database URL
cp .env.docker.dev .env
nano .env  # Set DATABASE_URL to your Neon/Supabase URL

# Run migrations
cd server && npx drizzle-kit migrate && cd ..

# Start backend only
docker-compose -f docker/docker-compose.dev.yml up -d
```

**Services**:
- ✅ Backend: `localhost:3001` (with hot reload)
- ✅ Database: External (Neon/Supabase)
- ✅ Drizzle Studio: `localhost:5555` (optional, use `--profile studio`)

#### Option B: With Local PostgreSQL

```bash
# Copy environment file
cp .env.docker.dev .env

# Start all services with database profile
docker-compose -f docker/docker-compose.dev.yml --profile database up -d

# Test deployment
./docker/scripts/test-deployment.sh dev
```

**Services**:
- ✅ PostgreSQL: `localhost:5432` (local container)
- ✅ Backend: `localhost:3001` (with hot reload)
- ✅ Drizzle Studio: `localhost:5555` (optional, use `--profile studio`)

---

### 3. Production Deployment

**Use Case**: Production-ready deployment with registry images

#### Option A: With External Database (Recommended)

```bash
# Setup environment
cp .env.docker.prod .env.production
nano .env.production  # Set DATABASE_URL to your managed database

# Run migrations from host
cd server
export DATABASE_URL="postgresql://user:pass@neon-host.com:5432/dbname?sslmode=require"
npx drizzle-kit migrate
cd ..

# Pull images and start backend only
docker-compose -f docker/docker-compose.prod.yml pull
docker-compose -f docker/docker-compose.prod.yml up -d

# Test deployment
curl http://localhost:3001/health
```

**Services**:
- ✅ Backend: `localhost:3001` (production build)
- ✅ Database: External managed service (Neon/Azure PostgreSQL/etc.)
- ✅ NGINX: `localhost:80/443` (optional, use `--profile nginx`)

#### Option B: With Local PostgreSQL

```bash
# Setup environment
cp .env.docker.prod .env.production
nano .env.production  # Edit with production values

# Pull images and start with database profile
docker-compose -f docker/docker-compose.prod.yml pull
docker-compose -f docker/docker-compose.prod.yml --profile database up -d

# Run migrations
docker-compose -f docker/docker-compose.prod.yml --profile database --profile migrate up migrate

# Test deployment
./docker/scripts/test-deployment.sh prod
```

**Services**:
- ✅ PostgreSQL: `localhost:5432` (local container with persistent volume)
- ✅ Backend: `localhost:3001` (production build)
- ✅ NGINX: `localhost:80/443` (optional, use `--profile nginx`)

---

## 🤖 CI/CD Pipeline (GitHub Actions)

### Trigger Events

- **Push to `main`**: Build → Push → Deploy to Production
- **Push to `develop`**: Build → Push → Deploy to Staging
- **Pull Request**: Build → Test (no deployment)
- **Manual**: Via GitHub Actions UI

### Pipeline Steps

1. **Build & Test**
   - Install dependencies
   - Build TypeScript
   - Run tests (if configured)

2. **Docker Build**
   - Multi-stage build for optimization
   - Tag with branch/version/sha
   - Cache layers for faster builds

3. **Push to Registry**
   - GitHub Container Registry (default)
   - Azure Container Registry (optional)
   - Docker Hub (optional)

4. **Deploy**
   - Azure Container Apps (automatic)
   - VPS via SSH (optional)

5. **Security Scan**
   - Trivy vulnerability scanner
   - Upload results to GitHub Security

### Required Secrets

Add in **GitHub → Settings → Secrets**:

**For Azure Deployment**:

- `AZURE_CREDENTIALS` - Service principal JSON

**For VPS Deployment**:

- `VPS_HOST` - Server IP
- `VPS_USERNAME` - SSH user
- `VPS_SSH_KEY` - Private key
- `VPS_PORT` - SSH port (optional)

**For Alternative Registries**:

- `ACR_REGISTRY`, `ACR_USERNAME`, `ACR_PASSWORD` - Azure Container Registry
- `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` - Docker Hub

---

## 🌐 Domain Configuration

### Cloudflare DNS Setup

**For Azure Container Apps**:

```conf
Type: CNAME
Name: api (subdomain)
Target: <container-app-fqdn>.azurecontainerapps.io
Proxy: Enabled (orange cloud)
```

**For VPS/Self-Hosted**:

```conf
Type: A
Name: api (subdomain)
IPv4: <vps-ip-address>
Proxy: Enabled (orange cloud)
```

### SSL/TLS

- **Cloudflare**: SSL/TLS mode set to "Full" or "Full (strict)"
- **NGINX**: Optional, if not using Cloudflare proxy

---

## 📊 Resource Requirements

### Minimum (Development)

- **CPU**: 2 cores
- **RAM**: 2 GB
- **Disk**: 10 GB

### Recommended (Production)

- **CPU**: 2-4 cores
- **RAM**: 4-8 GB
- **Disk**: 20 GB SSD
- **Network**: 100 Mbps+

### Azure Container Apps Pricing

- **Free Tier**: 180,000 vCPU-seconds/month
- **Estimated Cost**: $10-30/month for small apps

---

## 🔧 Common Operations

### View Logs

```bash
# All services
docker-compose -f docker/docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker/docker-compose.prod.yml logs -f backend
```

### Restart Services

```bash
# All services
docker-compose -f docker/docker-compose.prod.yml restart

# Specific service
docker-compose -f docker/docker-compose.prod.yml restart backend
```

### Update to Latest Version

```bash
# Pull latest images
docker-compose -f docker/docker-compose.prod.yml pull

# Restart with new images (zero downtime)
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Database Backup

```bash
# Backup
docker exec saas_postgres_prod pg_dump -U user saas > backup-$(date +%F).sql

# Restore
docker exec -i saas_postgres_prod psql -U user saas < backup-2025-11-06.sql
```

### Shell Access

```bash
# Backend container
docker-compose -f docker/docker-compose.prod.yml exec backend sh

# PostgreSQL
docker-compose -f docker/docker-compose.prod.yml exec postgres psql -U user -d saas
```

---

## 🎯 Quick Reference

### Development Commands

```bash
# Start dev environment
docker-compose -f docker/docker-compose.dev.yml up -d

# Stop dev environment
docker-compose -f docker/docker-compose.dev.yml down

# Rebuild backend
docker-compose -f docker/docker-compose.dev.yml build backend

# View logs
docker-compose -f docker/docker-compose.dev.yml logs -f backend
```

### Production Commands

```bash
# Deploy production
docker-compose -f docker/docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker/docker-compose.prod.yml --profile migrate up migrate

# Enable NGINX
docker-compose -f docker/docker-compose.prod.yml --profile nginx up -d

# Stop production
docker-compose -f docker/docker-compose.prod.yml down
```

### Testing Commands

```bash
# Test local environment
./docker/scripts/test-deployment.sh local

# Test dev environment
./docker/scripts/test-deployment.sh dev

# Test prod environment
./docker/scripts/test-deployment.sh prod
```

---

## 📚 Documentation Links

- **Complete Guide**: [`docker/README.md`](docker/README.md)
- **Quick Start**: [`docker/QUICK_START.md`](docker/QUICK_START.md)
- **Deployment Checklist**: [`docker/DEPLOYMENT_CHECKLIST.md`](docker/DEPLOYMENT_CHECKLIST.md)
- **GitHub Actions**: [`.github/workflows/backend-deploy.yml`](.github/workflows/backend-deploy.yml)

---

## 🆘 Troubleshooting

### Container Won't Start

1. Check logs: `docker-compose -f docker/docker-compose.prod.yml logs backend`
2. Verify environment variables in `.env.production`
3. Ensure DATABASE_URL is correct
4. Check if port 3001 is available

### Database Connection Failed

1. Verify PostgreSQL is running: `docker ps | grep postgres`
2. Test connection: `docker exec -it saas_postgres_prod psql -U user -d saas`
3. Check DATABASE_URL format: `postgresql://user:password@host:5432/database`

### Image Pull Failed

1. Login to registry: `docker login ghcr.io`
2. Verify image exists: `docker pull ghcr.io/username/repo/saas-backend:latest`
3. Check package visibility in GitHub

### High Memory Usage

1. Check resource usage: `docker stats`
2. Adjust limits in `docker-compose.prod.yml`
3. Restart container: `docker-compose -f docker/docker-compose.prod.yml restart backend`

---

## ✅ Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables configured in `.env.production`
- [ ] Strong passwords for PostgreSQL and JWT_SECRET
- [ ] CORS_ORIGINS includes production Vercel domain
- [ ] GitHub secrets configured for CI/CD
- [ ] Database migrations tested
- [ ] Domain DNS configured
- [ ] SSL/TLS enabled via Cloudflare
- [ ] Backup strategy in place
- [ ] Monitoring set up (optional)

---

## 🎓 Next Steps

1. **Deploy Backend**: Follow [`docker/QUICK_START.md`](docker/QUICK_START.md)
2. **Deploy Frontend**: Push to Vercel with backend URL
3. **Configure Domain**: Set up custom domain via Cloudflare
4. **Enable Monitoring**: Set up Sentry, LogTail, etc. (optional)
5. **Set Up Backups**: Configure automated database backups
6. **Scale**: Add more replicas as traffic grows

---

## 🙏 Support

For issues or questions:

1. Check documentation in `docker/README.md`
2. Review troubleshooting section
3. Check container logs
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**

*Last Updated: 2025-11-06*
