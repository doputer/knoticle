import styled from 'styled-components';

import { FlexColumn } from '@styles/layout';

export const LabeledInputContainer = styled(FlexColumn)`
  gap: 8px;
`;

export const Input = styled.input`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--grey-02-color);
  border-radius: 8px;
  font-size: 14px;
  line-height: 16px;

  ::placeholder {
    font-size: 14px;
  }
`;
