import { Article } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  // Calculate time ago
  const getTimeAgo = (date: Date | null) => {
    if (!date) return 'Unknown time';
    
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
  };

  return (
    <TooltipProvider>
      <Card className="w-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                {article.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{article.sourceName}</span>
                <span>•</span>
                <span>{getTimeAgo(article.publishedAt)}</span>
              </div>
            </div>
            {article.whyItMatters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{article.whyItMatters}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Summary Points */}
          {article.summaryPoints && article.summaryPoints.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Points:</h4>
              <ul className="space-y-1">
                {article.summaryPoints.map((point, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
} 