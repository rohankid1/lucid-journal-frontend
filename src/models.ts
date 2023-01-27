export interface Post {
  id: number;
  author: string;
  title: string;
  description: string;
  date: Date;
}

export interface CreatePost {
  authKey: string;
  authorName: string;
  title: string;
  description: string;
}

export interface UpdatePost {
    id: number;
    author: string;
    authKey: string;
    title: string;
    description: string;
}