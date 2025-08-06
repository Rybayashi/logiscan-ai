import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getArticleAnalysis } from '@/lib/openai';
import * as feedparser from 'feedparser-promised';

// Polish logistics RSS feeds
const RSS_FEEDS = [
  'https://trans.info/rss',
  'https://logistyka.net.pl/rss',
  'https://www.transport-publiczny.pl/rss',
  'https://www.logistyka.net.pl/rss',
  'https://www.transport-logistyka.pl/rss'
];

export async function GET(request: NextRequest) {
  // Verify the cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let processedCount = 0;
    let newArticlesCount = 0;
    let errors: string[] = [];

    // Process each RSS feed
    for (const feedUrl of RSS_FEEDS) {
      try {
        console.log(`Processing feed: ${feedUrl}`);
        
        // Fetch articles from RSS feed
        const articles = await feedparser.parse(feedUrl);
        
        for (const article of articles) {
          processedCount++;
          
          try {
            // Check if article already exists in database
            const existingArticle = await prisma.article.findUnique({
              where: { originalUrl: article.link }
            });

            if (existingArticle) {
              console.log(`Article already exists: ${article.title}`);
              continue;
            }

            // Use description as content (RSS feeds often contain summaries)
            const articleContent = article.description || article.summary || article.title || '';

            // Analyze the article using OpenAI
            const analysis = await getArticleAnalysis(articleContent);
            
            if (!analysis) {
              console.log(`Failed to analyze article: ${article.title}`);
              errors.push(`Failed to analyze: ${article.title}`);
              continue;
            }

            // Save the analyzed article to database
            await prisma.article.create({
              data: {
                title: article.title || 'Untitled',
                originalUrl: article.link,
                sourceName: new URL(feedUrl).hostname,
                publishedAt: article.pubDate ? new Date(article.pubDate) : null,
                summaryPoints: analysis.summary_points || [],
                whyItMatters: analysis.why_it_matters || '',
                tags: analysis.tags || []
              }
            });

            newArticlesCount++;
            console.log(`Successfully processed: ${article.title}`);

          } catch (articleError) {
            console.error(`Error processing article: ${article.title}`, articleError);
            errors.push(`Error processing: ${article.title}`);
          }
        }

      } catch (feedError) {
        console.error(`Error processing feed: ${feedUrl}`, feedError);
        errors.push(`Error processing feed: ${feedUrl}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cron job completed',
      stats: {
        processed: processedCount,
        newArticles: newArticlesCount,
        errors: errors.length
      },
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Cron job failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 