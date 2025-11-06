#!/bin/bash
# Production database migration script for Render deployment

echo "Starting database migration..."

# Generate Prisma client
npx prisma generate

# Deploy migrations
npx prisma migrate deploy

echo "Database migration completed!"