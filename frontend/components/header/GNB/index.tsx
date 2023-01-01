import dynamic from 'next/dynamic';
import Link from 'next/link';

import ArticleIcon from '@assets/ico_article.svg';
import PersonIcon from '@assets/ico_person.svg';
import SearchIcon from '@assets/ico_search.svg';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';

import { GNBContainer, Icon, IconWrapper, Logo, LogoWrapper } from './styled';

export default function GNB() {
  const SignInModal = dynamic(() => import('@components/header/SignInModal'));
  const SignUpModal = dynamic(() => import('@components/header/SignUpModal'));

  const { signInUser, isSignInUser } = useUser();
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
        <Link href="/search">
          <Icon src={SearchIcon} alt="Search Icon" />
        </Link>
        {isSignInUser ? (
          <>
            <Link href="/write">
              <Icon src={ArticleIcon} alt="Article Icon" />
            </Link>
            <Link href={`/@${signInUser.nickname}`}>
              <Icon src={PersonIcon} alt="Person Icon" />
            </Link>
          </>
        ) : (
          <Icon src={PersonIcon} alt="Person Icon" onClick={handleSignInModalOpen} />
        )}
      </IconWrapper>
    </GNBContainer>
  );
}
