import { AxiosError } from 'axios';

import { toastError } from '@utils/toast';

const useApiError = (error: AxiosError) => {
  const { response } = error;

  if (response) {
    const { data } = response as { data: { message?: string } };

    toastError(data?.message || '오류');
  }
};

export default useApiError;
