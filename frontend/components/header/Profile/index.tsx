import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { signOutApi } from '@apis/authApi';
import useUser from '@hooks/useUser';

import { Dropdown, DropdownItem, ProfileContainer, ProfileImage } from './styled';

export default function Profile() {
  const router = useRouter();
  const { signInUser, clearUser } = useUser();
  const { mutate: signOut } = useMutation(signOutApi, {
    onSuccess: () => {
      clearUser();

      router.reload();
    },
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleProfileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleDocumentClick = () => setDropdownVisible(false);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <ProfileContainer onClick={handleProfileClick}>
      <ProfileImage>
        <Image src={signInUser.profile_image} alt="Profile Image" width={32} height={32} />
      </ProfileImage>
      {dropdownVisible && (
        <Dropdown>
          <Link href={`/@${signInUser.nickname}`}>
            <DropdownItem>내 서재</DropdownItem>
          </Link>
          <DropdownItem onClick={() => signOut()}>로그아웃</DropdownItem>
        </Dropdown>
      )}
    </ProfileContainer>
  );
}
