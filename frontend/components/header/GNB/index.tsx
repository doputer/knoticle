import dynamic from 'next/dynamic';
import Link from 'next/link';

import ArticleIcon from '@assets/ico_article.svg';
import ProfileIcon from '@assets/ico_profile.svg';
import SearchIcon from '@assets/ico_search.svg';
import IconButton from '@components/common/IconButton';
import Profile from '@components/header/Profile';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';

import { GNBContainer, IconWrapper, Logo, LogoWrapper } from './styled';

export default function GNB() {
  const SignInModal = dynamic(() => import('@components/header/SignInModal'));
  const SignUpModal = dynamic(() => import('@components/header/SignUpModal'));

  const { isSignInUser } = useUser();
  const { openModal } = useModal();

  const handleSignUpModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: 'Knoticle 함께하기',
        hasBackward: true,
        children: <SignUpModal />,
      },
    });
  };

  const handleSignInModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: 'Knoticle 시작하기',
        children: <SignInModal handleSignUpModalOpen={handleSignUpModalOpen} />,
      },
    });
  };

  return (
    <GNBContainer>
      <LogoWrapper>
        <Logo href="/">knoticle</Logo>
      </LogoWrapper>

      <IconWrapper>
        <Link aria-label="link" href="/search">
          <SearchIcon />
        </Link>
        {isSignInUser ? (
          <>
            <Link aria-label="link" href="/write">
              <ArticleIcon />
            </Link>
            <Profile />
          </>
        ) : (
          <IconButton icon={<ProfileIcon />} onClick={handleSignInModalOpen} />
        )}
      </IconWrapper>
    </GNBContainer>
  );
}
