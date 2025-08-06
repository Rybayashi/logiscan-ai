'use client';

import { useState, useMemo } from 'react';
import { Article } from '@prisma/client';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsFeedProps {
  articles: Article[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  // Filter articles based on active tag
  const filteredArticles = useMemo(() => {
    if (!activeTag) return articles;
    return articles.filter(article => 
      article.tags?.includes(activeTag)
    );
  }, [articles, activeTag]);

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No articles found
        </h3>
        <p className="text-sm text-muted-foreground">
          Articles will appear here once the cron job fetches them from RSS feeds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground mr-2">
          Filter by tag:
        </span>
        <Button
          variant={activeTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTag(null)}
          className="h-8"
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(tag)}
            className="h-8"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredArticles.length} of {articles.length} articles
        {activeTag && (
          <span className="ml-2">
            filtered by <Badge variant="secondary">{activeTag}</Badge>
          </span>
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
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
      {filteredArticles.length === 0 && articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No articles found
          </h3>
          <p className="text-sm text-muted-foreground">
            No articles match the selected filter.
          </p>
        </motion.div>
      )}
    </div>
  );
} 