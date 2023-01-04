import Image from 'next/image';

import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateBookApi } from '@apis/bookApi';
import { createImageApi } from '@apis/imageApi';
import EditIcon from '@assets/ico_edit.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/common/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';
import { Ellipsis } from '@styles/layout';
import { toastSuccess } from '@utils/toast';

import {
  BookEditModalContainer,
  Label,
  Scrap,
  ScrapList,
  ScrapListWrapper,
  ThumbnailImage,
  ThumbnailImageInput,
  ThumbnailImageWrapper,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function BookEditModal({ book }: BookProps) {
  const queryClient = useQueryClient();
  const [newBook, setNewBook] = useState(book);
  const { closeEveryModal } = useModal();
  const { mutate: createImage } = useMutation(createImageApi, {
    onError: useApiError,
    onSuccess: (image) => {
      setNewBook({ ...newBook, thumbnail_image: image.imagePath });
    },
  });
  const { mutate: updateBook } = useMutation(updateBookApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('책이 수정되었습니다.');

      queryClient.invalidateQueries(['knotBooks', { nickname: book.user.nickname }]);

      closeEveryModal();
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!event.target.files) return;

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    createImage(formData);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewBook({ ...newBook, title: value });
  };

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

  const handleOkButtonClick = () => {
    updateBook({
      id: newBook.id,
      title: newBook.title,
      thumbnail_image: newBook.thumbnail_image,
      scraps: newBook.scraps.map((scrap, index) => ({
        ...scrap,
        order: index + 1,
      })),
    });
  };

  return (
    <BookEditModalContainer>
      <ThumbnailImageWrapper>
        <Label>썸네일</Label>
        <EditIcon />
        <ThumbnailImage>
          <label htmlFor="file">
            <Image
              src={newBook.thumbnail_image}
              alt="Thumbnail Image"
              width={296}
              height={167}
              priority
            />
          </label>
          <ThumbnailImageInput
            id="file"
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleImageUpload}
          />
        </ThumbnailImage>
      </ThumbnailImageWrapper>
      <LabeledInput
        label="제목*"
        type="text"
        name="title"
        defaultValue={newBook.title}
        onChange={handleTitleChange}
      />
      <ScrapListWrapper>
        <Label>스크랩</Label>
        <ScrapList>
          {newBook.scraps.map((scrap, index) => (
            <Scrap
              key={scrap.id}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnter={(event) => handleDragEnter(event, index)}
              onDragLeave={(event) => handleDragLeave(event, index)}
              onDragEnd={handleDrop}
              draggable
            >
              <Ellipsis>
                {index + 1}. {scrap.article.title}
              </Ellipsis>
            </Scrap>
          ))}
        </ScrapList>
      </ScrapListWrapper>
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        수정하기
      </ModalButton>
    </BookEditModalContainer>
  );
}
