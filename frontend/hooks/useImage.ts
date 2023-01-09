import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { createImageApi } from '@apis/imageApi';
import useApiError from '@hooks/useApiError';

interface Image {
  imagePath: string;
}

function useImage({ onSuccess }: { onSuccess: (data: Image) => void }) {
  const { mutate: createImage } = useMutation(createImageApi, {
    onError: useApiError,
    onSuccess,
  });

  const handleImage = useCallback((imageFile: File) => {
    if (!/image\/[png,jpg,jpeg,gif]/.test(imageFile.type)) return;

    const formData = new FormData();

    formData.append('image', imageFile);

    createImage(formData);
  }, []);

  return { handleImage };
}

export default useImage;
