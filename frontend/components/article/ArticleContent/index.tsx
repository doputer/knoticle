import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { deleteArticleApi } from '@apis/articleApi';
import { deleteScrapApi, updateScrapsOrderApi } from '@apis/scrapApi';
import LeftArrowIcon from '@assets/ico_leftBtn.svg';
import Original from '@assets/ico_original.svg';
import RightArrowIcon from '@assets/ico_rightBtn.svg';
import Scrap from '@assets/ico_scrap.svg';
import signInStatusState from '@atoms/signInStatus';
import Content from '@components/common/Content';
import IconButton from '@components/common/IconButton';
import useFetch from '@hooks/useFetch';
import useModal from '@hooks/useModal';
import { IArticleBook, IBookScraps } from '@interfaces';
import { TextSmall } from '@styles/common';
import encodeURL from '@utils/encode-url';
import { toastSuccess } from '@utils/toast';

import {
  ArticleButton,
  ArticleButtonWrapper,
  ArticleContainer,
  ArticleHeader,
  ArticleNavigatorWrapper,
  ArticleTitle,
} from './styled';

interface ArticleProps {
  book: IBookScraps;
  article: IArticleBook;
}

export default function Article({ book, article }: ArticleProps) {
  const ScrapModal = dynamic(() => import('@components/article/ScrapModal'));

  const {
    id: bookId,
    user: { nickname: owner },
    scraps,
  } = book;

  const { title: articleTitle, content } = article;

  const router = useRouter();
  const { openModal } = useModal();

  const user = useRecoilValue(signInStatusState);

  const { data: deleteArticleData, execute: deleteArticle } = useFetch(deleteArticleApi);
  const { execute: deleteScrap } = useFetch(deleteScrapApi);
  const { data: updateScrapsData, execute: updateScrapsOrder } = useFetch(updateScrapsOrderApi);

  const handleOriginalArticleButtonClick = () => {
    router.push(`/@${article.book.user.nickname}/${encodeURL(article.book.title, articleTitle)}`);
  };

  const handlePrevArticleButtonClick = () => {
    const prevOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order - 1;
    const prevArticle = scraps.filter((scrap) => scrap.order === prevOrder)[0].article;

    router.push(
      `/@${prevArticle.book?.user.nickname}/${encodeURL(
        prevArticle.book?.title || '',
        prevArticle.title
      )}`
    );
  };

  const handleNextArticleButtonClick = () => {
    const nextOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order + 1;
    const nextArticle = scraps.filter((scrap) => scrap.order === nextOrder)[0].article;

    router.push(
      `/@${nextArticle.book?.user.nickname}/${encodeURL(
        nextArticle.book?.title || '',
        nextArticle.title
      )}`
    );
  };

  const handleDeleteArticleButtonClick = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '해당 글을 삭제하시겠습니까?',
        handleConfirm: () => {
          const curScrap = scraps.find((scrap) => scrap.article.id === article.id);
          if (!curScrap) return;
          const newScraps = scraps
            .filter((scrap) => scrap.id !== curScrap.id)
            .map((v, i) => ({ ...v, order: i + 1 }));
          updateScrapsOrder(newScraps);
          deleteScrap(curScrap?.id);
          deleteArticle(article.id);
        },
      },
    });
  };

  const handleScrapModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 스크랩하기',
        children: article && <ScrapModal article={article} />,
      },
    });
  };

  const handleDeleteScrapButtonClick = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '해당 글을 책에서 삭제하시겠습니까?',
        handleConfirm: () => {
          const curScrap = scraps.find((scrap) => scrap.article.id === article.id);
          if (!curScrap) return;
          const newScraps = scraps
            .filter((scrap) => scrap.id !== curScrap.id)
            .map((v, i) => ({ ...v, order: i + 1 }));
          updateScrapsOrder(newScraps);
          deleteScrap(curScrap.id);
        },
      },
    });
  };

  const handleUpdateArticleButtonClick = () => {
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

  useEffect(() => {
    if (!deleteArticleData) return;

    toastSuccess(`<${article.title}> 글이 삭제되었습니다`);
    router.push('/');
  }, [deleteArticleData]);

  if (article.deleted_at) return <div>삭제된 글입니다.</div>;

  return (
    <ArticleContainer>
      <ArticleHeader>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleButtonWrapper>
          {article.book_id !== bookId && (
            <ArticleButton onClick={handleOriginalArticleButtonClick}>
              <Image src={Original} alt="Original Icon" width={16} height={16} />
              <TextSmall>원본 글 보기</TextSmall>
            </ArticleButton>
          )}
          {article.book_id === bookId && article.book.user.nickname === user.nickname && (
            <>
              <ArticleButton onClick={handleDeleteArticleButtonClick}>
                <TextSmall>글 삭제</TextSmall>
              </ArticleButton>
              <ArticleButton onClick={handleUpdateArticleButtonClick}>
                <TextSmall>글 수정</TextSmall>
              </ArticleButton>
            </>
          )}
          {article.book_id !== bookId && owner === user.nickname && (
            <ArticleButton onClick={handleDeleteScrapButtonClick}>스크랩 삭제</ArticleButton>
          )}
          {user.id !== 0 && (
            <ArticleButton onClick={handleScrapModalOpen}>
              <Image src={Scrap} alt="Scrap Icon" width={16} height={16} />
              <TextSmall>스크랩</TextSmall>
            </ArticleButton>
          )}
        </ArticleButtonWrapper>
      </ArticleHeader>

      <ArticleNavigatorWrapper>
        <IconButton
          src={LeftArrowIcon}
          alt="Left Arrow Icon"
          onClick={handlePrevArticleButtonClick}
          visible={article.id !== scraps.at(0)?.article.id}
        />
        <IconButton
          src={RightArrowIcon}
          alt="Right Arrow Icon"
          onClick={handleNextArticleButtonClick}
          visible={article.id !== scraps.at(-1)?.article.id}
        />
      </ArticleNavigatorWrapper>

      <Content content={content} />
    </ArticleContainer>
  );
}
