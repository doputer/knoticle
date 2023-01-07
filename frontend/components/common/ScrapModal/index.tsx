import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateBookApi } from '@apis/bookApi';
import { createScrapApi } from '@apis/scrapApi';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IArticle, IBookScraps } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import { ScrapModalContainer, SelectItem, SelectWrapper } from './styled';

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
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    dragItem.current = id;
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    dragOverItem.current = id;

    const $target = event.target as HTMLDivElement;

    if (dragItem.current < id) $target.classList.add('space-bottom');
    else if (dragItem.current > id) $target.classList.add('space-top');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    dragOverItem.current = id;

    const $target = event.target as HTMLDivElement;

    if (dragItem.current < id) $target.classList.remove('space-bottom');
    else if (dragItem.current > id) $target.classList.remove('space-top');
  };

  const handleDrop = () => {
    const copyScraps = [...newBook.scraps];
    const dragItemContent = copyScraps[dragItem.current];

    copyScraps.splice(dragItem.current, 1);
    copyScraps.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = 0;
    dragOverItem.current = 0;

    setNewBook({ ...newBook, scraps: copyScraps });
  };

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
        {newBook.scraps.map((scrap, index) => (
          <SelectItem
            key={scrap.id}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnter={(event) => handleDragEnter(event, index)}
            onDragLeave={(event) => handleDragLeave(event, index)}
            onDragEnd={handleDrop}
            draggable
            isActive={scrap.article.id === article?.id}
          >
            {scrap.article.title}
          </SelectItem>
        ))}
      </SelectWrapper>
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        저장하기
      </ModalButton>
    </ScrapModalContainer>
  );
}
