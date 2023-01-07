import Image from 'next/image';

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateBookApi } from '@apis/bookApi';
import { createImageApi } from '@apis/imageApi';
import EditIcon from '@assets/ico_edit.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import {
  BookEditModalContainer,
  Label,
  ThumbnailImage,
  ThumbnailImageInput,
  ThumbnailImageWrapper,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

function UpdateBookModal({ book }: BookProps) {
  const queryClient = useQueryClient();
  const [newBook, setNewBook] = useState(book);
  const { closeModal } = useModal();
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

      queryClient.invalidateQueries(['getUserBooks', { nickname: book.user.nickname }]);

      closeModal();
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

  const handleOkButtonClick = () => {
    updateBook({
      id: newBook.id,
      title: newBook.title,
      thumbnail_image: newBook.thumbnail_image,
      scraps: newBook.scraps,
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
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        수정하기
      </ModalButton>
    </BookEditModalContainer>
  );
}

export default UpdateBookModal;
