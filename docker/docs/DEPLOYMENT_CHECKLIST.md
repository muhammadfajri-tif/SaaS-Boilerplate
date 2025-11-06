# ✅ Deployment Checklist

Use this checklist to ensure a smooth deployment process.

---

## 📋 Pre-Deployment

### Repository Setup

- [ ] Code is committed and pushed to GitHub
- [ ] `.gitignore` excludes sensitive files (`.env`, `.env.production`)
- [ ] All dependencies are listed in `package.json`
- [ ] Backend builds successfully (`npm run build` in `server/`)

### Container Registry

Choose one and complete its checklist:

#### Option A: GitHub Container Registry (GHCR) - Free ✅

- [ ] Repository is public OR
- [ ] GitHub personal access token created with `write:packages` scope
- [ ] Package visibility set to public (after first push)

#### Option B: Azure Container Registry (ACR)

- [ ] ACR created in Azure Portal
- [ ] Admin access enabled
- [ ] Registry credentials saved
- [ ] GitHub secrets configured: `ACR_REGISTRY`, `ACR_USERNAME`, `ACR_PASSWORD`

#### Option C: Docker Hub

- [ ] Docker Hub account created
- [ ] Access token generated
- [ ] GitHub secrets configured: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`

---

## 🔑 Secrets & Environment Variables

### GitHub Secrets (Required)

Go to **GitHub → Settings → Secrets and variables → Actions**

#### For Azure Deployment:

- [ ] `AZURE_CREDENTIALS` - Service principal JSON
  ```bash
  az ad sp create-for-rbac --name "github-saas" --role contributor \
    --scopes /subscriptions/{sub-id} --sdk-auth
  ```

#### For VPS Deployment:

- [ ] `VPS_HOST` - Server IP address
- [ ] `VPS_USERNAME` - SSH username (e.g., ubuntu)
- [ ] `VPS_SSH_KEY` - Private SSH key content
- [ ] `VPS_PORT` - SSH port (default: 22)

### Environment Variables (.env.production)

- [ ] Copy `.env.docker.prod` to `.env.production`
- [ ] Update `CONTAINER_REGISTRY` with your registry URL
- [ ] Generate strong `POSTGRES_PASSWORD` (32+ characters)
- [ ] Generate random `JWT_SECRET` (64 characters)
  ```bash
  openssl rand -base64 48
  ```
- [ ] Add Clerk keys: `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`
- [ ] Set `CORS_ORIGINS` with Vercel domain
- [ ] Update `API_KEY` with random string
- [ ] Set `DATABASE_URL` with correct credentials

---

## 🏗️ Infrastructure Setup

### Option A: Azure Container Apps

- [ ] Azure subscription active
- [ ] Azure CLI installed and logged in
  ```bash
  az login
  ```
- [ ] Resource group created
  ```bash
  az group create --name saas-rg --location eastus
  ```
- [ ] Container Apps environment created
  ```bash
  az containerapp env create --name saas-env --resource-group saas-rg --location eastus
  ```
- [ ] PostgreSQL database created (Azure Database for PostgreSQL)
  ```bash
  az postgres flexible-server create --name saas-db --resource-group saas-rg --location eastus
  ```
- [ ] Database firewall configured to allow Azure services
- [ ] Database connection string tested

### Option B: VPS/Self-Hosted

- [ ] VPS/VM provisioned (minimum: 2 CPU, 4GB RAM, 20GB disk)
- [ ] Ubuntu 22.04+ installed
- [ ] Docker installed
  ```bash
  curl -fsSL https://get.docker.com | sh
  ```
- [ ] Docker Compose installed
  ```bash
  sudo apt install docker-compose-plugin
  ```
- [ ] User added to docker group
  ```bash
  sudo usermod -aG docker $USER
  ```
- [ ] Firewall configured (ports: 22, 80, 443, 3001)
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw allow 3001/tcp
  sudo ufw enable
  ```
- [ ] SSH key authentication configured
- [ ] Deployment directory created
  ```bash
  sudo mkdir -p /opt/saas-backend
  sudo chown $USER:$USER /opt/saas-backend
  ```

---

## 🚀 GitHub Actions Workflow

### Workflow Configuration

- [ ] Edit `.github/workflows/backend-deploy.yml`
- [ ] Update `REGISTRY` (ghcr.io, azurecr.io, or docker.io)
- [ ] Update `IMAGE_NAME` with your repository name
- [ ] Update `AZURE_RESOURCE_GROUP` (if using Azure)
- [ ] Update `AZURE_CONTAINER_APP_NAME` (if using Azure)
- [ ] Enable appropriate deployment job:
  - [ ] `deploy-azure` for Azure Container Apps
  - [ ] `deploy-vps` for VPS/self-hosted (set `if: true`)

### Test Workflow

- [ ] Commit changes
  ```bash
  git add .github/workflows/backend-deploy.yml
  git commit -m "Configure deployment workflow"
  git push origin main
  ```
- [ ] Monitor GitHub Actions run
- [ ] Check for build errors
- [ ] Verify image pushed to registry
- [ ] Confirm deployment succeeded

---

## 🗄️ Database Setup

### Migrations

- [ ] Database schema is up to date
- [ ] Migration files are in `migrations/` directory
- [ ] Test migrations locally
  ```bash
  npm run db:migrate
  ```

### Production Database

#### If using Docker Compose:

- [ ] Run migrations via Docker
  ```bash
  docker-compose -f docker/docker-compose.prod.yml --profile migrate up migrate
  ```

#### If using Azure Database:

- [ ] Connect to Azure database
- [ ] Run migrations manually or via CI/CD
  ```bash
  DATABASE_URL="postgresql://..." npx drizzle-kit migrate
  ```

### Data Seeding (Optional)

- [ ] Seed initial data if needed
  ```bash
  npm run db:seed
  ```

---

## 🌐 Domain & DNS

### Domain Configuration

- [ ] Domain registered
- [ ] DNS managed by Cloudflare (recommended)
- [ ] SSL/TLS set to "Full" or "Full (strict)" in Cloudflare

### DNS Records

#### For Azure Container Apps:

- [ ] Get Container App FQDN
  ```bash
  az containerapp show --name saas-backend --resource-group saas-rg \
    --query properties.configuration.ingress.fqdn
  ```
- [ ] Add CNAME record in Cloudflare:
  ```
  Type: CNAME
  Name: api (or your subdomain)
  Target: <container-app-fqdn>
  Proxy: Enabled (orange cloud)
  ```
- [ ] Add custom domain in Azure
  ```bash
  az containerapp hostname add --name saas-backend --resource-group saas-rg \
    --hostname api.yourdomain.com
  ```

#### For VPS:

- [ ] Add A record in Cloudflare:
  ```
  Type: A
  Name: api (or your subdomain)
  IPv4: <your-vps-ip>
  Proxy: Enabled (orange cloud)
  ```

### SSL/TLS

- [ ] Cloudflare SSL/TLS configured
- [ ] Edge certificates active (automatic)
- [ ] Test HTTPS connection
  ```bash
  curl https://api.yourdomain.com/health
  ```

---

## 🔍 Testing & Validation

### API Health Checks

- [ ] Health endpoint responds
  ```bash
  curl https://api.yourdomain.com/health
  # Expected: {"status":"OK",...}
  ```
- [ ] API endpoints work
  ```bash
  curl https://api.yourdomain.com/api/posts
  ```

### Database Connectivity

- [ ] Backend can connect to database (check logs)
- [ ] Queries execute successfully
- [ ] No connection pool errors

### Frontend Integration

- [ ] Update Vercel environment variables
  ```
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  ```
- [ ] Redeploy Vercel app
- [ ] Test API calls from frontend
- [ ] Verify CORS is working

### Performance

- [ ] Response times acceptable (< 500ms)
- [ ] No memory leaks
- [ ] CPU usage normal (< 50% under load)
- [ ] Database queries optimized

### Security

- [ ] Secrets not exposed in logs
- [ ] HTTPS enabled everywhere
- [ ] CORS configured correctly
- [ ] Rate limiting working (if implemented)
- [ ] Security headers present
  ```bash
  curl -I https://api.yourdomain.com
  ```

---

## 📊 Monitoring & Logging

### Basic Monitoring

- [ ] Container health checks passing
  ```bash
  docker ps  # Status should be "healthy"
  ```
- [ ] Logs accessible
  ```bash
  docker-compose -f docker/docker-compose.prod.yml logs -f backend
  ```

### Azure (if applicable)

- [ ] Container Apps logs enabled
- [ ] Application Insights configured (optional)
- [ ] Alerts set up for failures

### Optional: Advanced Monitoring

- [ ] Sentry configured for error tracking
- [ ] LogTail for centralized logging
- [ ] Uptime monitoring (UptimeRobot, etc.)

---

## 🔄 Post-Deployment

### Documentation

- [ ] Document deployment process for team
- [ ] Create runbook for common issues
- [ ] Update README with production URLs

### Backups

- [ ] Database backup strategy in place
  ```bash
  # Manual backup
  docker exec saas_postgres_prod pg_dump -U user saas > backup-$(date +%F).sql
  ```
- [ ] Automated backups configured (cron job)
- [ ] Backup restoration tested

### Rollback Plan

- [ ] Know how to rollback to previous version
  ```bash
  # Pull specific version
  docker pull ghcr.io/username/repo/saas-backend:previous-tag
  ```
- [ ] Database rollback plan documented
- [ ] Downtime communication plan

### Team Handoff

- [ ] Share access credentials securely
- [ ] Document architecture and workflows
- [ ] Schedule knowledge transfer session

---

## 🎉 Go Live

### Final Checks

- [ ] All above items completed
- [ ] Stakeholders notified
- [ ] Monitoring dashboard open
- [ ] Team available for support

### Launch

- [ ] Switch DNS to production (if applicable)
- [ ] Monitor for first hour
- [ ] Check error rates
- [ ] Verify user flows

### Post-Launch

- [ ] Monitor for 24 hours
- [ ] Address any issues immediately
- [ ] Collect feedback
- [ ] Celebrate! 🎊

---

## 📞 Emergency Contacts

Document key contacts:

- **DevOps Lead**: _______________
- **Backend Developer**: _______________
- **Azure Support**: [Azure Portal](https://portal.azure.com)
- **Cloudflare Support**: [Cloudflare Dashboard](https://dash.cloudflare.com)

---

## 🔧 Common Issues & Quick Fixes

### Issue: Container won't start

```bash
# Check logs
docker logs <container-id>

# Common fixes:
# 1. Check environment variables
# 2. Verify database connection
# 3. Ensure image pulled correctly
```

### Issue: Database connection failed

```bash
# Test database connectivity
docker exec -it saas_postgres_prod psql -U user -d saas

# Verify DATABASE_URL format
# Should be: postgresql://user:password@host:5432/database
```

### Issue: High memory usage

```bash
# Check resource usage
docker stats

# Restart container
docker-compose -f docker/docker-compose.prod.yml restart backend
```

---

**Pro Tip**: Keep this checklist handy and check off items as you complete them. Don't skip steps!

Good luck with your deployment! 🚀
