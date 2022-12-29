import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import { useRecoilValue } from 'recoil';

import { deleteArticleApi } from '@apis/articleApi';
import { deleteScrapApi } from '@apis/scrapApi';
import EditIcon from '@assets/ico_edit.svg';
import LeftArrowIcon from '@assets/ico_leftBtn.svg';
import OriginIcon from '@assets/ico_origin.svg';
import RightArrowIcon from '@assets/ico_rightBtn.svg';
import StarIcon from '@assets/ico_star.svg';
import TrashIcon from '@assets/ico_trash.svg';
import signInStatusState from '@atoms/signInStatus';
import Content from '@components/common/Content';
import IconButton from '@components/common/IconButton';
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
  getOwnerBook: () => void;
}

export default function Article({
  book: {
    id: bookId,
    title: bookTitle,
    user: { nickname: owner },
    scraps,
  },
  article,
  getOwnerBook,
}: ArticleProps) {
  const ScrapModal = dynamic(() => import('@components/article/ScrapModal'));

  const router = useRouter();
  const { openModal } = useModal();
  const user = useRecoilValue(signInStatusState);

  const navigateArticle = (diff: -1 | 1) => {
    const currentScrapIndex = scraps.findIndex((scrap) => scrap.article.id === article.id);

    const targetScrap = scraps.at(currentScrapIndex + diff);

    router.push(`/@${owner}/${encodeURL(bookTitle, targetScrap?.article.title || '')}`);
  };

  const adjustArticle = () => {
    const currentScrapIndex = scraps.findIndex((scrap) => scrap.article.id === article.id);

    if (scraps.length === 1) {
      router.push('/');
      return;
    }

    if (currentScrapIndex === 0) navigateArticle(1);
    else navigateArticle(-1);
  };

  const { mutate: deleteArticle } = useMutation(deleteArticleApi, {
    onMutate: () => {
      adjustArticle();
    },
    onSuccess: () => {
      toastSuccess(`<${article.title}> 글이 삭제되었습니다`);
      getOwnerBook();
    },
  });

  const { mutate: deleteScrap } = useMutation(deleteScrapApi, {
    onMutate: () => {
      adjustArticle();
    },
    onSuccess: () => {
      toastSuccess(`<${article.title}> 스크랩이 삭제되었습니다`);
      getOwnerBook();
    },
  });

  const handleOriginalArticleButtonClick = () => {
    router.push(`/@${article.book.user.nickname}/${encodeURL(article.book.title, article.title)}`);
  };

  const handlePrevArticleButtonClick = () => {
    navigateArticle(-1);
  };

  const handleNextArticleButtonClick = () => {
    navigateArticle(1);
  };

  const handleScrapModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 스크랩하기',
        children: <ScrapModal article={article} />,
      },
    });
  };

  const handleDeleteArticleButtonClick = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '해당 글을 삭제하시겠습니까?',
        handleConfirm: () => {
          const targetScrap = scraps.find((scrap) => scrap.article.id === article.id);

          if (!targetScrap) return;

          deleteArticle({ articleId: article.id, scrapId: targetScrap.id });
        },
      },
    });
  };

  const handleDeleteScrapButtonClick = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '해당 스크랩을 삭제하시겠습니까?',
        handleConfirm: () => {
          const targetScrap = scraps.find((scrap) => scrap.article.id === article.id);

          if (!targetScrap) return;

          deleteScrap(targetScrap.id);
        },
      },
    });
  };

  const handleUpdateArticleButtonClick = () => {
    router.push(`/write?id=${article.id}`);
  };

  if (article.deleted_at) return <div>삭제된 글입니다.</div>;

  return (
    <ArticleContainer>
      <ArticleHeader>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleButtonWrapper>
          {article.book_id === bookId && article.book.user.nickname === user.nickname && (
            <>
              <ArticleButton onClick={handleUpdateArticleButtonClick}>
                <Image src={EditIcon} alt="Edit Icon" width={20} height={20} />
                <TextSmall>글 수정</TextSmall>
              </ArticleButton>
              <ArticleButton onClick={handleDeleteArticleButtonClick}>
                <Image src={TrashIcon} alt="Trash Icon" width={20} height={20} />
                <TextSmall>글 삭제</TextSmall>
              </ArticleButton>
            </>
          )}
          {user.id !== 0 && (
            <ArticleButton onClick={handleScrapModalOpen}>
              <Image src={StarIcon} alt="Star Icon" width={20} height={20} />
              <TextSmall>스크랩</TextSmall>
            </ArticleButton>
          )}
          {article.book_id !== bookId && owner === user.nickname && (
            <ArticleButton onClick={handleDeleteScrapButtonClick}>
              <Image src={TrashIcon} alt="Trash Icon" width={20} height={20} />
              <TextSmall>스크랩 삭제</TextSmall>
            </ArticleButton>
          )}
          {article.book_id !== bookId && (
            <ArticleButton onClick={handleOriginalArticleButtonClick}>
              <Image src={OriginIcon} alt="Origin Icon" width={20} height={20} />
              <TextSmall>원본 글 보기</TextSmall>
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

      <Content content={article.content} />
    </ArticleContainer>
  );
}
