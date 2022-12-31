import { TextSmall } from '@styles/common';

import { Input, LabeledInputContainer } from './styled';

interface LabeledInputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({ label, type, name, placeholder = '', onChange }: LabeledInputProps) {
  return (
    <LabeledInputContainer>
      <TextSmall>{label}</TextSmall>
      <Input type={type} name={name} placeholder={placeholder} onChange={onChange} />
    </LabeledInputContainer>
  );
}

export default LabeledInput;
