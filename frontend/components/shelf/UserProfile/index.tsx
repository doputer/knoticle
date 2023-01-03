import dynamic from 'next/dynamic';
import Image from 'next/image';

import EditIcon from '@assets/ico_edit.svg';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { IUser } from '@interfaces';
import { TextSmall } from '@styles/common';

import {
  Description,
  Nickname,
  ProfileContainer,
  ProfileEditButton,
  UserInformation,
  UserThumbnail,
} from './styled';

interface UserProfileProps {
  userProfile: IUser;
}

export default function UserProfile({ userProfile }: UserProfileProps) {
  const ProfileEditModal = dynamic(() => import('@components/shelf/ProfileEditModal'));

  const { signInUser } = useUser();
  const { openModal } = useModal();

  const handleProfileEditModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '회원 정보 수정하기',
        children: <ProfileEditModal profile={userProfile} />,
      },
    });
  };

  return (
    <ProfileContainer>
      <UserThumbnail>
        <Image src={userProfile.profile_image} alt="thumbnail" width={128} height={128} priority />
      </UserThumbnail>
      <UserInformation>
        <Nickname>{userProfile.nickname}</Nickname>
        <Description>{userProfile.description}</Description>
      </UserInformation>
      {signInUser.id === userProfile.id && (
        <ProfileEditButton onClick={handleProfileEditModalOpen}>
          <EditIcon />
          <TextSmall>프로필 수정</TextSmall>
        </ProfileEditButton>
      )}
    </ProfileContainer>
  );
}
