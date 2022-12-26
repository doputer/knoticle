import { toast } from 'react-toastify';

import TOAST_OPTIONS from '@constants/react-toastify';

export const toastSuccess = (message: string) => {
  toast.success(message, TOAST_OPTIONS);
};

export const toastError = (message: string) => {
  toast.error(message, TOAST_OPTIONS);
};
