import Image from 'next/image';

import BackwardIcon from '@assets/ico_backward.svg';
import CancelIcon from '@assets/ico_cancel.svg';

import { ButtonWrapper, Dimmed, ModalContainer, ModalInner, ModalTitle } from './styled';

interface ModalProps {
  title: string;
  hasBackward?: boolean;
  children: React.ReactNode;

  handleModalClose: () => void;
  handleBackwardClick?: () => void;
}

export default function Modal({
  title,
  hasBackward,
  children,
  handleModalClose,
  handleBackwardClick,
}: ModalProps) {
  return (
    <ModalContainer>
      <Dimmed onClick={handleModalClose} />
      <ModalInner>
        <ButtonWrapper hasBackward={hasBackward}>
          <Image src={BackwardIcon} alt="Backward Icon" onClick={handleBackwardClick} />
          <Image src={CancelIcon} alt="Cancel Icon" onClick={handleModalClose} />
        </ButtonWrapper>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalInner>
    </ModalContainer>
  );
}

Modal.defaultProps = {
  hasBackward: false,
  handleBackwardClick: undefined,
};
