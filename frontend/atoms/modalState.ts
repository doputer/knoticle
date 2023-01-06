import { atom } from 'recoil';

import type { BasicModalProps } from '@components/modal/BasicModal';
import type { ConfirmModalProps } from '@components/modal/ConfirmModal';

export const MODAL_TYPES = {
  Modal: 'Modal',
  Confirm: 'Confirm',
} as const;

interface BasicModalType {
  modalType: typeof MODAL_TYPES.Modal;
  modalProps: BasicModalProps;
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
