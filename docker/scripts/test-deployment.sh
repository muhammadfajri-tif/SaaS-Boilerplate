#!/bin/bash

# =============================================================================
# Deployment Test Script
# =============================================================================
# This script tests your Docker deployment to ensure everything is working
#
# Usage:
#   chmod +x docker/scripts/test-deployment.sh
#   ./docker/scripts/test-deployment.sh [local|dev|prod]
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-dev}
BASE_URL="http://localhost:3001"
COMPOSE_FILE=""

# Determine compose file based on environment
case $ENVIRONMENT in
  local)
    COMPOSE_FILE="docker/docker-compose.yml"
    echo -e "${BLUE}Testing LOCAL environment (PostgreSQL only)${NC}"
    ;;
  dev)
    COMPOSE_FILE="docker/docker-compose.dev.yml"
    echo -e "${BLUE}Testing DEVELOPMENT environment${NC}"
    ;;
  prod)
    COMPOSE_FILE="docker/docker-compose.prod.yml"
    echo -e "${BLUE}Testing PRODUCTION environment${NC}"
    ;;
  *)
    echo -e "${RED}Invalid environment: $ENVIRONMENT${NC}"
    echo "Usage: $0 [local|dev|prod]"
    exit 1
    ;;
esac

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  SaaS Backend Deployment Test${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# =============================================================================
# Test 1: Check if Docker is running
# =============================================================================
echo -e "${BLUE}[1/8] Checking Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}✗ Docker is not running${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Docker is running${NC}"
echo ""

# =============================================================================
# Test 2: Check if docker-compose file exists
# =============================================================================
echo -e "${BLUE}[2/8] Checking docker-compose file...${NC}"
if [ ! -f "$COMPOSE_FILE" ]; then
  echo -e "${RED}✗ File not found: $COMPOSE_FILE${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Found: $COMPOSE_FILE${NC}"
echo ""

# =============================================================================
# Test 3: Check environment variables
# =============================================================================
echo -e "${BLUE}[3/8] Checking environment variables...${NC}"
if [ "$ENVIRONMENT" = "dev" ] || [ "$ENVIRONMENT" = "prod" ]; then
  ENV_FILE=".env"
  if [ "$ENVIRONMENT" = "prod" ]; then
    ENV_FILE=".env.production"
  fi
  
  if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}⚠ Warning: $ENV_FILE not found${NC}"
    echo -e "${YELLOW}  Creating from template...${NC}"
    if [ "$ENVIRONMENT" = "dev" ]; then
      cp .env.docker.dev "$ENV_FILE" 2>/dev/null || echo -e "${YELLOW}  Template not found, skipping...${NC}"
    else
      cp .env.docker.prod "$ENV_FILE" 2>/dev/null || echo -e "${YELLOW}  Template not found, skipping...${NC}"
    fi
  else
    echo -e "${GREEN}✓ Found: $ENV_FILE${NC}"
  fi
fi
echo ""

# =============================================================================
# Test 4: Check running containers
# =============================================================================
echo -e "${BLUE}[4/8] Checking running containers...${NC}"
RUNNING_CONTAINERS=$(docker-compose -f "$COMPOSE_FILE" ps --services --filter "status=running" 2>/dev/null || echo "")

if [ -z "$RUNNING_CONTAINERS" ]; then
  echo -e "${YELLOW}⚠ No containers running${NC}"
  echo -e "${YELLOW}  Start containers with: docker-compose -f $COMPOSE_FILE up -d${NC}"
else
  echo -e "${GREEN}✓ Running containers:${NC}"
  echo "$RUNNING_CONTAINERS" | while read -r service; do
    echo -e "  - $service"
  done
fi
echo ""

# =============================================================================
# Test 5: Check PostgreSQL
# =============================================================================
echo -e "${BLUE}[5/8] Testing PostgreSQL connection...${NC}"
POSTGRES_CONTAINER=$(docker-compose -f "$COMPOSE_FILE" ps -q postgres 2>/dev/null || echo "")

if [ -z "$POSTGRES_CONTAINER" ]; then
  echo -e "${YELLOW}⚠ PostgreSQL container not running${NC}"
else
  # Wait for PostgreSQL to be ready
  echo -e "  Waiting for PostgreSQL to be ready..."
  for i in {1..10}; do
    if docker exec "$POSTGRES_CONTAINER" pg_isready -U user > /dev/null 2>&1; then
      echo -e "${GREEN}✓ PostgreSQL is ready${NC}"
      break
    fi
    if [ $i -eq 10 ]; then
      echo -e "${RED}✗ PostgreSQL not responding${NC}"
    fi
    sleep 1
  done
fi
echo ""

# =============================================================================
# Test 6: Check Backend Container (if not local)
# =============================================================================
if [ "$ENVIRONMENT" != "local" ]; then
  echo -e "${BLUE}[6/8] Testing Backend container...${NC}"
  BACKEND_CONTAINER=$(docker-compose -f "$COMPOSE_FILE" ps -q backend 2>/dev/null || echo "")
  
  if [ -z "$BACKEND_CONTAINER" ]; then
    echo -e "${YELLOW}⚠ Backend container not running${NC}"
  else
    BACKEND_STATUS=$(docker inspect -f '{{.State.Status}}' "$BACKEND_CONTAINER")
    if [ "$BACKEND_STATUS" = "running" ]; then
      echo -e "${GREEN}✓ Backend container is running${NC}"
      
      # Check health status if available
      BACKEND_HEALTH=$(docker inspect -f '{{.State.Health.Status}}' "$BACKEND_CONTAINER" 2>/dev/null || echo "none")
      if [ "$BACKEND_HEALTH" != "none" ]; then
        if [ "$BACKEND_HEALTH" = "healthy" ]; then
          echo -e "${GREEN}✓ Backend health check: $BACKEND_HEALTH${NC}"
        else
          echo -e "${YELLOW}⚠ Backend health check: $BACKEND_HEALTH${NC}"
        fi
      fi
    else
      echo -e "${RED}✗ Backend container status: $BACKEND_STATUS${NC}"
    fi
  fi
  echo ""
else
  echo -e "${BLUE}[6/8] Skipping backend container check (local mode)${NC}"
  echo ""
fi

# =============================================================================
# Test 7: Test API Endpoints (if backend is running)
# =============================================================================
if [ "$ENVIRONMENT" != "local" ]; then
  echo -e "${BLUE}[7/8] Testing API endpoints...${NC}"
  
  # Test health endpoint
  echo -e "  Testing: GET $BASE_URL/health"
  HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/health" 2>/dev/null || echo "000")
  
  if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ Health endpoint: $HEALTH_RESPONSE OK${NC}"
    
    # Get health details
    HEALTH_DATA=$(curl -s "$BASE_URL/health" 2>/dev/null)
    echo -e "  Response: $HEALTH_DATA"
  else
    echo -e "${RED}✗ Health endpoint: $HEALTH_RESPONSE${NC}"
    echo -e "${YELLOW}  Backend might still be starting up...${NC}"
  fi
  
  # Test API endpoint
  echo ""
  echo -e "  Testing: GET $BASE_URL/api/posts"
  API_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/posts" 2>/dev/null || echo "000")
  
  if [ "$API_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ API endpoint: $API_RESPONSE OK${NC}"
  else
    echo -e "${YELLOW}⚠ API endpoint: $API_RESPONSE (might be expected if no data)${NC}"
  fi
  echo ""
else
  echo -e "${BLUE}[7/8] Skipping API endpoint tests (local mode)${NC}"
  echo ""
fi

# =============================================================================
# Test 8: Check Logs for Errors
# =============================================================================
if [ "$ENVIRONMENT" != "local" ]; then
  echo -e "${BLUE}[8/8] Checking logs for errors...${NC}"
  
  # Get last 20 lines of backend logs
  BACKEND_LOGS=$(docker-compose -f "$COMPOSE_FILE" logs --tail=20 backend 2>/dev/null || echo "")
  
  if echo "$BACKEND_LOGS" | grep -i "error" > /dev/null; then
    echo -e "${YELLOW}⚠ Found errors in backend logs:${NC}"
    echo "$BACKEND_LOGS" | grep -i "error" | head -5
  else
    echo -e "${GREEN}✓ No obvious errors in recent logs${NC}"
  fi
  echo ""
else
  echo -e "${BLUE}[8/8] Skipping log check (local mode)${NC}"
  echo ""
fi

# =============================================================================
# Summary
# =============================================================================
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  Test Summary${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo -e "${GREEN}Deployment test completed!${NC}"
echo ""
echo -e "Useful commands:"
echo -e "  ${BLUE}View logs:${NC}      docker-compose -f $COMPOSE_FILE logs -f"
echo -e "  ${BLUE}Restart:${NC}        docker-compose -f $COMPOSE_FILE restart"
echo -e "  ${BLUE}Stop:${NC}           docker-compose -f $COMPOSE_FILE down"
echo -e "  ${BLUE}Shell access:${NC}   docker-compose -f $COMPOSE_FILE exec backend sh"
echo ""

if [ "$ENVIRONMENT" != "local" ]; then
  echo -e "API URLs:"
  echo -e "  ${BLUE}Health:${NC}  $BASE_URL/health"
  echo -e "  ${BLUE}API:${NC}     $BASE_URL/api/posts"
  echo ""
fi

echo -e "${GREEN}Done!${NC}"
