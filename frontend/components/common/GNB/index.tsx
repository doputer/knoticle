import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import ArticleIcon from '@assets/ico_article.svg';
import PersonIcon from '@assets/ico_person.svg';
import SearchIcon from '@assets/ico_search.svg';
import signInStatusState from '@atoms/signInStatus';

import { GNBContainer, Icon, IconWrapper, Logo, LogoWrapper } from './styled';

interface GNBProps {
  delta: number;
}

export default function GNB({ delta }: GNBProps) {
  const Modal = dynamic(() => import('@components/common/Modal'));
  const SignInModal = dynamic(() => import('@components/auth/SignInModal'));
  const SignUpModal = dynamic(() => import('@components/auth/SignUpModal'));

  const [isModalShown, setModalShown] = useState(false);
  const [currentModalState, setCurrentModalState] = useState<'SignIn' | 'SignUp'>('SignIn');
  const signInStatus = useRecoilValue(signInStatusState);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => {
    setModalShown(false);
    setCurrentModalState('SignIn');
  };
  const handleGoToSignUpBtnClicked = () => setCurrentModalState('SignUp');
  const handleBackwardClick = () => setCurrentModalState('SignIn');

  return (
    <GNBContainer delta={delta}>
      <LogoWrapper>
        <Logo href="/">knoticle</Logo>
      </LogoWrapper>

      <IconWrapper>
        {signInStatus.id !== 0 ? (
          <>
            <Link href="/write">
              <Icon src={ArticleIcon} alt="Article Icon" />
            </Link>
            <Link href={`/@${signInStatus.nickname}`}>
              <Icon src={PersonIcon} alt="Person Icon" />
            </Link>
          </>
        ) : (
          <Icon src={PersonIcon} alt="Person Icon" onClick={handleModalOpen} />
        )}
        <Link href="/search">
          <Icon src={SearchIcon} alt="Search Icon" />
        </Link>
      </IconWrapper>

      {isModalShown &&
        ((currentModalState === 'SignUp' && (
          <Modal
            title="Knoticle 함께하기"
            handleModalClose={handleModalClose}
            handleBackwardClick={handleBackwardClick}
            hasBackward
          >
            <SignUpModal handleModalClose={handleModalClose} />
          </Modal>
        )) || (
          <Modal title="Knoticle 시작하기" handleModalClose={handleModalClose}>
            <SignInModal
              handleGoToSignUpBtnClicked={handleGoToSignUpBtnClicked}
              handleModalClose={handleModalClose}
            />
          </Modal>
        ))}
    </GNBContainer>
  );
}
