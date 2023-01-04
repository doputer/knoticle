import { IScrap } from '@interfaces';
import api from '@utils/api';

export const getBookApi = async (bookId: string) => {
  const url = `/api/books/${bookId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface GetOwnerBookApi {
  title: string;
  owner: string;
}

export const getOwnerBookApi = async (data: GetOwnerBookApi) => {
  const url = `/api/books/owner`;

  const response = await api({ url, method: 'GET', params: data });

  return response.data;
};

interface GetBooksApi {
  order: 'newest' | 'bookmark';
  take: number;
}

export const getBooksApi = async (data: GetBooksApi) => {
  const url = `/api/books?order=${data.order}&take=${data.take}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface SearchBooksApi {
  query: string;
  isUsers: boolean;
  page: number;
  take: number;
}

export const searchBooksApi = async (data: SearchBooksApi) => {
  const url = `/api/books/search`;
  const params = {
    query: data.query,
    isUsers: data.isUsers,
    page: data.page,
    take: data.take,
  };

  const response = await api({ url, method: 'GET', params });

  return response.data;
};

export const getUserKnottedBooksApi = async (nickname: string) => {
  const url = `/api/books?editor=${nickname}&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const getUserBookmarkedBooksApi = async (nickname: string) => {
  const url = `/api/books?editor=${nickname}&type=bookmark&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const addBookApi = async (data: { title: string }) => {
  const url = `/api/books`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

interface UpdateBookApi {
  id: number;
  title: string;
  thumbnail_image: string;
  scraps: IScrap[];
}

export const updateBookApi = async (data: UpdateBookApi) => {
  const url = `/api/books/${data.id}`;

  const response = await api({ url, method: 'PATCH', data });

  return response.data;
};

export const deleteBookApi = async (bookId: number) => {
  const url = `/api/books/${bookId}`;

  const response = await api({ url, method: 'DELETE' });

  return response.data;
};
