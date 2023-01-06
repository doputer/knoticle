import { FindBooks, SearchBooks, CreateBook, GetOwnerBook } from '@apis/books/books.interface';
import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

const getBook = async (bookId: number, userId: number) => {
  const book = await prisma.book.findFirst({
    select: {
      id: true,
      title: true,
      thumbnail_image: true,
      user: {
        select: {
          nickname: true,
          profile_image: true,
        },
      },
      scraps: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          order: true,
          is_original: true,
          article: {
            select: {
              id: true,
              title: true,
              deleted_at: true,
              book: {
                select: {
                  title: true,
                  user: {
                    select: {
                      nickname: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      id: bookId,
      deleted_at: null,
    },
  });

  return book;
};

const getOwnerBook = async ({ title, owner }: GetOwnerBook) => {
  const book = await prisma.book.findFirst({
    select: {
      id: true,
      title: true,
      user: {
        select: {
          nickname: true,
          profile_image: true,
        },
      },
      scraps: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          order: true,
          is_original: true,
          article: {
            select: {
              id: true,
              title: true,
              book: {
                select: {
                  title: true,
                  user: {
                    select: {
                      nickname: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      bookmarks: true,
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      title,
      user: {
        nickname: owner,
      },
      deleted_at: null,
    },
  });

  return book;
};

const getBooks = async ({ order, take, userId }: FindBooks) => {
  const sortOptions = [];

  if (order === 'bookmark') sortOptions.push({ bookmarks: { _count: 'desc' as const } });
  if (order === 'newest') sortOptions.push({ created_at: 'desc' as const });

  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      thumbnail_image: true,
      created_at: true,
      user: {
        select: {
          nickname: true,
        },
      },
      scraps: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          order: true,
          is_original: true,
          article: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      deleted_at: null,
    },
    orderBy: sortOptions,
    take,
  });

  return books;
};

const searchBooks = async ({ query, userId, isUsers, take, page }: SearchBooks) => {
  const skip = (page - 1) * take;

  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      thumbnail_image: true,
      created_at: true,
      user: {
        select: {
          nickname: true,
        },
      },
      scraps: {
        select: {
          id: true,
          order: true,
          is_original: true,
          article: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      bookmarks: {
        where: {
          user_id: Number(userId) ? Number(userId) : 0,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      deleted_at: null,
      user_id: isUsers === 'true' ? Number(userId) : undefined,
      title: {
        search: `${query}*`,
      },
    },
    orderBy: {
      _relevance: {
        fields: ['title'],
        sort: 'desc',
        search: `${query}*`,
      },
    },
    skip,
    take,
  });

  return {
    data: books,
    hasNextPage: books.length === take,
  };
};

const createBook = async ({ title, thumbnail_image, userId }: CreateBook) => {
  const createdBook = await prisma.book.create({
    data: {
      title,
      thumbnail_image: thumbnail_image ? thumbnail_image : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return createdBook;
};

const updateBook = async (dto: any) => {
  const { id, title, thumbnail_image } = dto;

  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: {
      title,
      thumbnail_image,
    },
  });

  return updatedBook;
};

const deleteBook = async (id: number, userId: number) => {
  const book = await prisma.book.findFirst({
    where: {
      id,
      user: { id: userId },
    },
  });

  if (!book) throw new NotFound(Message.BOOK_NOTFOUND);

  const deletedBook = await prisma.book.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  return deletedBook;
};

export default {
  getBook,
  getOwnerBook,
  getBooks,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
};
