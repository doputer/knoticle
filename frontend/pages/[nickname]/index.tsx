import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import { getUserProfileApi } from '@apis/userApi';
import curBookmarkedBookListState from '@atoms/curBookmarkedBookList';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import BookListTab from '@components/shelf/BookListTab';
import StudyHead from '@components/shelf/StudyHead';
import UserProfile from '@components/shelf/UserProfile';
import useFetch from '@hooks/useFetch';
import useUser from '@hooks/useUser';

interface ShelfPageProps {
  userProfile: {
    id: number;
    profile_image: string;
    nickname: string;
    description: string;
  };
}

export default function ShelfPage({ userProfile }: ShelfPageProps) {
  const router = useRouter();
  const { signInUser } = useUser();
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [curBookmarkedBookList, setCurBookmarkedBookList] = useRecoilState(
    curBookmarkedBookListState
  );

  useEffect(() => {
    const { nickname } = router.query;

    if (!nickname) return;

    getKnottedBookList(nickname.slice(1));
    getBookmarkedBookList(nickname.slice(1));
  }, []);

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
  const { nickname } = context.query as { [key: string]: string };

  const data = await getUserProfileApi(nickname.slice(1));

  return { props: { userProfile: data } };
};

ShelfPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <PageLayout>{page}</PageLayout>
    </HeaderLayout>
  );
};
