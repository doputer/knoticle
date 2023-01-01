import Image from 'next/image';
import Link from 'next/link';

import useUser from '@hooks/useUser';

import { ProfileContainer, ProfileImage } from './styled';

export default function Profile() {
  const { signInUser } = useUser();

  return (
    <ProfileContainer>
      <Link href={`/@${signInUser.nickname}`}>
        <ProfileImage>
          <Image
            src={signInUser.profile_image}
            alt="Profile Image"
            width={32}
            height={32}
            priority
          />
        </ProfileImage>
      </Link>
    </ProfileContainer>
  );
}
