import Image from 'next/image';
import { useRouter } from 'next/router';

import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import { deleteArticleApi } from '@apis/articleApi';
import { deleteScrapApi, updateScrapsOrderApi } from '@apis/scrapApi';
import LeftBtnIcon from '@assets/ico_leftBtn.svg';
import Original from '@assets/ico_original.svg';
import RightBtnIcon from '@assets/ico_rightBtn.svg';
import Scrap from '@assets/ico_scrap.svg';
import signInStatusState from '@atoms/signInStatus';
import Content from '@components/common/Content';
import useFetch from '@hooks/useFetch';
import useScrollDetector from '@hooks/useScrollDetector';
import { IArticleBook, IScrap } from '@interfaces';
import encodeURL from '@utils/encode-url';
import { toastSuccess } from '@utils/toast';

import ArticleButton from './Button';
import {
  ArticleContainer,
  ArticleLeftBtn,
  ArticleMain,
  ArticleRightBtn,
  ArticleTitle,
  ArticleTitleBtnBox,
  ArticleContentsWrapper,
  ArticleMoveBtnContainer,
  ArticleTitleWrapper,
} from './styled';

interface ArticleProps {
  article: IArticleBook;
  scraps: IScrap[];
  bookId: number;
  bookAuthor: string;
  articleData: string;
  handleScrapBtnClick: () => void;
  setIsScrollDown: Dispatch<SetStateAction<'true' | 'false'>>;
}

export default function Article({
  article,
  scraps,
  bookId,
  bookAuthor,
  articleData,
  handleScrapBtnClick,
  setIsScrollDown,
}: ArticleProps) {
  const user = useRecoilValue(signInStatusState);

  const { data: deleteArticleData, execute: deleteArticle } = useFetch(deleteArticleApi);
  const { execute: deleteScrap } = useFetch(deleteScrapApi);
  const { data: updateScrapsData, execute: updateScrapsOrder } = useFetch(updateScrapsOrderApi);

  const router = useRouter();

  const handleOriginalBtnOnClick = () => {
    router.push(`/@${article.book.user.nickname}/${encodeURL(article.book.title, article.title)}`);
  };

  const handleLeftBtnOnClick = () => {
    const prevOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order - 1;
    const prevArticle = scraps.filter((scrap) => scrap.order === prevOrder)[0].article;

    router.push(
      `/@${prevArticle.book?.user.nickname}/${encodeURL(
        prevArticle.book?.title || '',
        prevArticle.title
      )}`
    );
  };

  const handleRightBtnOnClick = () => {
    const nextOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order + 1;
    const nextArticle = scraps.filter((scrap) => scrap.order === nextOrder)[0].article;

    router.push(
      `/@${nextArticle.book?.user.nickname}/${encodeURL(
        nextArticle.book?.title || '',
        nextArticle.title
      )}`
    );
  };

  const handleDeleteBtnOnClick = () => {
    if (window.confirm('해당 글을 삭제하시겠습니까?')) {
      const curScrap = scraps.find((scrap) => scrap.article.id === article.id);
      if (!curScrap) return;
      const newScraps = scraps
        .filter((scrap) => scrap.id !== curScrap.id)
        .map((v, i) => ({ ...v, order: i + 1 }));
      updateScrapsOrder(newScraps);
      deleteScrap(curScrap?.id);
      deleteArticle(article.id);
    }
  };

  const handleScrapDeleteBtnOnClick = () => {
    if (window.confirm('해당 글을 책에서 삭제하시겠습니까?')) {
      const curScrap = scraps.find((scrap) => scrap.article.id === article.id);
      if (!curScrap) return;
      const newScraps = scraps
        .filter((scrap) => scrap.id !== curScrap.id)
        .map((v, i) => ({ ...v, order: i + 1 }));
      updateScrapsOrder(newScraps);
      deleteScrap(curScrap.id);
    }
  };

  const handleModifyBtnOnClick = () => {
    router.push(`/write?id=${article.id}`);
  };

  useEffect(() => {
    if (deleteArticleData !== undefined) router.push('/');
  }, [deleteArticleData]);

  useEffect(() => {
    if (updateScrapsData === undefined) return;

    if (updateScrapsData.length !== 0) {
      router.push(
        `/@${updateScrapsData[0].article.book.user.nickname}/${encodeURL(
          updateScrapsData[0].article.book.title,
          updateScrapsData[0].article.title
        )}`
      );

      return;
    }
    router.push('/');
  }, [updateScrapsData]);

  const scrollTarget = useRef() as RefObject<HTMLDivElement>;
  const isScrollDown = useScrollDetector(scrollTarget, 5);

  useEffect(() => {
    setIsScrollDown(isScrollDown ? 'true' : 'false');
  }, [isScrollDown]);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollTop = 0;
    }
  }, [router.query.data]);

  useEffect(() => {
    if (!deleteArticleData) return;

    toastSuccess(`<${article.title}> 글이 삭제되었습니다`);
    router.push('/');
  }, [deleteArticleData]);

  return (
    <ArticleContainer>
      <ArticleMain ref={scrollTarget}>
        {!article.deleted_at ? (
          <ArticleContentsWrapper>
            <ArticleTitleWrapper>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleTitleBtnBox>
                {article.book_id !== bookId && (
                  <ArticleButton onClick={handleOriginalBtnOnClick}>
                    <Image src={Original} alt="Original Icon" width={20} height={15} />
                    원본 글 보기
                  </ArticleButton>
                )}
                {article.book_id === bookId && article.book.user.nickname === user.nickname && (
                  <>
                    <ArticleButton onClick={handleDeleteBtnOnClick}>글 삭제</ArticleButton>
                    <ArticleButton onClick={handleModifyBtnOnClick}>글 수정</ArticleButton>
                  </>
                )}
                {article.book_id !== bookId && bookAuthor === user.nickname && (
                  <ArticleButton onClick={handleScrapDeleteBtnOnClick}>스크랩 삭제</ArticleButton>
                )}
                {user.id !== 0 && (
                  <ArticleButton onClick={handleScrapBtnClick}>
                    <Image src={Scrap} alt="Scrap Icon" width={20} height={15} />
                    스크랩
                  </ArticleButton>
                )}
              </ArticleTitleBtnBox>
            </ArticleTitleWrapper>
            <Content content={articleData} />
          </ArticleContentsWrapper>
        ) : (
          <div>삭제된 글입니다.</div>
        )}

        <ArticleMoveBtnContainer>
          <ArticleLeftBtn
            onClick={handleLeftBtnOnClick}
            visibility={article.id === scraps.at(0)?.article.id ? 'hidden' : 'visible'}
          >
            <Image src={LeftBtnIcon} width={24} height={24} alt="Left Arrow Icon" />
          </ArticleLeftBtn>
          <ArticleRightBtn
            onClick={handleRightBtnOnClick}
            visibility={article.id === scraps.at(-1)?.article.id ? 'hidden' : 'visible'}
          >
            <Image src={RightBtnIcon} width={24} height={24} alt="Right Arrow Icon" />
          </ArticleRightBtn>
        </ArticleMoveBtnContainer>
      </ArticleMain>
    </ArticleContainer>
  );
}
