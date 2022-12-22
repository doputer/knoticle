export interface IScrap {
  id: number;
  order: number;
  is_original: boolean;
  article: {
    id: number;
    title: string;
    book?: {
      title: string;
      user: {
        nickname: string;
      };
    };
  };
}
