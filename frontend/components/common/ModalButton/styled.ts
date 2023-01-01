import styled, { css } from 'styled-components';

import { TextSmall } from '@styles/common';

export const ModalButtonContainer = styled.button<{ theme: 'primary' | 'second' }>`
  padding: 8px 0;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;

  ${(props) =>
    props.theme === 'primary'
      ? css`
          background-color: var(--primary-color);
          color: var(--white-color);
        `
      : css`
          background-color: transparent;
          color: var(--title-active-color);
          border: 1px solid var(--primary-color);
        `}

  :disabled {
    background-color: var(--grey-02-color);
    cursor: not-allowed;
  }
`;

export const Label = styled(TextSmall)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
