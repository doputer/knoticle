import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { deleteBookApi } from '@apis/bookApi';
import MoreIcon from '@assets/ico_more.svg';
import IconButton from '@components/common/IconButton';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import { BookOptionContainer, Dropdown, DropdownItem } from './styled';

interface BookOptionProps {
  book: IBookScraps;
}

function BookOption({ book }: BookOptionProps) {
  const UpdateBookModal = dynamic(() => import('@components/shelf/UpdateBookModal'));

  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const { mutate: deleteBook } = useMutation(deleteBookApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('책이 삭제되었습니다.');

      queryClient.invalidateQueries(['knotBooks', { nickname: book.user.nickname }]);
    },
  });
  const [dropdown, setDropdown] = useState(false);

  const handleUpdateBookModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '책 수정하기',
        children: <UpdateBookModal book={book} />,
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
