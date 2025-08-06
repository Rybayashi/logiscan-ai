declare module 'feedparser-promised' {
  interface FeedItem {
    title: string;
    link: string;
    description?: string;
    summary?: string;
    pubDate?: Date;
    author?: string;
    categories?: string[];
  }

  interface FeedParser {
    parse(url: string): Promise<FeedItem[]>;
  }

  const feedparser: FeedParser;
  export = feedparser;
} 