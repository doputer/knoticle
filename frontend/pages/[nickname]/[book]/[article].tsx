import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi } from '@apis/bookApi';
import Article from '@components/article/ArticleContent';
import Sidebar from '@components/article/Sidebar';
import ViewerHead from '@components/article/ViewerHead';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import useFetch from '@hooks/useFetch';
import useModal from '@hooks/useModal';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';
import { parseHeadings } from '@utils/toc';

interface ArticlePageProps {
  article: IArticleBook;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const ScrapModal = dynamic(() => import('@components/article/ScrapModal'));

  const router = useRouter();

  const { openModal } = useModal();

  const { data: book, execute: getBook } = useFetch<IBookScraps>(getBookApi);

  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const handleScrapModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 스크랩하기',
        children: <ScrapModal article={article} />,
      },
    });
  };

  const handleSideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
  };

  const checkArticleAuthority = (targetBook: IBookScraps, id: number) => {
    if (!targetBook) return false;
    if (targetBook.scraps.find((scrap) => scrap.article.id === id)) return true;
    return false;
  };

  const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    if (window.innerWidth > 576) setSideBarOpen(true);

    syncHeight();

    window.addEventListener('resize', syncHeight);

    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  useEffect(() => {
    getBook(article.book_id);
  }, []);

  useEffect(() => {
    if (book === undefined) return;
    if (!checkArticleAuthority(book, article.id)) router.push('/404');
  }, [book]);

  return (
    <>
      <ViewerHead articleTitle={article.title} articleContent={article.content} />
      {book && (
        <Flex>
          <Sidebar
            book={book}
            articleId={article.id}
            headings={parseHeadings(article.content)}
            isOpen={isSideBarOpen}
            handleSideBarToggle={handleSideBarToggle}
          />
          {book.scraps.find((scrap) => scrap.article.id === article.id) && (
            <Article
              article={article}
              scraps={book.scraps}
              bookId={book.id}
              bookAuthor={book.user.nickname}
              articleData={article.content}
              handleScrapModalOpen={handleScrapModalOpen}
            />
          )}
        </Flex>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { article: articleTitle } = context.query as { [key: string]: string };

  const article = await getArticleApi({ title: articleTitle });

  return { props: { article } };
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <PageLayout>{page}</PageLayout>
    </HeaderLayout>
  );
};
