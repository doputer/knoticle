import { atom } from 'recoil';

import type { ConfirmModalProps } from '@components/common/ConfirmModal';
import type { ModalProps } from '@components/common/Modal';

export const MODAL_TYPES = {
  Modal: 'Modal',
  Confirm: 'Confirm',
} as const;

interface BasicModalType {
  modalType: typeof MODAL_TYPES.Modal;
  modalProps: ModalProps;
}

interface ConfirmModalType {
  modalType: typeof MODAL_TYPES.Confirm;
  modalProps: ConfirmModalProps;
}

export type ModalType = BasicModalType | ConfirmModalType;

export const modalState = atom<ModalType[]>({
  key: 'modalState',
  default: [],
});
