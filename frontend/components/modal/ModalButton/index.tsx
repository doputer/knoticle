import { Label, ModalButtonContainer } from './styled';

interface ButtonProps {
  theme: 'primary' | 'second';
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function ModalButton({ theme, children, onClick, disabled = false }: ButtonProps) {
  return (
    <ModalButtonContainer type="button" onClick={onClick} theme={theme} disabled={disabled}>
      <Label>{children}</Label>
    </ModalButtonContainer>
  );
}
