import Image from 'next/image';
import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import { localSignInApi } from '@apis/authApi';
import GitHubIcon from '@assets/ico_github.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/common/ModalButton';
import useApiError from '@hooks/useApiError';
import useForm from '@hooks/useForm';
import { TextLinkMedium, TextSmall } from '@styles/common';

import { SignInModalContainer, SignUpButton, SignUpWrapper } from './styled';

interface SignInModalProps {
  handleSignUpModalOpen: () => void;
}

export default function SignInModal({ handleSignUpModalOpen }: SignInModalProps) {
  const router = useRouter();
  const { form, handleInputChange } = useForm({ username: '', password: '' });
  const { mutate: localSignIn } = useMutation(localSignInApi, {
    onError: useApiError,
    onSuccess: () => {
      router.reload();
    },
  });

  const handleSignInLocalClick = () => {
    localSignIn(form);
  };

  const handleSignInGitHubClick = () => {
    const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GH_ID}&redirect_url=${process.env.NEXT_PUBLIC_GH_CALLBACK}`;

    window.location.assign(GITHUB_OAUTH_URL);
  };

  return (
    <SignInModalContainer>
      <LabeledInput label="아이디" type="text" name="username" onChange={handleInputChange} />
      <LabeledInput label="비밀번호" type="password" name="password" onChange={handleInputChange} />
      <ModalButton theme="primary" onClick={handleSignInLocalClick}>
        로그인하기
      </ModalButton>
      <ModalButton theme="second" onClick={handleSignInGitHubClick}>
        <Image src={GitHubIcon} alt="GitHub Icon" />
        GitHub으로 로그인하기
      </ModalButton>
      <SignUpWrapper>
        <TextSmall>아직 계정이 없으신가요?</TextSmall>
        <SignUpButton onClick={handleSignUpModalOpen}>
          <TextLinkMedium>회원가입하기</TextLinkMedium>
        </SignUpButton>
      </SignUpWrapper>
    </SignInModalContainer>
  );
}
