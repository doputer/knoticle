export interface Scrap {
  id: number;
  order: number;
  article: {
    id: number;
    title: string;
  };
}

export interface CreateScrap {
  order: number;
  is_original: boolean;
  book_id: number;
  article_id: number;
}
