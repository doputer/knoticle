import Image from 'next/image';

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateBookApi } from '@apis/bookApi';
import EditIcon from '@assets/ico_edit.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useImage from '@hooks/useImage';
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
  const { handleImage } = useImage({
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
            accept="image/png,image/jpg,image/jpeg"
            onChange={(event) => event.target.files && handleImage(event.target.files[0])}
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
