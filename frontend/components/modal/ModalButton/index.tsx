import { ModalButtonContainer, ModalButtonInner } from './styled';

interface ModalButtonProps {
  theme: 'primary' | 'second';
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export default function ModalButton({
  theme,
  children,
  disabled = false,
  onClick,
}: ModalButtonProps) {
  return (
    <ModalButtonContainer theme={theme} disabled={disabled} onClick={onClick}>
      <ModalButtonInner>{children}</ModalButtonInner>
    </ModalButtonContainer>
  );
}
