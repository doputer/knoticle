import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import { createScrapApi } from '@apis/scrapApi';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/modal/ModalButton';
import useFetch from '@hooks/useFetch';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IArticle, IBook, IBookScraps, IScrap } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import { ArticleWrapper, DragArticleText, Label, ScrapModalWrapper, WarningLabel } from './styled';

interface ScrapModalProps {
  article: IArticle;
}

export default function ScrapModal({ article }: ScrapModalProps) {
  const { signInUser } = useUser();
  const { closeEveryModal } = useModal();

  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [filteredScraps, setFilteredScraps] = useState<IScrap[]>([]);
  const { data: createScrapData, execute: createScrap } = useFetch(createScrapApi);
  const { data: books, execute: getUserKnottedBooks } =
    useFetch<IBookScraps[]>(getUserKnottedBooksApi);

  const [scrapList, setScrapList] = useRecoilState(scrapState);

  const [isSelectedBookUnavailable, setSelectedBookUnavailable] = useState(false);

  const createBookDropdownItems = (items: IBook[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const createScrapDropdownItems = (items: IScrap[]) => {
    return [
      {
        id: 0,
        order: 0,
        is_original: true,
        article: { id: article.id, title: article.title },
      },
      ...items,
    ];
  };

  const checkArticleExistsInBook = (articleId: number, items: IScrap[]) => {
    return items.some((item) => item.article.id === articleId);
  };

  const handleScrapBtnClick = () => {
    if (selectedBookIndex === -1) return;

    const scraps = scrapList.map((v, i) => ({ ...v, order: i + 1 }));

    createScrap({ book_id: selectedBookIndex, article_id: article.id, scraps });
  };
  useEffect(() => {
    getUserKnottedBooks(signInUser.nickname);
  }, [signInUser.nickname]);

  useEffect(() => {
    if (selectedBookIndex === -1 || !books) return;

    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    if (!selectedBook || checkArticleExistsInBook(article.id, selectedBook.scraps)) {
      setSelectedBookIndex(-1);
      setSelectedBookUnavailable(true);
      setFilteredScraps([]);
      return;
    }

    setSelectedBookUnavailable(false);
    setFilteredScraps(selectedBook.scraps);

    setFilteredScraps(selectedBook ? selectedBook.scraps : []);
  }, [selectedBookIndex]);

  useEffect(() => {
    setScrapList(createScrapDropdownItems(filteredScraps));
  }, [filteredScraps]);

  useEffect(() => {
    if (createScrapData === undefined) return;
    toastSuccess(`<${article.title}> 글이 스크랩되었습니다.`);
    closeEveryModal();
  }, [createScrapData]);

  return (
    <ScrapModalWrapper>
      <Label>책 선택</Label>
      {books && (
        <Dropdown
          label="글이 담길 책을 선택해주세요."
          items={createBookDropdownItems(books)}
          selectedId={selectedBookIndex}
          handleItemSelect={(id) => setSelectedBookIndex(id)}
        />
      )}
      {isSelectedBookUnavailable && (
        <WarningLabel>선택하신 책에 이미 동일한 글이 존재합니다.</WarningLabel>
      )}
      {filteredScraps.length !== 0 && (
        <>
          <Label>순서 수정</Label>
          <ArticleWrapper>
            <DragArticle isContentsShown isDeleteBtnShown={false} />
          </ArticleWrapper>
          <DragArticleText>드래그앤드롭으로 글의 순서를 변경할 수 있습니다.</DragArticleText>
        </>
      )}
      <ModalButton theme="primary" onClick={handleScrapBtnClick}>
        스크랩하기
      </ModalButton>
    </ScrapModalWrapper>
  );
}
