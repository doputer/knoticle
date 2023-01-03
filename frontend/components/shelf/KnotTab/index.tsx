import { useQuery } from 'react-query';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import MoreIcon from '@assets/ico_more.svg';
import Book from '@components/common/Book';
import IconButton from '@components/common/IconButton';
import useUser from '@hooks/useUser';
import { IBookScraps } from '@interfaces';

import { BookGrid, OptionWrapper } from './styled';

interface KnotTabProps {
  nickname: string;
}

function KnotTab({ nickname }: KnotTabProps) {
  const { signInUser } = useUser();
  const { data: knotBooks } = useQuery<IBookScraps[]>(
    ['knotBooks', { nickname }],
    () => getUserKnottedBooksApi(nickname.slice(1)),
    { refetchOnWindowFocus: false }
  );

  return (
    <BookGrid>
      {knotBooks?.map((book) => (
        <div key={book.id}>
          {signInUser.nickname === nickname.slice(1) && (
            <OptionWrapper>
              <IconButton icon={<MoreIcon />} onClick={() => alert(1)} />
            </OptionWrapper>
          )}
          <Book book={book} />
        </div>
      ))}
    </BookGrid>
  );
}

export default KnotTab;
