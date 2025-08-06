# LogiScan AI

A Next.js application for AI-powered RSS feed analysis and insights.

## Features

- 🔍 AI-powered content analysis
- 📰 RSS/Atom feed parsing
- 🎨 Modern UI with shadcn/ui components
- 🗄️ PostgreSQL database with Prisma ORM
- ⚡ Real-time updates with Framer Motion
- 🔐 User authentication and management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI API

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account and database
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Supabase
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.rwwlwpbljczuqvudkofj.supabase.co:5432/postgres"
   SUPABASE_URL="https://rwwlwpbljczuqvudkofj.supabase.co"
   SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SECRET_KEY="sb_secret_..."
   
   # OpenAI
   OPENAI_API_KEY="sk-..."
   
   # Vercel Cron Job Security
   CRON_SECRET="generate-a-strong-random-string-here"
   ```
   
   **Note**: Replace `[YOUR-PASSWORD]` with your actual database password from Supabase Dashboard → Settings → Database → Connection string → URI

4. Set up the database:
   ```bash
   npx prisma db push
   ```
   
   **Note**: If you encounter connection issues, try:
   - Check your network connectivity
   - Verify the database password in Supabase Dashboard
   - Try using the direct connection: `postgresql://postgres:[PASSWORD]@db.rwwlwpbljczuqvudkofj.supabase.co:5432/postgres`

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The application uses a simplified Article model for AI-powered content analysis:

- **Article**: Stores processed articles with AI-generated insights including summary points, why it matters, and tags

## Development

- **Database**: `npx prisma studio` - Open Prisma Studio
- **Linting**: `npm run lint` - Run ESLint
- **Build**: `npm run build` - Build for production

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
