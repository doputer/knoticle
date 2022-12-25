import { ReactElement, useEffect, useState } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import HomeHead from '@components/home/HomeHead';
import Slider from '@components/home/Slider';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import useFetch from '@hooks/useFetch';

export default function HomePage() {
  const {
    data: popularBookList,
    isLoading: isPopularBookListLoading,
    execute: getPopularBookList,
  } = useFetch(getOrderedBookListApi);

  const {
    data: newestBookList,
    isLoading: isNewBookListLoading,
    execute: getNewestBookList,
  } = useFetch(getOrderedBookListApi);

  const [bookCount, setBookCountPerPage] = useState(0);

  const handleResizeWindow = () => {
    if (window.innerWidth > 1300) setBookCountPerPage(4);
    else if (window.innerWidth > 1000) setBookCountPerPage(3);
    else if (window.innerWidth > 700) setBookCountPerPage(2);
    else setBookCountPerPage(1);
  };

  useEffect(() => {
    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    getPopularBookList('bookmark');
    getNewestBookList('newest');
  }, []);

  return (
    <>
      <HomeHead />
      <Slider
        title="가장 인기 있는 책"
        bookList={popularBookList}
        bookCount={bookCount}
        isLoading={isPopularBookListLoading}
      />
      <Slider
        title="새로 엮은 책"
        bookList={newestBookList}
        bookCount={bookCount}
        isLoading={isNewBookListLoading}
      />
      <Footer />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <PageLayout>{page}</PageLayout>
    </HeaderLayout>
  );
};
