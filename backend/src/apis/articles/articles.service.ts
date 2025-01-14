import {
  CreateArticle,
  CreateTemporaryArticle,
  GetArticle,
  SearchArticles,
  UpdateArticle,
} from '@apis/articles/articles.interface';
import { prisma } from '@config/orm.config';

const getArticle = async (articleId: number) => {
  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
  });

  return article;
};

const getOnwerArticle = async ({ articleTitle, bookTitle, owner }: GetArticle) => {
  const article = await prisma.article.findFirst({
    include: {
      book: {
        select: {
          title: true,
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      },
    },
    where: {
      title: articleTitle,
      scraps: {
        some: {
          book: {
            title: bookTitle,
            user: {
              nickname: owner,
            },
          },
        },
      },
    },
  });

  return article;
};

const searchArticles = async (searchArticles: SearchArticles) => {
  const { query, page, take, userId, isUsers } = searchArticles;

  const skip = (page - 1) * take;

  const matchUserCondition =
    isUsers === 'true'
      ? {
          book: {
            user: {
              id: Number(userId),
            },
          },
        }
      : {};

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      book: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
    },
    where: {
      title: {
        search: `${query}*`,
      },
      content: {
        search: `${query}*`,
      },
      deleted_at: null,
      ...matchUserCondition,
    },
    orderBy: {
      _relevance: {
        fields: ['title', 'content'],
        sort: 'desc',
        search: `${query}*`,
      },
    },
    take,
    skip,
  });

  return {
    data: articles,
    hasNextPage: articles.length === take,
  };
};

const createArticle = async (dto: CreateArticle) => {
  const { title, content, book_id, order } = dto;

  const createdArticle = await prisma.article.create({
    data: {
      title,
      content,
      book: {
        connect: {
          id: book_id,
        },
      },
      scraps: {
        create: {
          order,
          is_original: true,
          book_id,
        },
      },
    },
  });

  return createdArticle;
};

const updateArticle = async (articleId: number, dto: UpdateArticle) => {
  const { title, content, book_id, order } = dto;

  const updatedArticle = await prisma.article.update({
    data: {
      title,
      content,
      book: {
        connect: {
          id: book_id,
        },
      },
    },
    where: {
      id: articleId,
    },
  });

  const scrap = await prisma.scrap.findFirst({
    where: {
      article: {
        id: updatedArticle.id,
      },
      is_original: true,
    },
  });

  await prisma.scrap.update({
    data: {
      order,
      book: {
        connect: {
          id: book_id,
        },
      },
    },
    where: {
      id: scrap.id,
    },
  });

  return updatedArticle;
};

const deleteArticle = async (articleId: number) => {
  const article = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  return article;
};

const getTemporaryArticle = async (userId: number) => {
  const temporaryArticle = await prisma.temporaryArticle.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      title: true,
      content: true,
    },
  });

  return temporaryArticle;
};

const createTemporaryArticle = async (dto: CreateTemporaryArticle) => {
  const { title, content, user_id } = dto;

  const temporaryArticle = await prisma.temporaryArticle.upsert({
    where: {
      user_id,
    },
    update: {
      title,
      content,
    },
    create: {
      user_id,
      title,
      content,
    },
  });

  return temporaryArticle;
};

export default {
  getArticle,
  getOnwerArticle,
  searchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getTemporaryArticle,
  createTemporaryArticle,
};
