import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { addBookApi } from '@apis/bookApi';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import Button from '@components/common/ModalButton';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { FlexSpaceBetween } from '@styles/layout';
import { toastError, toastSuccess } from '@utils/toast';

import {
  Article,
  Author,
  BookContent,
  BookContents,
  BookContentsInfo,
  BookInfoContainer,
  BookThumbnail,
  BookTitle,
  BookWrapper,
  Input,
} from './styled';

export default function AddBook() {
  const { signInUser } = useUser();
  const { closeEveryModal } = useModal();

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const title = useInput('');
  const { data: addBookData, execute: addBook } = useFetch(addBookApi);

  useEffect(() => {
    if (!addBookData) return;
    setCurKnottedBookList([...curKnottedBookList, addBookData]);
    closeEveryModal();
    toastSuccess(`<${addBookData.title}>책이 생성되었습니다!`);
  }, [addBookData]);

  const handleAddBookBtnClick = () => {
    if (title.value === '') {
      toastError('책 제목이 비어있습니다.');
      return;
    }

    addBook({ title: title.value });
  };
  return (
    <>
      <BookWrapper>
        <BookThumbnail src={SampleThumbnail} alt="thumbnail" />

        <BookInfoContainer>
          <FlexSpaceBetween>
            <BookTitle>
              <Input type="text" placeholder="제목을 입력하세요." {...title} />
              <Author>by {signInUser.nickname}</Author>
            </BookTitle>
          </FlexSpaceBetween>
          <BookContentsInfo>
            <BookContent>Contents</BookContent>
            <BookContents>
              <Article>새로운 글들로 채워주세요</Article>
            </BookContents>
          </BookContentsInfo>
        </BookInfoContainer>
      </BookWrapper>
      <Button theme="primary" onClick={handleAddBookBtnClick}>
        책 추가하기
      </Button>
    </>
  );
}
