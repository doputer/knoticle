export interface SearchBooks {
  query: string;
  page: number;
  take: number;
  userId?: number;
  isUsers?: string;
}

export interface GetOwnerBook {
  title: string;
  owner: string;
}

export interface FindBooks {
  order: 'newest' | 'bookmark';
  take: number;
  userId?: number;
}

export interface CreateBook {
  title: string;
  thumbnail_image?: string;
  userId: number;
}
