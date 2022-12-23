import React from 'react';

import { useRecoilValue } from 'recoil';

import { modalState, MODAL_TYPES } from '@atoms/modalState';
import Modal from '@components/common/Modal';

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.Modal]: Modal,
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
