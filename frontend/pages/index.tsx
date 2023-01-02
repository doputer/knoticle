import { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getBooksApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import HomeHead from '@components/home/HomeHead';
import Slider from '@components/home/Slider';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import { FlexColumnCenter } from '@styles/layout';

export default function HomePage() {
  const { isLoading: isPopularBooksLoading, data: popularBooks } = useQuery(
    'getPopularBooks',
    () => getBooksApi({ order: 'bookmark', take: 12 }),
    { refetchOnWindowFocus: false }
  );
  const { isLoading: isNewestBooksLoading, data: newestBooks } = useQuery(
    'getNewestBooks',
    () => getBooksApi({ order: 'newest', take: 12 }),
    { refetchOnWindowFocus: false }
  );

  const [bookCountPerPage, setBookCountPerPage] = useState(0);

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

  return (
    <>
      <HomeHead />
      {bookCountPerPage !== 0 && (
        <FlexColumnCenter>
          <Slider
            title="가장 인기 있는 책"
            books={popularBooks}
            bookCountPerPage={bookCountPerPage}
            isLoading={isPopularBooksLoading}
          />
          <Slider
            title="새로 엮은 책"
            books={newestBooks}
            bookCountPerPage={bookCountPerPage}
            isLoading={isNewestBooksLoading}
          />
          <Footer />
        </FlexColumnCenter>
      )}
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
