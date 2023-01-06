import { useQuery } from 'react-query';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import PlusIcon from '@assets/ico_add.svg';
import Book from '@components/common/Book';
import BookOption from '@components/shelf/BookOption';
import CreateBookModal from '@components/shelf/CreateBookModal';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IBookScraps } from '@interfaces';

import { BookGrid, BookWrapper, CreateBookButton } from './styled';

interface KnotTabProps {
  nickname: string;
}

function KnotTab({ nickname }: KnotTabProps) {
  const { signInUser } = useUser();
  const { openModal } = useModal();
  const { data: knotBooks } = useQuery<IBookScraps[]>(
    ['knotBooks', { nickname: nickname.slice(1) }],
    () => getUserKnottedBooksApi(nickname.slice(1)),
    { refetchOnWindowFocus: false }
  );

  const handleCraeteBookModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '책 생성하기',
        children: <CreateBookModal />,
      },
    });
  };

  return (
    <BookGrid>
      {knotBooks?.map((book) => (
        <BookWrapper key={book.id}>
          {signInUser.nickname === nickname.slice(1) && <BookOption book={book} />}
          <Book book={book} />
        </BookWrapper>
      ))}
      {signInUser.nickname === nickname.slice(1) && (
        <CreateBookButton onClick={handleCraeteBookModalOpen}>
          <PlusIcon />
        </CreateBookButton>
      )}
    </BookGrid>
  );
}

export default KnotTab;
