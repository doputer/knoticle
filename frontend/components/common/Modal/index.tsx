import Image from 'next/image';

import BackwardIcon from '@assets/ico_backward.svg';
import CancelIcon from '@assets/ico_cancel.svg';
import useModal from '@hooks/useModal';

import { ButtonWrapper, Dimmed, ModalContainer, ModalInner, ModalTitle } from './styled';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  hasBackward?: boolean;
}

export default function Modal({ title, hasBackward, children }: ModalProps) {
  const { closeModal, closeEveryModal } = useModal();

  return (
    <ModalContainer>
      <Dimmed onClick={closeEveryModal} />
      <ModalInner>
        <ButtonWrapper hasBackward={hasBackward}>
          <Image src={BackwardIcon} alt="Backward Icon" onClick={closeModal} />
          <Image src={CancelIcon} alt="Cancel Icon" onClick={closeEveryModal} />
        </ButtonWrapper>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalInner>
    </ModalContainer>
  );
}

Modal.defaultProps = {
  hasBackward: false,
};
