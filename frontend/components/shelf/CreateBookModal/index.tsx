import Image from 'next/image';

import { useMutation, useQueryClient } from 'react-query';

import { createBookApi } from '@apis/bookApi';
import EditIcon from '@assets/ico_edit.svg';
import Thumbnail from '@assets/img_book_thumbnail.jpg';
import LabeledInput from '@components/common/LabeledInput';
import ModalButton from '@components/modal/ModalButton';
import useApiError from '@hooks/useApiError';
import useForm from '@hooks/useForm';
import useImage from '@hooks/useImage';
import useModal from '@hooks/useModal';
import useUser from '@hooks/useUser';
import { toastSuccess } from '@utils/toast';

import {
  CreateBookModalContainer,
  Label,
  ThumbnailImage,
  ThumbnailImageInput,
  ThumbnailImageWrapper,
} from './styled';

function CreateBookModal() {
  const queryClient = useQueryClient();
  const { closeEveryModal } = useModal();
  const { signInUser } = useUser();
  const { form, setForm, handleInputChange } = useForm({ title: '', thumbnail_image: '' });
  const { handleImage } = useImage({
    onSuccess: (image) => {
      setForm({ ...form, thumbnail_image: image.imagePath });
    },
  });
  const { mutate: createBook } = useMutation(createBookApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('책이 생성되었습니다.');

      queryClient.invalidateQueries(['getUserBooks', { nickname: signInUser.nickname }]);

      closeEveryModal();
    },
  });

  const handleOkButtonClick = () => {
    createBook(form);
  };

  return (
    <CreateBookModalContainer>
      <ThumbnailImageWrapper>
        <Label>썸네일</Label>
        <EditIcon />
        <ThumbnailImage>
          <label htmlFor="file">
            <Image
              src={form.thumbnail_image || Thumbnail}
              alt="Thumbnail Image"
              width={296}
              height={167}
              priority
            />
          </label>
          <ThumbnailImageInput
            id="file"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={(event) => event.target.files && handleImage(event.target.files[0])}
          />
        </ThumbnailImage>
      </ThumbnailImageWrapper>
      <LabeledInput
        label="제목*"
        type="text"
        name="title"
        defaultValue={form.title}
        onChange={handleInputChange}
      />
      <ModalButton theme="primary" onClick={handleOkButtonClick}>
        생성하기
      </ModalButton>
    </CreateBookModalContainer>
  );
}

export default CreateBookModal;
