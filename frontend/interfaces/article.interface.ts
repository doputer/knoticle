export interface IArticle {
  id: number;
  title: string;
  content: string;
  deleted_at?: string;
  book_id: number;
}
