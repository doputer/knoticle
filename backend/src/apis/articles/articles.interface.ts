export interface SearchArticles {
  query: string;
  page: number;
  take: number;
  userId?: number;
  isUsers?: string;
}

export interface GetArticle {
  articleTitle: string;
  bookTitle: string;
  owner: string;
}

export interface CreateArticle {
  title: string;
  content: string;
  book_id: number;
  order: number;
}

export interface UpdateArticle {
  title: string;
  content: string;
  book_id: number;
  order: number;
}

export interface CreateTemporaryArticle {
  title: string;
  content: string;
  user_id: number;
}
