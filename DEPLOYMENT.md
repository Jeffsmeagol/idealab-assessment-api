# Deploying to Render.com

This guide will walk you through deploying your Express/Prisma API to Render.com with PostgreSQL database.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Render.com account
- Basic understanding of PostgreSQL databases

## Step 1: Prepare Your Application

### 1.1 Environment Variables

Copy the example environment file and update with your production values:

```bash
cp .env.example .env
```

Update the `.env` file with your production database credentials. For Render deployment, the `DATABASE_URL` will be automatically provided by Render.

### 1.2 Database Migrations

Make sure your Prisma migrations are up to date:

```bash
npm run prisma:migrate
```

### 1.3 Test Locally

Ensure your application runs correctly locally:

```bash
npm run build
npm start
```

## Step 2: Deploy to Render

### 2.1 Connect Your Repository

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your Git repository
4. Render will automatically detect your `render.yaml` file

### 2.2 Configure Environment Variables

Render will automatically set these environment variables:
- `DATABASE_URL`: Provided by Render's PostgreSQL database
- `NODE_ENV`: Set to `production`
- `PORT`: Set to `10000` (Render's required port)

### 2.3 Database Setup

Render will automatically:
- Create a PostgreSQL database
- Run database migrations during deployment
- Set up the connection string

## Step 3: Deployment Configuration

### 3.1 Build Command

The build command is defined in `render.yaml`:
```bash
npm install && npm run build
```

### 3.2 Start Command

The start command is defined in `render.yaml`:
```bash
npm start
```

### 3.3 Health Check

Your application includes a health check endpoint at `/health` that returns:
```json
{"status": "ok"}
```

## Step 4: Post-Deployment

### 4.1 Verify Deployment

1. Check the Render dashboard for deployment status
2. Test your API endpoints using the provided URL
3. Monitor logs for any errors

### 4.2 API Testing

Once deployed, you can test your API endpoints:

```bash
# Get all tasks
curl https://your-app-name.onrender.com/tasks

# Create a new task
curl -X POST https://your-app-name.onrender.com/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "completed": false}'
```

## Step 5: Monitoring and Maintenance

### 5.1 Database Backups

Render automatically backs up your PostgreSQL database daily. You can restore from backups in the Render dashboard.

### 5.2 Logs

Monitor your application logs in the Render dashboard to track:
- Application errors
- Database connection issues
- Performance metrics

### 5.3 Updates

To update your application:
1. Push changes to your Git repository
2. Render will automatically redeploy (auto-deploy is enabled)

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check if migrations ran successfully
   - Verify DATABASE_URL is set correctly

2. **Build Failures**
   - Check TypeScript compilation errors
   - Ensure all dependencies are in package.json

3. **Port Issues**
   - Make sure your app listens on PORT 10000 (Render's requirement)
   - Check that PORT environment variable is set correctly

### Debug Commands

```bash
# Check database connection
npm run prisma:generate

# Run migrations manually
npm run prisma:migrate

# Test health endpoint
curl https://your-app-name.onrender.com/health
```

## Security Considerations

- Never commit sensitive data to your repository
- Use environment variables for all secrets
- Keep your dependencies updated
- Monitor your application for security vulnerabilities

## Cost Optimization

- Render's starter plan includes free PostgreSQL database
- Monitor your usage to avoid unexpected charges
- Consider setting up billing alerts

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)