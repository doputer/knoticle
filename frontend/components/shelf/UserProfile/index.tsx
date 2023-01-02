import Image from 'next/image';

import EditIcon from '@assets/ico_edit.svg';
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

export default function Profile({ userProfile }: UserProfileProps) {
  const { signInUser } = useUser();

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
        <ProfileEditButton>
          <EditIcon />
          <TextSmall>프로필 수정</TextSmall>
        </ProfileEditButton>
      )}
    </ProfileContainer>
  );
}
