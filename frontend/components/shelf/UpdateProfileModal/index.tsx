import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { useMutation } from 'react-query';

import { createImageApi } from '@apis/imageApi';
import { updateUserApi } from '@apis/userApi';
import EditIcon from '@assets/ico_edit.svg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useForm from '@hooks/useForm';
import useModal from '@hooks/useModal';
import { IUser } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import {
  ProfileEditModalContainer,
  ProfileImage,
  ProfileImageInput,
  ProfileImageWrapper,
} from './styled';

interface ProfileEditModalProps {
  profile: IUser;
}

function UpdateProfileModal({ profile }: ProfileEditModalProps) {
  const router = useRouter();
  const { closeEveryModal } = useModal();
  const { form, setForm, handleInputChange } = useForm(profile);
  const [validation, setValidation] = useState({
    nickname: true,
  });
  const { mutate: updateUser } = useMutation(updateUserApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('회원 정보가 수정되었습니다.');

      closeEveryModal();

      router.push(`/@${form.nickname}`);
    },
  });
  const { mutate: createImage } = useMutation(createImageApi, {
    onError: useApiError,
    onSuccess: (image) => {
      setForm({ ...form, profile_image: image.imagePath });
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!event.target.files) return;

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    createImage(formData);
  };

  const validNickname = (nickname: string) =>
    /^[a-zA-Z가-힣0-9]{2,16}$/.test(nickname)
      ? setValidation({ ...validation, nickname: true })
      : setValidation({ ...validation, nickname: false });

  const handleOkButtonClick = () => {
    updateUser(form);
  };

  return (
    <ProfileEditModalContainer>
      <ProfileImageWrapper>
        <EditIcon />
        <ProfileImage>
          <label htmlFor="file">
            <Image src={form.profile_image} width={128} height={128} alt="Profile Image" />
          </label>
          <ProfileImageInput
            id="file"
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleImageUpload}
          />
        </ProfileImage>
      </ProfileImageWrapper>
      <LabeledInput
        label="닉네임*"
        type="text"
        name="nickname"
        defaultValue={form.nickname}
        onChange={handleInputChange}
        onBlur={() => validNickname(form.nickname)}
        error={validation.nickname ? '' : '2~16자 한글, 영문 대소문자, 숫자를 사용해주세요.'}
      />
      <LabeledInput
        label="소개"
        type="text"
        name="description"
        defaultValue={form.description}
        onChange={handleInputChange}
      />
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        수정하기
      </ModalButton>
    </ProfileEditModalContainer>
  );
}

export default UpdateProfileModal;
