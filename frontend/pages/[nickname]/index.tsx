import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import { getUserProfileApi, updateUserProfileApi } from '@apis/userApi';
import curBookmarkedBookListState from '@atoms/curBookmarkedBookList';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import HeaderLayout from '@components/layout/HeaderLayout';
import BookListTab from '@components/shelf/BookListTab';
import EditUserProfile from '@components/shelf/EditUserProfile';
import StudyHead from '@components/shelf/StudyHead';
import UserProfile from '@components/shelf/UserProfile';
import useFetch from '@hooks/useFetch';
import useUser from '@hooks/useUser';
import { IUser } from '@interfaces';
import { PageInnerLarge } from '@styles/layout';

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
  const { signInUser, setUser } = useUser();
  const { data: updatedUserProfile, execute: updateUserProfile } = useFetch(updateUserProfileApi);
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [curBookmarkedBookList, setCurBookmarkedBookList] = useRecoilState(
    curBookmarkedBookListState
  );

  const [curUserProfile, setCurUserProfile] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditFinishBtnClick = () => {
    if (!curUserProfile) return;

    updateUserProfile(curUserProfile);
  };

  useEffect(() => {
    const { nickname } = router.query;

    if (!nickname) return;

    getKnottedBookList(nickname.slice(1));
    getBookmarkedBookList(nickname.slice(1));
  }, []);

  useEffect(() => {
    if (!userProfile) return;

    setCurUserProfile({
      ...userProfile,
    });
  }, [userProfile]);

  useEffect(() => {
    if (updatedUserProfile === undefined || !curUserProfile) return;

    setIsEditing(false);
    setUser({
      ...signInUser,
      nickname: curUserProfile.nickname,
    });
    window.history.replaceState(null, '', `/@${curUserProfile.nickname}`);
  }, [updatedUserProfile]);

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
      {curUserProfile && (
        <PageInnerLarge>
          {isEditing ? (
            <EditUserProfile
              handleEditFinishBtnClick={handleEditFinishBtnClick}
              curUserProfile={curUserProfile}
              setCurUserProfile={setCurUserProfile}
            />
          ) : (
            <UserProfile
              curUserProfile={curUserProfile}
              handleEditBtnClick={() => {
                setIsEditing(true);
              }}
            />
          )}
          <BookListTab
            knottedBookList={curKnottedBookList}
            bookmarkedBookList={curBookmarkedBookList}
            isUserMatched={signInUser.id === curUserProfile.id}
          />
        </PageInnerLarge>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { nickname } = context.query as { [key: string]: string };

  const data = await getUserProfileApi(nickname.slice(1));

  return { props: { userProfile: data } };
};

ShelfPage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout>{page}</HeaderLayout>;
};
