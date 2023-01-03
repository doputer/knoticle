import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import { getUserApi } from '@apis/userApi';
import curBookmarkedBookListState from '@atoms/curBookmarkedBookList';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import BookListTab from '@components/shelf/BookListTab';
import StudyHead from '@components/shelf/StudyHead';
import UserProfile from '@components/shelf/UserProfile';
import { DISABLE_REFETCH_OPTIONS } from '@constants/react-query';
import useFetch from '@hooks/useFetch';
import useUser from '@hooks/useUser';

export default function ShelfPage() {
  const router = useRouter();

  const { nickname } = router.query as { nickname: string };

  const { data: userProfile } = useQuery(
    ['getUser'],
    () => getUserApi(nickname.slice(1)),
    DISABLE_REFETCH_OPTIONS
  );
  const { signInUser } = useUser();
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [curBookmarkedBookList, setCurBookmarkedBookList] = useRecoilState(
    curBookmarkedBookListState
  );

  useEffect(() => {
    if (!nickname) return;

    getKnottedBookList(nickname.slice(1));
    getBookmarkedBookList(nickname.slice(1));
  }, [nickname]);

  useEffect(() => {
    if (!knottedBookList) return;

    setCurKnottedBookList(knottedBookList);
  }, [knottedBookList]);

  useEffect(() => {
    if (!bookmarkedBookList) return;

    setCurBookmarkedBookList(bookmarkedBookList);
  }, [bookmarkedBookList]);

  return (
    <>
      <StudyHead
        userNickname={userProfile.nickname}
        userDescription={userProfile.description}
        userImage={userProfile.profile_image}
      />
      <UserProfile userProfile={userProfile} />
      <BookListTab
        knottedBookList={curKnottedBookList}
        bookmarkedBookList={curBookmarkedBookList}
        isUserMatched={signInUser.id === userProfile.id}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { nickname } = context.query as { nickname: string };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getUser'], () => getUserApi(nickname.slice(1)));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

ShelfPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <PageLayout>{page}</PageLayout>
    </HeaderLayout>
  );
};
