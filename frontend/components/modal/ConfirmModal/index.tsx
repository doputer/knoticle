import CloseIcon from '@assets/ico_close.svg';
import IconButton from '@components/common/IconButton';
import ModalButton from '@components/modal/ModalButton';
import useModal from '@hooks/useModal';

import { Dimmed, ModalContainer } from '../BasicModal/styled';
import { ConfirmModalInner, ModalBody, ModalFooter, ModalHeader } from './styled';

export interface ConfirmModalProps {
  message: string;
  handleConfirm: () => void;
}

export default function ConfirmModal({ message, handleConfirm }: ConfirmModalProps) {
  const { closeEveryModal } = useModal();

  return (
    <ModalContainer>
      <Dimmed onClick={closeEveryModal} />
      <ConfirmModalInner>
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
      </ConfirmModalInner>
    </ModalContainer>
  );
}
