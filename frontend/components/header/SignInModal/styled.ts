import styled from 'styled-components';

import { FlexColumn, FlexColumnAlignCenter } from '@styles/layout';

export const SignInModalContainer = styled(FlexColumn)`
  gap: 32px;
`;

export const SignUpWrapper = styled(FlexColumnAlignCenter)`
  color: var(--grey-01-color);
  gap: 4px;
`;

export const SignUpButton = styled.button`
  color: var(--primary-color);
`;
