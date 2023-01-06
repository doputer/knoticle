import styled, { css } from 'styled-components';

import { TextLarge } from '@styles/common';
import { FlexCenter } from '@styles/layout';

export const TabFilterWrapper = styled(FlexCenter)`
  gap: 24px;
`;

export const TabTitle = styled(TextLarge)<{ isActive: boolean }>`
  cursor: pointer;
  font-weight: 500;

  ${(props) =>
    props.isActive &&
    css`
      color: var(--primary-color);
      border-bottom: 1px solid var(--primary-color);
    `}
`;
