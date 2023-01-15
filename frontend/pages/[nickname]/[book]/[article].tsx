import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getOwnerArticleApi } from '@apis/articleApi';
import { getOwnerBookApi } from '@apis/bookApi';
import Article from '@components/article/ArticleContent';
import Sidebar from '@components/article/Sidebar';
import ViewerHead from '@components/article/ViewerHead';
import HeaderLayout from '@components/layout/HeaderLayout';
import { DISABLE_REFETCH_OPTIONS } from '@constants/react-query';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

export default function ArticlePage() {
  const router = useRouter();

  const {
    article: articleTitle,
    book: bookTitle,
    nickname: owner,
  } = router.query as {
    article: string;
    book: string;
    nickname: string;
  };

  const { data: book, refetch: getOwnerBook } = useQuery<IBookScraps>(
    ['getOwnerBook', { bookTitle, owner }],
    () => getOwnerBookApi({ title: bookTitle, owner: owner.slice(1) }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: article } = useQuery<IArticleBook>(
    ['getOwnerArticle'],
    () => getOwnerArticleApi({ articleTitle, bookTitle, owner: owner.slice(1) }),
    DISABLE_REFETCH_OPTIONS
  );

  const [isSideBarOpen, setSideBarOpen] = useState(true);

  const handleSideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (window.innerWidth < 576) setSideBarOpen(false);
  }, []);

  useEffect(() => {
    if (book?.scraps.length === 0) router.push('/');
  }, [book?.scraps]);

  if (!book || !article) return null;

  return (
    <>
      <ViewerHead articleTitle={article.title} articleContent={article.content} />
      <Flex>
        <Sidebar
          book={book}
          article={article}
          isOpen={isSideBarOpen}
          handleSideBarToggle={handleSideBarToggle}
        />
        <Article book={book} article={article} getOwnerBook={getOwnerBook} />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    article: articleTitle,
    book: bookTitle,
    nickname: owner,
  } = context.query as {
    article: string;
    book: string;
    nickname: string;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getOwnerArticle'], () =>
    getOwnerArticleApi({ articleTitle, bookTitle, owner: owner.slice(1) })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout>{page}</HeaderLayout>;
};
