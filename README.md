# Quiz Content Manager

A Next.js application for managing quiz questions with a PostgreSQL database using Prisma ORM.

## Features

- **Add Questions**: Create quiz questions with 4 options (A, B, C, D), specify the correct answer, difficulty level, and themes
- **View Questions**: Browse all questions in a table format
- **Edit Questions**: Update existing questions
- **Delete Questions**: Remove questions from the database
- **Theme Management**: Add multiple themes to categorize questions

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Modern ORM for database management
- **PostgreSQL** - Database
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasswed/quiz-content-manager.git
cd quiz-content-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up your database:

**Option A: Use Prisma's local development database (recommended for quick start):**
```bash
npx prisma dev
```
This will start a local PostgreSQL instance. Copy the `DATABASE_URL` connection string it provides into your `.env` file.

**Option B: Use your own PostgreSQL database:**
Update the `DATABASE_URL` in your `.env` file with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

4. Run database migrations:
```bash
npx prisma migrate dev --name init
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The `Question` model includes:
- `id` - Unique identifier (CUID)
- `question` - The question text
- `optionA`, `optionB`, `optionC`, `optionD` - Four answer options
- `correctAnswer` - The correct answer (A, B, C, or D)
- `difficulty` - Difficulty level (Easy, Medium, Hard)
- `themes` - Array of theme tags
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## API Routes

- `GET /api/questions` - Fetch all questions
- `POST /api/questions` - Create a new question
- `PUT /api/questions/[id]` - Update a question
- `DELETE /api/questions/[id]` - Delete a question

## Usage

1. **Add a Question**: Fill out the form with the question text, four options, select the correct answer, choose a difficulty level, and optionally add themes (comma-separated)
2. **View Questions**: All questions are displayed in a table below the form
3. **Edit**: Click the "Edit" button on any question to modify it
4. **Delete**: Click the "Delete" button to remove a question (with confirmation)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (database GUI)
npx prisma studio
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lucasswed/quiz-content-manager&env=DATABASE_URL&envDescription=PostgreSQL%20connection%20string&envLink=https://neon.tech)

### Deployment Steps

1. **Click the "Deploy" button above** or run:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Example (Neon): `postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require`

3. **Deploy!** 
   - Database migrations will run automatically during the build process
   - The `vercel-build` script handles both migrations and building the app
   - No manual migration step is required!

### Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string (must include `sslmode=require` for production databases)

### Recommended Database Providers

- **Neon** (https://neon.tech) - Serverless PostgreSQL, free tier available
- **Supabase** (https://supabase.com) - Free tier with PostgreSQL
- **Railway** (https://railway.app) - Free tier for hobby projects

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
