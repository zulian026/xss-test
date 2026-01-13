
export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image: string;
}

export enum SecurityMode {
  VULNERABLE = 'VULNERABLE',
  SECURE = 'SECURE'
}
