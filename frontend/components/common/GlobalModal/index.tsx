import React from 'react';

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

  if (!modalType) return null;

  const renderModal = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];

    return <ModalComponent {...modalProps} />;
  };

  return <>{renderModal()}</>;
}
