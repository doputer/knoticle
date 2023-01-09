import { CreateScrap, Scrap } from '@apis/scraps/scraps.interface';
import { prisma } from '@config/orm.config';
import { ResourceConflict } from '@errors/error';
import Message from '@errors/message';

const getScraps = async () => {
  const scraps = await prisma.scrap.findMany({
    select: {
      book_id: true,
      article_id: true,
      article: {
        select: {
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
    where: {
      is_original: true,
      book: {
        deleted_at: null,
      },
      article: {
        deleted_at: null,
      },
    },
  });

  return scraps;
};

const createScrap = async (dto: CreateScrap) => {
  const { order, is_original, book_id, article_id } = dto;

  await prisma.scrap.updateMany({
    data: {
      order: {
        increment: 1,
      },
    },
    where: {
      book_id,
      order: {
        gte: order,
      },
    },
  });

  const createdScrap = await prisma.scrap.create({
    data: {
      order,
      is_original,
      book: {
        connect: {
          id: book_id,
        },
      },
      article: {
        connect: {
          id: article_id,
        },
      },
    },
  });

  return createdScrap;
};

const updateScrapOrder = async (scrap: Scrap) => {
  const updatedScrap = await prisma.scrap.update({
    where: {
      id: scrap.id,
    },
    data: {
      order: scrap.order,
    },
  });

  return updatedScrap;
};

const updateScrapBookId = async (articleId: number, bookId: number, scraps: Scrap) => {
  const originalScrap = await prisma.scrap.findFirst({
    where: {
      is_original: true,
      article_id: articleId,
    },
  });

  const scrap = await prisma.scrap.update({
    where: {
      id: originalScrap.id,
    },
    data: {
      book_id: bookId,
      order: scraps.order,
    },
  });

  return scrap;
};

const deleteScrap = async (scrapId: number) => {
  const scrap = await prisma.scrap.delete({
    where: {
      id: scrapId,
    },
  });

  await prisma.scrap.updateMany({
    data: {
      order: {
        decrement: 1,
      },
    },
    where: {
      book_id: scrap.book_id,
      order: {
        gt: scrap.order,
      },
    },
  });

  return scrap;
};

export default {
  getScraps,
  createScrap,
  updateScrapOrder,
  updateScrapBookId,
  deleteScrap,
};
