# Deploying Quiz Content Manager to Vercel

This guide walks you through deploying your Quiz Content Manager application to Vercel.

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- A PostgreSQL database (we recommend Neon: https://neon.tech)
- Your database connection string

## Quick Deploy (One-Click)

1. Click the "Deploy to Vercel" button in the README
2. Connect your GitHub account if prompted
3. Configure the project:
   - Enter `DATABASE_URL` when prompted
   - Use your Neon PostgreSQL connection string
4. Click "Deploy"
5. Wait for the build to complete (~2-3 minutes)

## Manual Deployment via CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Directory

```bash
cd /path/to/quiz-content-manager
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** Choose your account
- **Link to existing project?** N
- **Project name?** quiz-content-manager (or your choice)
- **Directory?** ./
- **Override settings?** N

### Step 4: Add Environment Variables

After initial deployment, add your database URL:

```bash
vercel env add DATABASE_URL
```

When prompted:
- **Value:** Paste your PostgreSQL connection string
- **Environment:** Production (and optionally Preview, Development)

Example connection string for Neon:
```
postgresql://user:password@ep-dawn-sky-xxx.neon.tech/dbname?sslmode=require&channel_binding=require
```

### Step 5: Redeploy to Apply Configuration

```bash
vercel --prod
```

This will:
- Trigger a new build with the DATABASE_URL environment variable
- Automatically run database migrations via the `vercel-build` script
- Deploy your application with the database fully set up

## Setting Up Your Database (Neon)

### Option 1: Via Neon Console

1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string
4. Add it to Vercel as `DATABASE_URL`

### Option 2: Via Neon CLI

```bash
# Install Neon CLI
npm install -g neonctl

# Create a project
neonctl projects create --name quiz-db

# Get connection string
neonctl connection-string
```

## Vercel Project Configuration

The project uses standard Next.js deployment with automatic Prisma migrations:

**package.json scripts:**
```json
{
  "postinstall": "prisma generate",
  "vercel-build": "prisma migrate deploy && next build"
}
```

This ensures:
- Prisma client is automatically generated after `npm install`
- Database migrations are applied before building on Vercel
- Next.js is recognized as the framework via `vercel.json`

Environment variables like `DATABASE_URL` should be set directly in the Vercel dashboard or via the CLI.

## Troubleshooting

### Build Fails with "Cannot find module '@prisma/client'"

**Solution:** The build command automatically runs `prisma generate`. If this fails, check that:
1. `prisma.config.ts` is in the project root
2. `DATABASE_URL` is set in environment variables

### Database Connection Fails

**Solutions:**
1. Verify `DATABASE_URL` includes `sslmode=require` for production databases
2. Check that your database allows connections from Vercel's IP addresses
3. For Neon, ensure connection pooling is enabled

### Error: "The table public.Question does not exist"

This error occurs when migrations haven't been applied to the database.

**Solution:**
1. Ensure `DATABASE_URL` is set in Vercel environment variables (Project Settings → Environment Variables)
2. Trigger a new deployment after setting the environment variable
3. Check build logs to confirm `prisma migrate deploy` ran successfully
4. The `vercel-build` script automatically applies migrations during deployment

### API Routes Return 500 Error

**Solutions:**
1. Check Vercel Function Logs in the dashboard for detailed error messages
2. Verify `DATABASE_URL` is set correctly in environment variables
3. Ensure migrations were applied during build (check build logs for `prisma migrate deploy`)
4. If migrations failed during build, redeploy after fixing the DATABASE_URL

## Monitoring and Logs

- View deployment logs: https://vercel.com/dashboard
- Real-time function logs: Vercel Dashboard → Your Project → Functions
- Analytics: Vercel Dashboard → Your Project → Analytics

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

## Continuous Deployment

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On push to any other branch or PR

Configure branch settings in Project Settings → Git.

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Neon Documentation](https://neon.tech/docs)
