import BackwardIcon from '@assets/ico_backward.svg';
import CancelIcon from '@assets/ico_close.svg';
import IconButton from '@components/common/IconButton';
import useModal from '@hooks/useModal';

import { Dimmed, ModalButtonWrapper, ModalContainer, ModalInner, ModalTitle } from './styled';

export interface ModalProps {
  title: string;
  hasBackward?: boolean;
  children: React.ReactNode;
}

export default function Modal({ title, hasBackward = false, children }: ModalProps) {
  const { closeModal, closeEveryModal } = useModal();

  return (
    <ModalContainer>
      <Dimmed onClick={closeEveryModal} />
      <ModalInner>
        <ModalButtonWrapper>
          <IconButton
            src={BackwardIcon}
            alt="Backward Icon"
            onClick={closeModal}
            visible={hasBackward}
          />
          <IconButton src={CancelIcon} alt="Cancel Icon" onClick={closeEveryModal} />
        </ModalButtonWrapper>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalInner>
    </ModalContainer>
  );
}
