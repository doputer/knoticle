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
  profile: IUser;
}

export default function UserProfile({ profile }: UserProfileProps) {
  const UpdateProfileModal = dynamic(() => import('@components/shelf/UpdateProfileModal'));

  const { signInUser } = useUser();
  const { openModal } = useModal();

  const handleProfileEditModalOpen = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '회원 정보 수정하기',
        children: <UpdateProfileModal profile={profile} />,
      },
    });
  };

  return (
    <ProfileContainer>
      <UserThumbnail>
        <Image src={profile.profile_image} alt="thumbnail" width={128} height={128} priority />
      </UserThumbnail>
      <UserInformation>
        <Nickname>{profile.nickname}</Nickname>
        <Description>{profile.description}</Description>
      </UserInformation>
      {signInUser.id === profile.id && (
        <ProfileEditButton onClick={handleProfileEditModalOpen}>
          <EditIcon />
          <TextSmall>프로필 수정</TextSmall>
        </ProfileEditButton>
      )}
    </ProfileContainer>
  );
}
