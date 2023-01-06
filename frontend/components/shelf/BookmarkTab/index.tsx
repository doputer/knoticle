import { useQuery } from 'react-query';

import { getUserBookmarksApi } from '@apis/userApi';
import Book from '@components/common/Book';
import { IBookScraps } from '@interfaces';

import { BookGrid } from './styled';

interface BookmarkTabProps {
  nickname: string;
}

function BookmarkTab({ nickname }: BookmarkTabProps) {
  const { data: userBookmarks } = useQuery<IBookScraps[]>(
    ['getUserBookmarks', { nickname }],
    () => getUserBookmarksApi(nickname.slice(1)),
    { refetchOnWindowFocus: false }
  );

  return (
    <BookGrid>
      {userBookmarks?.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </BookGrid>
  );
}

export default BookmarkTab;
