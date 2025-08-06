'use client';

import { useState, useMemo } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  originalUrl: string;
  sourceName: string;
  publishedAt: Date | null;
  summaryPoints: string[];
  whyItMatters: string | null;
  tags: string[];
  createdAt: Date;
}

interface NewsFeedProps {
  articles: Article[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!activeTag) return articles;
    return articles.filter(article => 
      article.tags.some(tag => tag === activeTag)
    );
  }, [articles, activeTag]);

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-zinc-500 text-lg mb-4">
          No articles found
        </div>
        <p className="text-zinc-400">
          Articles will appear here once the cron job fetches them from RSS feeds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Counter */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600">
          Showing {filteredArticles.length} of {articles.length} articles
        </div>
        {activeTag && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTag(null)}
            className="text-zinc-500 hover:text-zinc-700"
          >
            Clear filter
          </Button>
        )}
      </div>

      {/* Articles Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag || 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.2 } 
              }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredArticles.length === 0 && activeTag && (
        <div className="text-center py-12">
          <div className="text-zinc-500 text-lg mb-4">
            No articles found for "{activeTag}"
          </div>
          <Button
            variant="outline"
            onClick={() => setActiveTag(null)}
            className="text-zinc-600"
          >
            View all articles
          </Button>
        </div>
      )}
    </div>
  );
} 