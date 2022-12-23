import { ReactElement, useEffect, useState } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import HomeHead from '@components/home/HomeHead';
import Slider from '@components/home/Slider';
import HeaderLayout from '@components/layout/HeaderLayout';
import useFetch from '@hooks/useFetch';
import { PageInnerLarge } from '@styles/layout';

export default function HomePage() {
  const {
    data: newestBookList,
    isLoading: isNewBookListLoading,
    execute: getNewestBookList,
  } = useFetch(getOrderedBookListApi);

  const [numberPerPage, setNumberPerPage] = useState(0);

  const resizingHandler = () => {
    switch (true) {
      case window.innerWidth > 1300:
        setNumberPerPage(4);
        break;
      case window.innerWidth > 1000:
        setNumberPerPage(3);
        break;
      case window.innerWidth > 700:
        setNumberPerPage(2);
        break;
      default:
        setNumberPerPage(1);
        break;
    }
  };

  useEffect(() => {
    resizingHandler();
    window.addEventListener('resize', resizingHandler);

    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  const {
    data: popularBookList,
    isLoading: isPopularBookListLoading,
    execute: getPopularBookList,
  } = useFetch(getOrderedBookListApi);

  useEffect(() => {
    getNewestBookList('newest');
    getPopularBookList('bookmark');
  }, []);

  return (
    <>
      <HomeHead />
      <PageInnerLarge>
        {numberPerPage !== 0 && (
          <>
            <Slider
              bookList={popularBookList}
              title="가장 인기 있는 책"
              isLoading={isPopularBookListLoading}
              numberPerPage={numberPerPage}
            />
            <Slider
              bookList={newestBookList}
              title="새로 엮은 책"
              isLoading={isNewBookListLoading}
              numberPerPage={numberPerPage}
            />
            <Footer />
          </>
        )}
      </PageInnerLarge>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout>{page}</HeaderLayout>;
};
