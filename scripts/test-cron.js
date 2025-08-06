const { PrismaClient } = require('@prisma/client');
const OpenAI = require('openai');
const feedparser = require('feedparser-promised');

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Polish logistics RSS feeds - updated with working URLs
const RSS_FEEDS = [
  'https://www.transport-publiczny.pl/feed/',
  'https://www.logistyka.net.pl/feed/',
  'https://www.transport-logistyka.pl/feed/',
  'https://trans.info/feed/',
  'https://www.logistyka.net.pl/rss.xml'
];

async function getArticleAnalysis(articleContent) {
  const systemPrompt = `
    Jesteś ekspertem w dziedzinie logistyki i transportu lądowego w Polsce. Twoim zadaniem jest analiza artykułu i przedstawienie go w skondensowanej formie w formacie JSON dla menedżera logistyki.
    Odpowiedź MUSI być poprawnym obiektem JSON z następującymi polami:
    {
      "summary_points": ["Pierwszy kluczowy wniosek.", "Drugi kluczowy wniosek.", "Trzeci kluczowy wniosek."],
      "why_it_matters": "Jedno zdanie wyjaśniające, dlaczego ta informacja jest ważna dla menedżera lub spedytora w Polsce.",
      "tags": ["tag1", "tag2"]
    }
  `;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Przeanalizuj następujący artykuł: ${articleContent}` }
      ],
      response_format: { type: "json_object" },
    });
    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    return analysis;
  } catch (error) {
    console.error("Error analyzing article with OpenAI:", error);
    return null;
  }
}

async function testCronJob() {
  try {
    console.log('🚀 Starting cron job test...');
    
    let processedCount = 0;
    let newArticlesCount = 0;
    const errors = [];

    // Process each RSS feed
    for (const feedUrl of RSS_FEEDS) {
      try {
        console.log(`📡 Processing feed: ${feedUrl}`);
        
        // Fetch articles from RSS feed
        const articles = await feedparser.parse(feedUrl);
        console.log(`📰 Found ${articles.length} articles in ${feedUrl}`);
        
        for (const article of articles) {
          processedCount++;
          
          try {
            // Check if article already exists in database
            const existingArticle = await prisma.article.findUnique({
              where: { originalUrl: article.link }
            });

            if (existingArticle) {
              console.log(`⏭️  Article already exists: ${article.title}`);
              continue;
            }

            // Use description as content (RSS feeds often contain summaries)
            const articleContent = article.description || article.summary || article.title || '';

            // Analyze the article using OpenAI
            console.log(`🤖 Analyzing article: ${article.title}`);
            const analysis = await getArticleAnalysis(articleContent);
            
            if (!analysis) {
              console.log(`❌ Failed to analyze article: ${article.title}`);
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
            console.log(`✅ Successfully processed: ${article.title}`);

          } catch (articleError) {
            console.error(`❌ Error processing article: ${article.title}`, articleError);
            errors.push(`Error processing: ${article.title}`);
          }
        }

      } catch (feedError) {
        console.error(`❌ Error processing feed: ${feedUrl}`, feedError);
        errors.push(`Error processing feed: ${feedUrl}`);
      }
    }

    console.log('\n📊 Cron job completed!');
    console.log(`📈 Stats:`);
    console.log(`   - Processed: ${processedCount} articles`);
    console.log(`   - New articles: ${newArticlesCount}`);
    console.log(`   - Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log(`\n❌ Errors:`);
      errors.forEach(error => console.log(`   - ${error}`));
    }

    // Display total articles in database
    const totalCount = await prisma.article.count();
    console.log(`\n📚 Total articles in database: ${totalCount}`);

  } catch (error) {
    console.error('💥 Cron job failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCronJob(); 