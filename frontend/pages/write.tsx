import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getUserKnottedBooksApi } from '@apis/bookApi';
import EditHead from '@components/write/EditHead';
import Editor from '@components/write/Editor';
import useFetch from '@hooks/useFetch';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IArticleBook } from '@interfaces';
import { PageNoScrollWrapper } from '@styles/layout';
import { toastError } from '@utils/toast';

export default function WritePage() {
  const PublishModal = dynamic(() => import('@components/write/PublishModal'));
  const ModifyModal = dynamic(() => import('@components/write/ModifyModal'));

  const router = useRouter();
  const { openModal } = useModal();
  const { signInUser } = useUser();

  const [originalArticle, setOriginalArticle] = useState<IArticleBook | undefined>(undefined);

  const { data: books, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);
  const { data: article, execute: getArticle } = useFetch(getArticleApi);

  const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  const handleCreateArticleModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 발행하기',
        children: <PublishModal books={books} />,
      },
    });
  };

  const handleUpdateArticleModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 수정하기',
        children: <ModifyModal books={books} originalArticle={originalArticle} />,
      },
    });
  };

  useEffect(() => {
    syncHeight();

    window.addEventListener('resize', syncHeight);

    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  useEffect(() => {
    getUserKnottedBooks(signInUser.nickname);
  }, [signInUser.nickname]);

  useEffect(() => {
    if (router.query.id) getArticle({ id: router.query.id });
  }, [router.query]);

  useEffect(() => {
    if (!article) return;

    if (article.book.signInUser.nickname !== signInUser.nickname) {
      toastError('수정 권한이 없습니다.');
      router.push('/');
      return;
    }
    setOriginalArticle(article);
  }, [article]);

  return (
    <PageNoScrollWrapper>
      <EditHead />
      <Editor
        handleModalOpen={
          originalArticle ? handleUpdateArticleModalOpen : handleCreateArticleModalOpen
        }
        originalArticle={originalArticle}
      />
    </PageNoScrollWrapper>
  );
}
