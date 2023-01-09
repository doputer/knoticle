import { UpdateUserProfile } from '@apis/users/users.interface';
import { prisma } from '@config/orm.config';
import { Message, NotFound, ResourceConflict } from '@errors';

const getUser = async (nickname: string) => {
  const userProfile = await prisma.user.findFirst({
    where: {
      nickname,
    },
    select: {
      id: true,
      profile_image: true,
      nickname: true,
      description: true,
    },
  });

  if (!userProfile) throw new NotFound(Message.USER_NOTFOUND);

  return userProfile;
};

const getUserBooks = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    select: {
      books: {
        select: {
          id: true,
          title: true,
          thumbnail_image: true,
          scraps: {
            select: {
              id: true,
              article: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
            orderBy: {
              order: 'asc',
            },
          },
          bookmarks: true,
          user: {
            select: {
              nickname: true,
            },
          },
          _count: {
            select: {
              bookmarks: true,
            },
          },
        },
        where: {
          deleted_at: null,
        },
      },
    },
    where: {
      nickname,
    },
  });

  return user.books;
};

const getUserBookmarks = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    select: {
      bookmarks: {
        select: {
          book: {
            select: {
              id: true,
              title: true,
              thumbnail_image: true,
              scraps: {
                select: {
                  id: true,
                  article: {
                    select: {
                      title: true,
                    },
                  },
                },
                orderBy: {
                  order: 'asc',
                },
              },
              bookmarks: true,
              user: {
                select: {
                  nickname: true,
                },
              },
              _count: {
                select: {
                  bookmarks: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      nickname,
    },
  });

  return user.bookmarks.map((bookmark) => bookmark.book);
};

const updateUser = async (dto: UpdateUserProfile) => {
  const { id, nickname, profile_image, description } = dto;

  const user = await getUserByNickname(nickname);

  if (user && user.id !== id) throw new ResourceConflict(Message.AUTH_NICKNAME_OVERLAP);

  const userProfile = await prisma.user.update({
    where: {
      id,
    },
    data: {
      profile_image,
      nickname,
      description,
    },
  });

  return userProfile;
};

const getUserByNickname = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
  });

  return user;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new NotFound(Message.USER_NOTFOUND);

  return user;
};

export default {
  getUser,
  getUserBooks,
  getUserBookmarks,
  updateUser,
  getUserById,
};
