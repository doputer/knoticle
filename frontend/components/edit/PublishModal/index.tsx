import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createArticleApi, modifyArticleApi } from '@apis/articleApi';
import articleState from '@atoms/article';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IArticle, IBook, IBookScraps, IScrap } from '@interfaces';
import { IEditScrap } from 'interfaces/scrap.interface';

import { ArticleWrapper, Label, PublishModalWrapper } from './styled';

interface PublishModalProps {
  books: IBookScraps[];
  originalArticle?: IArticle;
}

export default function PublishModal({ books, originalArticle }: PublishModalProps) {
  const router = useRouter();

  const { id: originalArticleId, book_id: originalBookId } = originalArticle as IArticle;

  const { data: createdArticle, execute: createArticle } = useFetch(createArticleApi);
  const { data: modifiedArticle, execute: modifyArticle } = useFetch(modifyArticleApi);

  // 전역으로 관리해야할까?
  const [article, setArticle] = useRecoilState(articleState);

  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [filteredScraps, setFilteredScraps] = useState<IScrap[]>([]);
  const [scrapList, setScrapList] = useRecoilState<any>(scrapState);

  const createBookDropdownItems = (items: IBook[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const createScrapDropdownItems = (items: IEditScrap[]) => {
    // 깔끔하게 리팩토릭 필요
    const itemList = [...items];

    if (originalBookId !== -1 && selectedBookIndex !== originalBookId)
      itemList.push({ id: 0, order: items.length + 1, article: { id: 0, title: article.title } });
    return itemList;
  };

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    setFilteredScraps(selectedBook ? selectedBook.scraps : []);

    setArticle({
      ...article,
      book_id: selectedBookIndex,
    });
  }, [selectedBookIndex]);
  useEffect(() => {
    setScrapList(createScrapDropdownItems(filteredScraps));
  }, [filteredScraps]);

  const handlePublishBtnClick = () => {
    const scraps = scrapList.map((v: IEditScrap, i: number) => ({ ...v, order: i + 1 }));

    createArticle({ article, scraps });
    router.push('/');
  };

  const handleModifyBtnClick = () => {
    const scraps = scrapList.map((v: IEditScrap, i: number) => ({ ...v, order: i + 1 }));

    modifyArticle(originalArticleId, { article, scraps });
    router.push('/');
  };

  useEffect(() => {
    if (modifiedArticle || createdArticle) router.push('/');
  }, [modifiedArticle, createdArticle]);

  return (
    <PublishModalWrapper>
      <Label>책 선택</Label>
      <Dropdown
        label="글이 담길 책을 선택해주세요."
        items={createBookDropdownItems(books)}
        selectedId={selectedBookIndex}
        handleItemSelect={(id) => setSelectedBookIndex(id)}
      />

      {filteredScraps.length !== 0 && (
        <ArticleWrapper>
          <Label>순서 선택</Label>
          <DragArticle data={createScrapDropdownItems(filteredScraps)} isContentsShown />
        </ArticleWrapper>
      )}

      {originalBookId !== -1 ? (
        <ModalButton theme="primary" onClick={handleModifyBtnClick}>
          수정하기
        </ModalButton>
      ) : (
        <ModalButton theme="primary" onClick={handlePublishBtnClick}>
          발행하기
        </ModalButton>
      )}
    </PublishModalWrapper>
  );
}

PublishModal.defaultProps = {
  originalArticle: { id: -1, book_id: -1 },
};
