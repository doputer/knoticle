import { useState } from 'react';
import { useMutation } from 'react-query';

import { signUpApi } from '@apis/authApi';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useForm from '@hooks/useForm';
import useModal from '@hooks/useModal';
import { toastError, toastSuccess } from '@utils/toast';

import { SignUpModalContainer } from './styled';

function SignUpModal() {
  const { closeEveryModal } = useModal();
  const { form, handleInputChange } = useForm({
    username: '',
    password: '',
    repassword: '',
    nickname: '',
  });
  const [validation, setValidation] = useState({
    username: true,
    password: true,
    repassword: true,
    nickname: true,
  });
  const { mutate: signUp } = useMutation(signUpApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('Knoticle 가입을 축하합니다!');
      closeEveryModal();
    },
  });

  const validUsername = (username: string) =>
    /^[a-zA-Z0-9]{4,16}$/.test(username)
      ? setValidation({ ...validation, username: true })
      : setValidation({ ...validation, username: false });

  const validPassword = (password: string) =>
    /^[a-zA-Z0-9]{9,16}$/.test(password)
      ? setValidation({ ...validation, password: true })
      : setValidation({ ...validation, password: false });

  const validRepassword = (password: string, repassword: string) =>
    password === repassword
      ? setValidation({ ...validation, repassword: true })
      : setValidation({ ...validation, repassword: false });

  const validNickname = (nickname: string) =>
    /^[a-zA-Z가-힣0-9]{2,16}$/.test(nickname)
      ? setValidation({ ...validation, nickname: true })
      : setValidation({ ...validation, nickname: false });

  const checkForm = () => Object.values(form).some((value) => !value);

  const checkModalButton = () => Object.values(validation).some((value) => !value);

  const handleSignUpButtonClick = () => {
    if (checkForm()) {
      toastError('필수 정보를 모두 입력해주세요.');
      return;
    }

    signUp(form);
  };

  return (
    <SignUpModalContainer>
      <LabeledInput
        label="아이디*"
        type="text"
        name="username"
        onChange={handleInputChange}
        onBlur={() => validUsername(form.username)}
        error={validation.username ? '' : '4~16자 영문 대소문자, 숫자를 사용해주세요.'}
      />
      <LabeledInput
        label="비밀번호*"
        type="password"
        name="password"
        onChange={handleInputChange}
        onBlur={() => validPassword(form.password)}
        error={validation.password ? '' : '9~16자 영문 대소문자, 숫자를 사용해주세요.'}
      />
      <LabeledInput
        label="비밀번호 확인*"
        type="password"
        name="repassword"
        onChange={handleInputChange}
        onBlur={() => validRepassword(form.password, form.repassword)}
        error={validation.repassword ? '' : '비밀번호가 일치하지 않습니다.'}
      />
      <LabeledInput
        label="닉네임*"
        type="text"
        name="nickname"
        onChange={handleInputChange}
        onBlur={() => validNickname(form.nickname)}
        error={validation.nickname ? '' : '2~16자 한글, 영문 대소문자, 숫자를 사용해주세요.'}
      />
      <ModalButton theme="primary" onClick={handleSignUpButtonClick} disabled={checkModalButton()}>
        회원가입하기
      </ModalButton>
    </SignUpModalContainer>
  );
}

export default SignUpModal;
