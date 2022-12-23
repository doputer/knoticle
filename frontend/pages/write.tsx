import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getArticleApi } from '@apis/articleApi';
import { getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import EditHead from '@components/edit/EditHead';
import Editor from '@components/edit/Editor';
import useFetch from '@hooks/useFetch';
import useModal from '@hooks/useModal';
import { IArticleBook } from '@interfaces';
import { PageNoScrollWrapper } from '@styles/layout';
import { toastError } from '@utils/toast';

export default function WritePage() {
  const PublishModal = dynamic(() => import('@components/edit/PublishModal'));
  const ModifyModal = dynamic(() => import('@components/edit/ModifyModal'));

  const router = useRouter();

  const { openModal } = useModal();

  const [originalArticle, setOriginalArticle] = useState<IArticleBook | undefined>(undefined);

  const { data: books, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);
  const { data: article, execute: getArticle } = useFetch(getArticleApi);

  const user = useRecoilValue(signInStatusState);

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
    getUserKnottedBooks(user.nickname);
  }, [user.nickname]);

  useEffect(() => {
    if (router.query.id) getArticle({ id: router.query.id });
  }, [router.query]);

  useEffect(() => {
    if (!article) return;

    if (article.book.user.nickname !== user.nickname) {
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
