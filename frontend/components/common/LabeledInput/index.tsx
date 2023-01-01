import { ErrorMessage, Input, Label, LabeledInputContainer } from './styled';

interface LabeledInputProps {
  label?: string;
  type: string;
  name: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function LabeledInput({
  label = '',
  type,
  name,
  error = '',
  onChange,
  onBlur = () => null,
}: LabeledInputProps) {
  return (
    <LabeledInputContainer error={error}>
      <Input type={type} name={name} onChange={onChange} onBlur={onBlur} required />
      <Label>{label}</Label>
      <ErrorMessage />
    </LabeledInputContainer>
  );
}

export default LabeledInput;
