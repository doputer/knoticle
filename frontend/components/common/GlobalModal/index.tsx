import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { MODAL_TYPES, modalState } from '@atoms/modalState';
import ConfirmModal from '@components/common/ConfirmModal';
import Modal from '@components/common/Modal';

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.Modal]: Modal,
  [MODAL_TYPES.Confirm]: ConfirmModal,
};

export default function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState).at(-1) || {};

  const lockScroll = useCallback(() => {
    if (typeof window !== 'object') return;

    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof window !== 'object') return;

    document.body.style.removeProperty('overflow');
  }, []);

  if (!modalType) {
    unlockScroll();
    return null;
  }

  const renderModal = () => {
    lockScroll();

    const ModalComponent = MODAL_COMPONENTS[modalType];

    return <ModalComponent {...modalProps} />;
  };

  return <>{renderModal()}</>;
}
