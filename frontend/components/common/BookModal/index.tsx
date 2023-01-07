import dynamic from 'next/dynamic';

import { useQuery } from 'react-query';

import { getUserBooksApi } from '@apis/userApi';
import ModalButton from '@components/modal/ModalButton';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IArticle, IBookScraps } from '@interfaces';

import { SelectBookModalContainer, SelectItem, SelectWrapper } from './styled';

interface BookModalProps {
  article: IArticle;
}

export default function BookModal({ article }: BookModalProps) {
  const ScrapModal = dynamic(() => import('@components/common/ScrapModal'));

  const { signInUser } = useUser();
  const { openModal, closeModal } = useModal();
  const { data: userBooks } = useQuery<IBookScraps[]>(
    ['getUserBooks', { nickname: signInUser.nickname }],
    () => getUserBooksApi(signInUser.nickname),
    { refetchOnWindowFocus: false }
  );

  const handleItemClick = (book: IBookScraps) => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 스크랩하기',
        children: <ScrapModal book={book} article={article} />,
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
      <ModalButton theme="primary" onClick={closeModal}>
        완료하기
      </ModalButton>
    </SelectBookModalContainer>
  );
}
