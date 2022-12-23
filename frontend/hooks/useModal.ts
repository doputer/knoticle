import { useRecoilState } from 'recoil';

import { modalState } from '@atoms/modalState';
import type { ModalType } from '@atoms/modalState';

export default function useModal() {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = ({ modalType, modalProps }: ModalType) => {
    setModal((prev) => prev.concat({ modalType, modalProps } as ModalType));
  };

  const closeModal = () => {
    setModal((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  const closeEveryModal = () => {
    setModal([]);
  };

  return {
    modal,
    setModal,
    openModal,
    closeModal,
    closeEveryModal,
  };
}
