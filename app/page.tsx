import { prisma } from '@/lib/prisma';
import { NewsFeed } from '@/components/NewsFeed';
import { Layout } from '@/components/Layout';

export default async function Home() {
  const articles = await prisma.article.findMany({
    take: 50,
    orderBy: {
      publishedAt: 'desc'
    }
  });

  return (
    <Layout>
      <NewsFeed articles={articles} />
    </Layout>
  );
}
