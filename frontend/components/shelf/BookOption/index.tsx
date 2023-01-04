import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { deleteBookApi } from '@apis/bookApi';
import MoreIcon from '@assets/ico_more.svg';
import IconButton from '@components/common/IconButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';

import { BookOptionContainer, Dropdown, DropdownItem } from './styled';

interface BookOptionProps {
  book: IBookScraps;
}

function BookOption({ book }: BookOptionProps) {
  const BookEditModal = dynamic(() => import('@components/shelf/BookEditModal'));

  const { openModal } = useModal();
  const { mutate: deleteBook } = useMutation(deleteBookApi, {
    onError: useApiError,
  });
  const [dropdown, setDropdown] = useState(false);

  const handleUpdateBookModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '책 수정하기',
        children: <BookEditModal book={book} />,
      },
    });
  };

  const handleDeleteBookModalOpen = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '책을 삭제하시겠습니까?',
        handleConfirm: () => {
          deleteBook(book.id);
        },
      },
    });
  };

  const handleDropdownToggle = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setDropdown(!dropdown);
  };

  const handleDocumentClick = () => setDropdown(false);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <BookOptionContainer>
      <IconButton icon={<MoreIcon />} onClick={handleDropdownToggle} />
      {dropdown && (
        <Dropdown>
          <DropdownItem onClick={handleUpdateBookModalOpen}>수정하기</DropdownItem>
          <DropdownItem onClick={handleDeleteBookModalOpen}>삭제하기</DropdownItem>
        </Dropdown>
      )}
    </BookOptionContainer>
  );
}

export default BookOption;
