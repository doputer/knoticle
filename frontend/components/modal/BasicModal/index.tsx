import BackwardIcon from '@assets/ico_backward.svg';
import CancelIcon from '@assets/ico_close.svg';
import IconButton from '@components/common/IconButton';
import useModal from '@hooks/useModal';

import { Dimmed, ModalButtonWrapper, ModalContainer, ModalInner, ModalTitle } from './styled';

export interface BasicModalProps {
  title: string;
  hasBackward?: boolean;
  children: React.ReactNode;
}

export default function BasicModal({ title, hasBackward = false, children }: BasicModalProps) {
  const { closeModal, closeEveryModal } = useModal();

  return (
    <ModalContainer>
      <Dimmed onClick={closeEveryModal} />
      <ModalInner>
        <ModalButtonWrapper>
          <IconButton icon={<BackwardIcon />} onClick={closeModal} visible={hasBackward} />
          <IconButton icon={<CancelIcon />} onClick={closeEveryModal} />
        </ModalButtonWrapper>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalInner>
    </ModalContainer>
  );
}
