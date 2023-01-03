import { useQuery } from 'react-query';

import { getUserBookmarkedBooksApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import { IBookScraps } from '@interfaces';

import { BookGrid } from './styled';

interface BookmarkTabProps {
  nickname: string;
}

function BookmarkTab({ nickname }: BookmarkTabProps) {
  const { data: bookmarkBooks } = useQuery<IBookScraps[]>(
    ['bookmarkBooks', { nickname }],
    () => getUserBookmarkedBooksApi(nickname.slice(1)),
    { refetchOnWindowFocus: false }
  );

  return (
    <BookGrid>
      {bookmarkBooks?.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </BookGrid>
  );
}

export default BookmarkTab;
