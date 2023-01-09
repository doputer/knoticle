import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Reorder, useDragControls } from 'framer-motion';

import { updateBookApi } from '@apis/bookApi';
import { createScrapApi } from '@apis/scrapApi';
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
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { mutateAsync: createScrap } = useMutation(createScrapApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess(`<${article?.title}> 글이 스크랩되었습니다.`);
    },
  });
  const { mutate: updateBook } = useMutation(updateBookApi, {
    onError: useApiError,
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserBooks', { nickname: book.user.nickname }]);

      toastSuccess(`<${book.title}> 책이 저장되었습니다.`);

      closeModal();
    },
  });
  const [newBook, setNewBook] = useState(book);

  const handleOkButtonClick = async () => {
    const newScrapIndex = newBook.scraps.findIndex((scrap) => scrap.id === 0);

    if (newScrapIndex !== -1 && article) {
      await createScrap({
        order: newScrapIndex + 1,
        is_original: false,
        book_id: book.id,
        article_id: article.id,
      });
    }

    updateBook({
      id: newBook.id,
      title: newBook.title,
      thumbnail_image: newBook.thumbnail_image,
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
