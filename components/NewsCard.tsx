import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

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

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const getTimeAgo = (date: Date | null) => {
    if (!date) return 'Unknown time';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}H AGO`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}D AGO`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}W AGO`;
  };

  const getArticleCount = () => {
    // Simulate article count based on tags
    return Math.floor(Math.random() * 50) + 10;
  };

  return (
    <TooltipProvider>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-zinc-200 bg-white">
        <CardContent className="p-0">
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-zinc-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-zinc-700 text-xs font-medium">
                {getArticleCount()} ARTICLES
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-white/90 text-zinc-700 text-xs font-medium">
                {getTimeAgo(article.publishedAt)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-zinc-900 text-lg leading-tight mb-2 line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-zinc-600 text-sm leading-relaxed mb-3 line-clamp-3">
              {article.summaryPoints.length > 0 
                ? article.summaryPoints[0] 
                : 'No summary available for this article.'
              }
            </p>

            {/* Source and Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-zinc-500 font-medium">
                  {article.sourceName}
                </span>
                {article.whyItMatters && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 hover:bg-zinc-100 rounded transition-colors">
                        <Info className="w-3 h-3 text-zinc-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-sm">{article.whyItMatters}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                  >
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-zinc-50 border-zinc-200 text-zinc-600"
                  >
                    +{article.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
} 