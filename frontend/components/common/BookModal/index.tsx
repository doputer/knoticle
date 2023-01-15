import dynamic from 'next/dynamic';

import { useQuery } from 'react-query';

import { getUserBooksApi } from '@apis/userApi';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IBookScraps } from '@interfaces';

import { SelectBookModalContainer, SelectItem, SelectLabel, SelectWrapper } from './styled';

export interface BookModalProps {
  article: {
    id: number;
    title: string;
    content: string;
  };
  mode: 'CREATE' | 'UPDATE' | 'SCRAP';
}

export default function BookModal({ article, mode }: BookModalProps) {
  const ScrapModal = dynamic(() => import('@components/common/ScrapModal'));

  const { signInUser } = useUser();
  const { openModal } = useModal();
  const { data: userBooks } = useQuery<IBookScraps[]>(
    ['getUserBooks', { nickname: signInUser.nickname }],
    () => getUserBooksApi(signInUser.nickname),
    { refetchOnWindowFocus: false }
  );

  const getScrapModalTitle = () => {
    if (mode === 'CREATE') return '글 발행하기';
    if (mode === 'UPDATE') return '글 수정하기';
    if (mode === 'SCRAP') return '글 스크랩하기';
    return '글 수정하기';
  };

  const handleItemClick = (book: IBookScraps) => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: getScrapModalTitle(),
        children: <ScrapModal book={book} article={article} mode={mode} />,
        hasBackward: true,
      },
    });
  };

  return (
    <SelectBookModalContainer>
      <SelectWrapper>
        {userBooks?.map((book) => (
          <SelectItem key={book.id} onClick={() => handleItemClick(book)}>
            {book.title}
          </SelectItem>
        ))}
      </SelectWrapper>
      <SelectLabel>책을 선택해주세요.</SelectLabel>
    </SelectBookModalContainer>
  );
}
