import { useQuery } from 'react-query';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import useUser from '@hooks/useUser';
import { IBookScraps } from '@interfaces';

import BookOption from '../BookOption';
import { BookGrid, BookWrapper } from './styled';

interface KnotTabProps {
  nickname: string;
}

function KnotTab({ nickname }: KnotTabProps) {
  const { signInUser } = useUser();
  const { data: knotBooks } = useQuery<IBookScraps[]>(
    ['knotBooks', { nickname: nickname.slice(1) }],
    () => getUserKnottedBooksApi(nickname.slice(1)),
    { refetchOnWindowFocus: false }
  );

  return (
    <BookGrid>
      {knotBooks?.map((book) => (
        <BookWrapper key={book.id}>
          {signInUser.nickname === nickname.slice(1) && <BookOption book={book} />}
          <Book book={book} />
        </BookWrapper>
      ))}
    </BookGrid>
  );
}

export default KnotTab;
