import styled from 'styled-components';

import { FlexColumn, FlexColumnAlignCenter } from '@styles/layout';

export const SignInModalContainer = styled(FlexColumn)`
  gap: 24px;
`;

export const SignUpWrapper = styled(FlexColumnAlignCenter)`
  padding-top: 16px;
  color: var(--grey-01-color);
  border-top: 1px solid var(--grey-01-color);
  gap: 4px;
`;

export const SignUpButton = styled.button`
  color: var(--primary-color);
`;
