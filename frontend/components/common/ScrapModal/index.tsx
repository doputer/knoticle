import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Reorder, useDragControls } from 'framer-motion';

import { createArticleApi, updateArticleApi } from '@apis/articleApi';
import { createScrapApi, updateScrapOrderApi } from '@apis/scrapApi';
import DragIcon from '@assets/ico_drag.svg';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IArticle, IBookScraps, IScrap } from '@interfaces';
import { Ellipsis } from '@styles/layout';
import { toastSuccess } from '@utils/toast';

import { ScrapModalContainer, SelectWrapper } from './styled';

interface ItemProps {
  scrap: IScrap;
  isTarget: boolean;
}

function Item({ scrap, isTarget }: ItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={scrap.id}
      value={scrap}
      dragListener={false}
      dragControls={dragControls}
      style={{ backgroundColor: isTarget ? 'var(--light-orange-color)' : '' }}
    >
      <Ellipsis>{scrap.article.title}</Ellipsis>
      <DragIcon onPointerDown={(event) => dragControls.start(event)} />
    </Reorder.Item>
  );
}

interface ScrapModalProps {
  book: IBookScraps;
  article?: IArticle | null;
}

export default function ScrapModal({ book, article = null }: ScrapModalProps) {
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
    const newScrapIndex = newBook.scraps.findIndex((scrap) => scrap.id === 0);

    if (article) {
      if (!article.id) {
        await createAricle({
          title: article.title,
          content: article.content,
          book_id: book.id,
          order: newScrapIndex + 1,
        });
      } else if (!article.book_id) {
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
      } else if (newScrapIndex !== -1) {
        await createScrap({
          order: newScrapIndex + 1,
          is_original: false,
          book_id: book.id,
          article_id: article.id,
        });
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
