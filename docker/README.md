# 🐳 Docker Deployment Guide

Complete guide for deploying the SaaS Blog Web App using Docker and containerization.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Azure Container Apps Deployment](#azure-container-apps-deployment)
- [VPS/Self-Hosted Deployment](#vpsself-hosted-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## 🎯 Overview

This project uses a containerized architecture with the following components:

- **Frontend**: Next.js (deployed on Vercel)
- **Backend**: Express.js (containerized)
- **Database**: PostgreSQL (containerized)
- **Optional**: NGINX reverse proxy

**Deployment Environments:**

1. **Local** (`docker-compose.yml`) - PostgreSQL only for fast development
2. **Development** (`docker-compose.dev.yml`) - PostgreSQL + Backend with hot reload
3. **Production** (`docker-compose.prod.yml`) - Production-ready setup with registry images

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────┐
│                    Vercel Cloud                    │
│  ┌──────────────────────────────────────────────┐  │
│  │         Next.js Frontend (Port 3000)         │  │
│  └─────────────────┬────────────────────────────┘  │
└────────────────────┼───────────────────────────────┘
                     │ API Calls
                     ▼
┌───────────────────────────────────────────────────┐
│         Azure Container Apps / VPS / VM           │
│                                                   │
│  ┌────────────────────────────────────────────┐   │
│  │   NGINX Reverse Proxy (Optional)           │   │
│  │         Port 80/443                        │   │
│  └──────────────┬─────────────────────────────┘   │
│                 │                                 │
│  ┌──────────────▼───────────────────────────┐     │
│  │   Express Backend (Port 3001)            │     │
│  │   - REST API                             │     │
│  │   - Business Logic                       │     │
│  └──────────────┬───────────────────────────┘     │
│                 │                                 │
│  ┌──────────────▼───────────────────────────┐     │
│  │   PostgreSQL Database (Port 5432)        │     │
│  │   - Persistent Volume                    │     │
│  └──────────────────────────────────────────┘     │
└───────────────────────────────────────────────────┘
```

---

## ✅ Prerequisites

### Required Software

- **Docker**: v24.0 or higher
- **Docker Compose**: v2.20 or higher
- **Git**: For version control
- **Node.js**: v20 (for local development only)

### Required Accounts & Services

- **GitHub Account**: For CI/CD pipeline
- **Container Registry**: One of the following:
  - GitHub Container Registry (GHCR) - Free
  - Azure Container Registry (ACR)
  - Docker Hub
- **Deployment Target** (choose one):
  - Azure Container Apps (Recommended)
  - Azure Container Instances
  - VPS/VM (any provider)
  - Self-hosted server

### Optional

- **Cloudflare Account**: For DNS and SSL management
- **Vercel Account**: For frontend deployment (Next.js)

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd SaaS-Boilerplate
```

### 2. Set Up Environment Variables

For **development**:

```bash
cp .env.docker.dev .env
# Edit .env with your local settings
```

For **production**:

```bash
cp .env.docker.prod .env.production
# Edit .env.production with production credentials
```

### 3. Start Services

**Local (Database only)**:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

**Development (Database + Backend)**:

```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

**Production**:

```bash
docker-compose -f docker/docker-compose.prod.yml up -d
```

---

## 💻 Development Setup

### Step 1: Start Local Database

For fast development, run only PostgreSQL locally:

```bash
# Start PostgreSQL
docker-compose -f docker/docker-compose.yml up -d

# Verify it's running
docker ps
```

Your backend and frontend run on your host machine (not in Docker) for faster development.

### Step 2: Full Development Environment

To test the full containerized setup:

```bash
# Start all services (PostgreSQL + Backend + Drizzle Studio)
docker-compose -f docker/docker-compose.dev.yml up -d

# View logs
docker-compose -f docker/docker-compose.dev.yml logs -f backend

# Access services:
# - Backend API: http://localhost:3001
# - Health check: http://localhost:3001/health
# - PostgreSQL: localhost:5432
```

### Step 3: Enable Drizzle Studio (Optional)

```bash
# Start with Drizzle Studio
docker-compose -f docker/docker-compose.dev.yml --profile studio up -d

# Access Drizzle Studio: http://localhost:5555
```

### Useful Development Commands

```bash
# Rebuild backend image
docker-compose -f docker/docker-compose.dev.yml build backend

# Restart backend only
docker-compose -f docker/docker-compose.dev.yml restart backend

# View backend logs
docker-compose -f docker/docker-compose.dev.yml logs -f backend

# Execute command in backend container
docker-compose -f docker/docker-compose.dev.yml exec backend sh

# Stop all services
docker-compose -f docker/docker-compose.dev.yml down

# Stop and remove volumes (⚠️ deletes data)
docker-compose -f docker/docker-compose.dev.yml down -v
```

---

## 🏭 Production Deployment

### Overview

Production deployment pulls pre-built images from a container registry (not building locally).

**Workflow**:

1. GitHub Actions builds the backend image
2. Image is pushed to container registry (GHCR, ACR, etc.)
3. Production server pulls and runs the image

### Step 1: Configure Environment Variables

Create `.env.production` on your production server:

```bash
# Copy template
cp .env.docker.prod .env.production

# Edit with production values
nano .env.production
```

**Critical settings to update**:

```env
# Container Registry
CONTAINER_REGISTRY=ghcr.io/yourusername/yourrepo
IMAGE_TAG=latest

# Database (CHANGE PASSWORDS!)
POSTGRES_USER=prod_admin
POSTGRES_PASSWORD=your_strong_password_here
POSTGRES_DB=saas_production
POSTGRES_PORT=5432
DATABASE_URL=postgresql://prod_admin:your_strong_password_here@postgres:5432/saas_production

# Backend Configuration
BACKEND_PORT=3001
NODE_ENV=production

# CORS & Security
CORS_ORIGINS=https://yourdomain.com,https://your-vercel-app.vercel.app
JWT_SECRET=your_64_character_random_string
API_KEY=your_random_api_key

# Authentication (Clerk)
CLERK_SECRET_KEY=sk_live_xxxxx
CLERK_PUBLISHABLE_KEY=pk_live_xxxxx

# Logging
LOG_LEVEL=info

# Data Storage Path
DATA_PATH=/var/lib/saas/data/postgres

# NGINX Configuration (Optional - if using --profile nginx)
NGINX_HTTP_PORT=80
NGINX_HTTPS_PORT=443
DOMAIN_NAME=api.yourdomain.com
```

### Step 2: Set Up Data Directory

```bash
# Create directory for PostgreSQL data
sudo mkdir -p /var/lib/saas/data/postgres
sudo chown -R 1001:1001 /var/lib/saas/data/postgres

# Update .env.production
echo "DATA_PATH=/var/lib/saas/data/postgres" >> .env.production
```

### Step 3: Run Database Migrations

```bash
# Run migrations (one-time setup)
docker-compose -f docker/docker-compose.prod.yml --profile migrate up migrate

# Check migration logs
docker-compose -f docker/docker-compose.prod.yml logs migrate
```

### Step 4: Start Production Services

```bash
# Pull latest images
docker-compose -f docker/docker-compose.prod.yml pull

# Start services
docker-compose -f docker/docker-compose.prod.yml up -d

# Verify health
curl http://localhost:3001/health
```

### Step 5: Enable NGINX (Optional)

If you want NGINX reverse proxy:

```bash
# Start with NGINX
docker-compose -f docker/docker-compose.prod.yml --profile nginx up -d

# Services now available at:
# - http://yourdomain.com/api/* → Backend
# - http://yourdomain.com/health → Health check
```

### Production Monitoring

```bash
# Check service status
docker-compose -f docker/docker-compose.prod.yml ps

# View logs
docker-compose -f docker/docker-compose.prod.yml logs -f backend

# Check resource usage
docker stats

# Restart backend (zero downtime)
docker-compose -f docker/docker-compose.prod.yml up -d --no-deps --build backend
```

---

## ☁️ Azure Container Apps Deployment

### Prerequisites

1. **Azure CLI** installed: `az --version`
2. **Azure subscription** with permissions to create resources
3. **Container image** pushed to registry (via GitHub Actions)

### Step 1: Azure Login

```bash
az login
az account set --subscription "Your Subscription Name"
```

### Step 2: Create Resource Group

```bash
az group create \
  --name saas-rg \
  --location eastus
```

### Step 3: Create Container Apps Environment

```bash
az containerapp env create \
  --name saas-env \
  --resource-group saas-rg \
  --location eastus
```

### Step 4: Create PostgreSQL (Azure Database)

```bash
az postgres flexible-server create \
  --name saas-postgres-server \
  --resource-group saas-rg \
  --location eastus \
  --admin-user adminuser \
  --admin-password 'YourStrongPassword123!' \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 16
```

### Step 5: Deploy Backend Container

```bash
az containerapp create \
  --name saas-backend \
  --resource-group saas-rg \
  --environment saas-env \
  --image ghcr.io/yourusername/yourrepo/saas-backend:latest \
  --target-port 3001 \
  --ingress external \
  --env-vars \
    NODE_ENV=production \
    DATABASE_URL=secretref:database-url \
    CORS_ORIGINS=https://your-vercel-app.vercel.app \
    JWT_SECRET=secretref:jwt-secret \
  --secrets \
    database-url=postgresql://adminuser:YourStrongPassword123!@saas-postgres-server.postgres.database.azure.com:5432/saas \
    jwt-secret=your-jwt-secret \
  --cpu 0.5 \
  --memory 1Gi \
  --min-replicas 1 \
  --max-replicas 3
```

### Step 6: Configure Custom Domain (with Cloudflare)

```bash
# Get Container App FQDN
az containerapp show \
  --name saas-backend \
  --resource-group saas-rg \
  --query properties.configuration.ingress.fqdn

# Add CNAME in Cloudflare:
# api.yourdomain.com → <container-app-fqdn>

# Add custom domain to Container App
az containerapp hostname add \
  --name saas-backend \
  --resource-group saas-rg \
  --hostname api.yourdomain.com
```

### Step 7: Set Up GitHub Actions (Automated)

GitHub Actions workflow is already configured in `.github/workflows/backend-deploy.yml`.

**Required Secrets** (add in GitHub repository settings):

```
AZURE_CREDENTIALS={
  "clientId": "xxx",
  "clientSecret": "xxx",
  "subscriptionId": "xxx",
  "tenantId": "xxx"
}
```

To create Azure credentials:

```bash
az ad sp create-for-rbac \
  --name "github-actions-saas" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/saas-rg \
  --sdk-auth
```

---

## 🖥️ VPS/Self-Hosted Deployment

### Step 1: Prepare VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Step 2: Clone Repository

```bash
# Create deployment directory
sudo mkdir -p /opt/saas-backend
sudo chown $USER:$USER /opt/saas-backend
cd /opt/saas-backend

# Clone or pull latest
git clone <your-repo-url> .
```

### Step 3: Configure Environment

```bash
# Create production env file
cp .env.docker.prod .env.production
nano .env.production

# Set proper permissions
chmod 600 .env.production
```

### Step 4: Deploy

```bash
# Pull latest images
docker-compose -f docker/docker-compose.prod.yml pull

# Run migrations
docker-compose -f docker/docker-compose.prod.yml --profile migrate up migrate

# Start services
docker-compose -f docker/docker-compose.prod.yml up -d

# Enable auto-start on boot
docker update --restart always $(docker ps -q)
```

### Step 5: Set Up Systemd Service (Optional)

Create `/etc/systemd/system/saas-backend.service`:

```ini
[Unit]
Description=SaaS Backend Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/saas-backend
ExecStart=/usr/bin/docker-compose -f docker/docker-compose.prod.yml up -d
ExecStop=/usr/bin/docker-compose -f docker/docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Enable service:

```bash
sudo systemctl enable saas-backend
sudo systemctl start saas-backend
sudo systemctl status saas-backend
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The workflow in `.github/workflows/backend-deploy.yml` automates:

1. **Build & Test**: Compiles TypeScript, runs tests
2. **Docker Build**: Creates multi-stage Docker image
3. **Push to Registry**: Pushes to GHCR/ACR/Docker Hub
4. **Deploy**: Deploys to Azure/VPS (optional)
5. **Security Scan**: Scans for vulnerabilities

### Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

#### For GHCR (GitHub Container Registry)

- `GITHUB_TOKEN` - Automatically provided ✅

#### For Azure Container Registry

- `ACR_REGISTRY` - yourregistry.azurecr.io
- `ACR_USERNAME` - Registry username
- `ACR_PASSWORD` - Registry password

#### For Azure Deployment

- `AZURE_CREDENTIALS` - Service principal JSON (see Azure section)

#### For VPS Deployment

- `VPS_HOST` - Server IP address
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key
- `VPS_PORT` - SSH port (default: 22)

### Triggering Deployments

**Automatic**:

- Push to `main` → Production deployment
- Push to `develop` → Staging deployment
- Pull request → Build & test only

**Manual**:

```bash
# Go to GitHub → Actions → Backend CI/CD → Run workflow
# Choose environment: staging or production
```

### Monitoring Deployments

```bash
# View GitHub Actions logs
# Go to: https://github.com/username/repo/actions

# Check deployed image
docker pull ghcr.io/username/repo/saas-backend:latest
docker images

# Verify container
docker run --rm ghcr.io/username/repo/saas-backend:latest node --version
```

---

## 🔧 Troubleshooting

### Backend Container Won't Start

```bash
# Check logs
docker-compose -f docker/docker-compose.prod.yml logs backend

# Common issues:
# 1. Database connection - verify DATABASE_URL
# 2. Missing env vars - check .env.production
# 3. Port conflict - ensure port 3001 is free
```

### Database Connection Errors

```bash
# Test PostgreSQL connection
docker exec -it saas_postgres_prod psql -U prod_admin -d saas_production

# Check if database is healthy
docker-compose -f docker/docker-compose.prod.yml ps postgres

# Reset database (⚠️ DANGER - deletes all data!)
docker-compose -f docker/docker-compose.prod.yml down -v
```

### Image Pull Failures

```bash
# Login to registry
docker login ghcr.io -u USERNAME -p TOKEN

# Verify image exists
docker pull ghcr.io/username/repo/saas-backend:latest

# Check registry permissions
# GitHub: Settings → Packages → Package settings → Manage Actions access
```

### NGINX Not Working

```bash
# Check NGINX logs
docker-compose -f docker/docker-compose.prod.yml logs nginx

# Test NGINX config
docker exec saas_nginx_prod nginx -t

# Reload NGINX
docker exec saas_nginx_prod nginx -s reload
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Limit container resources (edit docker-compose.prod.yml)
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
```

---

## ❓ FAQ

### Q: Do I need NGINX if using Cloudflare?

**A**: No, Cloudflare can handle SSL/TLS and caching. NGINX is optional for additional control.

### Q: Can I deploy without GitHub Actions?

**A**: Yes! Manually build and push:

```bash
# Build
docker build -f docker/Dockerfile.backend -t myregistry/saas-backend:latest .

# Push
docker push myregistry/saas-backend:latest
```

### Q: How do I update to a new version?

**A**:

```bash
# Pull latest images
docker-compose -f docker/docker-compose.prod.yml pull

# Restart services (zero downtime)
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Q: How do I backup the database?

**A**:

```bash
# Backup
docker exec saas_postgres_prod pg_dump -U prod_admin saas_production > backup.sql

# Restore
docker exec -i saas_postgres_prod psql -U prod_admin saas_production < backup.sql
```

### Q: Can I run multiple environments on one server?

**A**: Yes! Use different compose files and ports:

```bash
# Staging
docker-compose -f docker/docker-compose.staging.yml up -d

# Production
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Q: How do I enable SSL/HTTPS?

**A**:

- **Cloudflare** (easiest): Let Cloudflare handle SSL
- **Let's Encrypt**: Use certbot in NGINX container
- **Custom certs**: Mount certs in NGINX volume

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [NGINX Configuration](https://nginx.org/en/docs/)

---

## 🆘 Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review container logs: `docker-compose logs -f`
3. Verify environment variables
4. Check [GitHub Issues](https://github.com/username/repo/issues)

---

**Happy Deploying! 🚀**
