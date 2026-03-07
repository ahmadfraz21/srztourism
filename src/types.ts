export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  created_at: string;
}

export type Category = 'All' | 'Culture' | 'Adventure' | 'Tips' | 'Destinations';
