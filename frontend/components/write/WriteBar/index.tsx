import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useMutation, useQuery } from 'react-query';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { createTemporaryArticleApi, getTemporaryArticleApi } from '@apis/articleApi';
import BackIcon from '@assets/ico_back.svg';
import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import useApiError from '@hooks/useApiError';
import useModal from '@hooks/useModal';
import { toastSuccess } from '@utils/toast';

import {
  ButtonGroup,
  ExitButton,
  PublishButton,
  TemporaryButton,
  WriteBarContainer,
} from './styled';

export default function WriteBar() {
  const BookModal = dynamic(() => import('@components/common/BookModal'));

  const router = useRouter();
  const { openModal } = useModal();
  const article = useRecoilValue(articleState);
  const setBuffer = useSetRecoilState(articleBuffer);
  const { refetch: getTemporaryArticle } = useQuery(
    ['getTemporaryArticle'],
    getTemporaryArticleApi,
    {
      enabled: false,
      onError: useApiError,
      onSuccess: (temporaryArticle) => {
        setBuffer({
          title: temporaryArticle.title,
          content: temporaryArticle.content,
        });

        toastSuccess('임시 저장된 글을 불러왔습니다.');
      },
    }
  );
  const { mutate: createTemporaryArticle } = useMutation(createTemporaryArticleApi, {
    onError: useApiError,
    onSuccess: () => {
      toastSuccess('글을 임시 저장했습니다.');
    },
  });

  const handlePublishButton = () => {
    openModal({
      modalType: 'Modal',
      modalProps: {
        title: '글 발행하기',
        children: <BookModal article={article} />,
      },
    });
  };

  const handleSaveButton = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '기존에 임시 저장한 글이 사라집니다.\n정말 저장하시겠습니까?',
        handleConfirm: () => {
          createTemporaryArticle({ title: article.title, content: article.content });
        },
      },
    });
  };

  const handleLoadButton = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '현재 작성하신 글이 사라집니다.\n정말 불러오시겠습니까?',
        handleConfirm: getTemporaryArticle,
      },
    });
  };

  const handleExitButton = () => {
    openModal({
      modalType: 'Confirm',
      modalProps: {
        message: '정말 나가시겠습니까?',
        handleConfirm: () => router.push('/'),
      },
    });
  };

  return (
    <WriteBarContainer>
      <ButtonGroup>
        <ExitButton tabIndex={-1} onClick={handleExitButton}>
          <BackIcon />
        </ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton onClick={handleLoadButton}>불러오기</TemporaryButton>
        <TemporaryButton onClick={handleSaveButton}>저장하기</TemporaryButton>
        <PublishButton onClick={handlePublishButton}>발행하기</PublishButton>
      </ButtonGroup>
    </WriteBarContainer>
  );
}
