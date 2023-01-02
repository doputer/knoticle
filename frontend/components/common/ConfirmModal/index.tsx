import CloseIcon from '@assets/ico_close.svg';
import IconButton from '@components/common/IconButton';
import ModalButton from '@components/common/ModalButton';
import useModal from '@hooks/useModal';

import { Dimmed, ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalInner } from './styled';

export interface ConfirmModalProps {
  message: string;
  handleConfirm: () => void;
}

export default function ConfirmModal({ message, handleConfirm }: ConfirmModalProps) {
  const { closeEveryModal } = useModal();

  return (
    <ModalContainer>
      <Dimmed onClick={closeEveryModal} />
      <ModalInner>
        <ModalHeader>
          <IconButton icon={<CloseIcon />} onClick={closeEveryModal} />
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <ModalButton theme="second" onClick={closeEveryModal}>
            취소
          </ModalButton>
          <ModalButton
            theme="primary"
            onClick={() => {
              handleConfirm();
              closeEveryModal();
            }}
          >
            확인
          </ModalButton>
        </ModalFooter>
      </ModalInner>
    </ModalContainer>
  );
}
