import Image from 'next/image';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateBookApi } from '@apis/bookApi';
import { createImageApi } from '@apis/imageApi';
import BookmarkFillIcon from '@assets/ico_bookmark_fill.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/common/ModalButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';
import { TextSmall, TextXSmall } from '@styles/common';
import { Ellipsis } from '@styles/layout';
import { toastSuccess } from '@utils/toast';

import {
  BookAuthor,
  BookBody,
  BookContainer,
  BookDescription,
  BookEditModalContainer,
  BookInformation,
  Bookmark,
  BookScrap,
  BookScrapList,
  BookThumbnail,
  ThumbnailImageInput,
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

  const handleOkButtonClick = () => {
    updateBook(newBook);
  };

  return (
    <BookEditModalContainer>
      <BookContainer>
        <BookThumbnail>
          <label htmlFor="file">
            <Image
              src={newBook.thumbnail_image}
              width={280}
              height={157.5}
              alt="Profile Image"
              priority
            />
          </label>
          <ThumbnailImageInput
            id="file"
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleImageUpload}
          />
        </BookThumbnail>
        <BookBody>
          <BookInformation>
            <BookDescription>
              <LabeledInput
                label="제목*"
                type="text"
                name="title"
                defaultValue={newBook.title}
                onChange={handleTitleChange}
              />
              <BookAuthor>by {newBook.user.nickname}</BookAuthor>
            </BookDescription>
            <Bookmark>
              <BookmarkFillIcon />
              <TextXSmall>{0}</TextXSmall>
            </Bookmark>
          </BookInformation>

          <BookScrapList>
            <TextSmall>Contents</TextSmall>
            <BookScrap>
              {newBook.scraps.slice(0, 4).map((scrap) => (
                <Ellipsis key={scrap.id}>
                  {scrap.order}. {scrap.article.title}
                </Ellipsis>
              ))}
            </BookScrap>
          </BookScrapList>
        </BookBody>
      </BookContainer>
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        수정 완료
      </ModalButton>
    </BookEditModalContainer>
  );
}
