import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ReactElement, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getUserApi } from '@apis/userApi';
import HeaderLayout from '@components/layout/HeaderLayout';
import PageLayout from '@components/layout/PageLayout';
import KnotTab from '@components/shelf/KnotTab';
import StudyHead from '@components/shelf/StudyHead';
import TabFilter, { type TabType } from '@components/shelf/TabFilter';
import UserProfile from '@components/shelf/UserProfile';
import { DISABLE_REFETCH_OPTIONS } from '@constants/react-query';

export default function ShelfPage() {
  const BookmarkTab = dynamic(() => import('@components/shelf/BookmarkTab'));

  const router = useRouter();

  const { nickname } = router.query as { nickname: string };

  const { data: profile } = useQuery(
    ['getUser'],
    () => getUserApi(nickname.slice(1)),
    DISABLE_REFETCH_OPTIONS
  );
  const [tab, setTab] = useState<TabType>('knot');

  const handleTab = (type: TabType) => {
    setTab(type);
  };

  return (
    <>
      <StudyHead
        userNickname={profile.nickname}
        userDescription={profile.description}
        userImage={profile.profile_image}
      />
      <UserProfile profile={profile} />
      <TabFilter tab={tab} handleTab={handleTab} />
      {tab === 'knot' && <KnotTab nickname={nickname} />}
      {tab === 'bookmark' && <BookmarkTab nickname={nickname} />}
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
