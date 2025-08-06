import { prisma } from '@/lib/prisma';
import { NewsFeed } from '@/components/NewsFeed';

export default async function Home() {
  // Fetch the latest 50 articles from the database
  const articles = await prisma.article.findMany({
    take: 50,
    orderBy: {
      publishedAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            LogiScan AI
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered logistics news analysis for Polish transport professionals
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <NewsFeed articles={articles} />
      </main>
    </div>
  );
}
