import React, { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import RemoveIcon from '@assets/ico_remove.svg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import editInfoState from '@atoms/editInfo';
import scrapState from '@atoms/scrap';
import Book from '@components/common/Book';
import FAB from '@components/shelf/FAB';
import useModal from '@hooks/useModal';
import { IBookScraps } from '@interfaces';

import EditBookModal from '../EditBookModal';
import {
  BookGrid,
  BookListTabWrapper,
  EditBookWrapper,
  EditModalOpener,
  EditModeIndicator,
  RemoveButton,
  TabTitle,
  TabTitleContent,
} from './styled';

interface BookListTabProps {
  knottedBookList: IBookScraps[];
  bookmarkedBookList: IBookScraps[];
  isUserMatched: boolean;
}

export default function BookListTab({
  knottedBookList,
  bookmarkedBookList,
  isUserMatched,
}: BookListTabProps) {
  const { openModal } = useModal();

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [editInfo, setEditInfo] = useRecoilState(editInfoState);
  const setScraps = useSetRecoilState(scrapState);

  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditBookModalOpen = (id: number) => {
    const curBook = knottedBookList?.find((v) => v.id === id);
    if (!curBook) return;

    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '내 책 수정하기',
        children: curBook && <EditBookModal book={curBook} />,
      },
    });

    setScraps(curBook.scraps);
  };

  const handleMinusBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    const curBook = knottedBookList.find((book) => book.id === id);
    if (!curBook) return;
    const originalArticleList: number[] = [];

    curBook.scraps.forEach((scrap) => {
      if (scrap.is_original) originalArticleList.push(scrap.article.id);
    });

    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '이 책에는 원본 글이 포함되어 있습니다.\n정말로 삭제하시겠습니까?',
        handleConfirm: () => {
          setCurKnottedBookList([...curKnottedBookList.filter((book) => id !== book.id)]);
          setEditInfo({
            ...editInfo,
            deleted: [...editInfo.deleted, id],
            deletedArticle: [...editInfo.deletedArticle, ...originalArticleList],
          });
        },
      },
    });
  };

  const handleEditModalOpenerClick = (e: React.MouseEvent<HTMLDivElement>, bookId: number) => {
    handleEditBookModalOpen(bookId);
  };

  return (
    <BookListTabWrapper>
      {isEditing && <EditModeIndicator>수정 모드</EditModeIndicator>}
      <TabTitle>
        <TabTitleContent
          onClick={() => {
            setTabStatus('knotted');
          }}
          isActive={tabStatus === 'knotted'}
        >
          엮은 책
        </TabTitleContent>
        <TabTitleContent
          onClick={() => {
            setTabStatus('bookmarked');
            setIsEditing(false);
          }}
          isActive={tabStatus === 'bookmarked'}
        >
          북마크한 책
        </TabTitleContent>
      </TabTitle>
      {tabStatus === 'knotted' ? (
        <BookGrid>
          {knottedBookList &&
            knottedBookList.map((book) =>
              isEditing ? (
                <EditBookWrapper key={book.id}>
                  <RemoveButton
                    onClick={(e) => {
                      handleMinusBtnClick(e, book.id);
                    }}
                  >
                    <RemoveIcon />
                  </RemoveButton>
                  <EditModalOpener
                    onClick={(e) => {
                      handleEditModalOpenerClick(e, book.id);
                    }}
                  />
                  <Book book={book} />
                </EditBookWrapper>
              ) : (
                <Book key={book.id} book={book} />
              )
            )}
        </BookGrid>
      ) : (
        <BookGrid>
          {bookmarkedBookList &&
            bookmarkedBookList.map((book) => <Book key={book.id} book={book} />)}
        </BookGrid>
      )}

      {isUserMatched && tabStatus === 'knotted' && (
        <FAB isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </BookListTabWrapper>
  );
}
