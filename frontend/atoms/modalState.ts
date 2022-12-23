import { atom } from 'recoil';

import type { ModalProps } from '@components/common/Modal';

export const MODAL_TYPES = {
  Modal: 'Modal',
} as const;

export interface BasicModalType {
  modalType: typeof MODAL_TYPES.Modal;
  modalProps: ModalProps;
}

export type ModalType = BasicModalType;

export const modalState = atom<ModalType[]>({
  key: 'modalState',
  default: [],
});
