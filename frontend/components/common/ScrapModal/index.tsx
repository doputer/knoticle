import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Reorder } from 'framer-motion';

import { createArticleApi, updateArticleApi } from '@apis/articleApi';
import { createScrapApi, updateScrapOrderApi } from '@apis/scrapApi';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import Item from './Item';
import { ScrapModalContainer, SelectWrapper } from './styled';

interface ScrapModalProps {
  book: IBookScraps;
  article?: {
    id: number;
    title: string;
    content: string;
  };
  mode?: 'CREATE' | 'UPDATE' | 'SCRAP';
}

export default function ScrapModal({
  book,
  article = undefined,
  mode = undefined,
}: ScrapModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { closeEveryModal } = useModal();
  const { mutateAsync: createAricle } = useMutation(createArticleApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess(`<${article?.title}> 글이 발행되었습니다.`);

      router.push(`/@${book.user.nickname}/${book.title}/${article?.title}`);
    },
  });
  const { mutateAsync: updateArticle } = useMutation(updateArticleApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess(`<${article?.title}> 글이 수정되었습니다.`);

      router.push(`/@${book.user.nickname}/${book.title}/${article?.title}`);
    },
  });
  const { mutateAsync: createScrap } = useMutation(createScrapApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess(`<${article?.title}> 글이 스크랩되었습니다.`);
    },
  });
  const { mutate: updateScrapOrder } = useMutation(updateScrapOrderApi, {
    onError: useApiError,
    onSuccess: () => {
      closeEveryModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getUserBooks', 'getOwnerBook']);
    },
  });
  const [newBook, setNewBook] = useState(book);

  const handleOkButtonClick = async () => {
    if (article) {
      const newScrapIndex = newBook.scraps.findIndex((scrap) => scrap.id === 0);

      if (mode === 'CREATE') {
        await createAricle({
          title: article.title,
          content: article.content,
          book_id: book.id,
          order: newScrapIndex + 1,
        });
      } else if (mode === 'UPDATE') {
        const targetScrapIndex = newBook.scraps.findIndex(
          (scrap) => scrap.article.id === article?.id
        );

        await updateArticle({
          id: article.id,
          title: article.title,
          content: article.content,
          book_id: book.id,
          order: targetScrapIndex + 1,
        });
      } else if (mode === 'SCRAP') {
        if (!book.scraps.some((scrap) => scrap.article.id === article.id)) {
          await createScrap({
            order: newScrapIndex + 1,
            is_original: false,
            book_id: book.id,
            article_id: article.id,
          });
        }
      }
    }

    updateScrapOrder({
      scraps: newBook.scraps
        .map((scrap, index) => ({
          ...scrap,
          order: index + 1,
        }))
        .filter((scrap) => scrap.id),
    });
  };

  useEffect(() => {
    if (!article) return;
    if (book.scraps.some((scrap) => scrap.article.id === article.id)) return;

    setNewBook({
      ...newBook,
      scraps: [
        ...newBook.scraps,
        {
          id: 0,
          order: 0,
          is_original: false,
          article,
        },
      ],
    });
  }, []);

  return (
    <ScrapModalContainer>
      <SelectWrapper>
        <Reorder.Group
          axis="y"
          values={newBook.scraps}
          onReorder={(scraps) => setNewBook({ ...newBook, scraps })}
          layoutScroll
        >
          {newBook.scraps.map((scrap) => (
            <Item key={scrap.id} scrap={scrap} isTarget={scrap.article.id === article?.id} />
          ))}
        </Reorder.Group>
      </SelectWrapper>
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        저장하기
      </ModalButton>
    </ScrapModalContainer>
  );
}
