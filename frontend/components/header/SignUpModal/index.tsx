import { useEffect } from 'react';

import { createUserApi } from '@apis/authApi';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/common/ModalButton';
import useFetch from '@hooks/useFetch';
import useForm from '@hooks/useForm';
import useModal from '@hooks/useModal';
import { toastSuccess } from '@utils/toast';

import { SignUpModalContainer } from './styled';

function SignUpModal() {
  const { closeEveryModal } = useModal();
  const { form, handleInputChange } = useForm({
    username: '',
    password: '',
    repassword: '',
    nickname: '',
  });
  const { data: createUserData, execute: createUser } = useFetch(createUserApi);

  useEffect(() => {
    if (createUserData === undefined) return;
    toastSuccess('Knoticle 가입을 축하합니다!');
    closeEveryModal();
  }, [createUserData]);

  const handleSignUpButtonClick = () => {
    createUser(form);
  };

  return (
    <SignUpModalContainer>
      <LabeledInput
        label="아이디"
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요 (영문, 숫자 조합 10자 이내)"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="비밀번호"
        type="password"
        name="repassword"
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="닉네임"
        type="text"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        onChange={handleInputChange}
      />
      <ModalButton theme="primary" onClick={handleSignUpButtonClick}>
        회원가입하기
      </ModalButton>
    </SignUpModalContainer>
  );
}

export default SignUpModal;
