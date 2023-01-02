import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { signOutApi } from '@apis/authApi';
import EditIcon from '@assets/ico_edit.svg';
import useFetch from '@hooks/useFetch';
import useUser from '@hooks/useUser';
import { IUser } from '@interfaces';
import { TextLinkMedium } from '@styles/common';

import {
  ButtonGroup,
  LogoutButton,
  ProfileEditButton,
  UserDescription,
  UserDetailGroup,
  Username,
  UserProfileWrapper,
  UserThumbnail,
} from './styled';

interface UserProfileProps {
  curUserProfile: IUser;
  handleEditBtnClick: () => void;
}

export default function UserProfile({ curUserProfile, handleEditBtnClick }: UserProfileProps) {
  const router = useRouter();
  const { signInUser, clearUser } = useUser();
  const { data: user, execute: signOut } = useFetch(signOutApi);

  const handleLogoutBtnClick = () => {
    signOut();
  };

  useEffect(() => {
    if (!user) return;

    clearUser();

    router.push('/');
  }, [user]);

  return (
    <UserProfileWrapper>
      <UserThumbnail src={curUserProfile.profile_image} alt="User1" width={200} height={200} />
      <UserDetailGroup>
        <Username>{curUserProfile.nickname}</Username>
        <UserDescription>{curUserProfile.description}</UserDescription>

        <ButtonGroup isVisible={signInUser.id !== 0 && signInUser.id === curUserProfile.id}>
          <ProfileEditButton type="button" onClick={handleEditBtnClick}>
            <TextLinkMedium>프로필 수정</TextLinkMedium>
            <EditIcon />
          </ProfileEditButton>

          <LogoutButton onClick={handleLogoutBtnClick}>
            <TextLinkMedium>로그아웃</TextLinkMedium>
          </LogoutButton>
        </ButtonGroup>
      </UserDetailGroup>
    </UserProfileWrapper>
  );
}
