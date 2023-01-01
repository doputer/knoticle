import styled, { css } from 'styled-components';

import { TextXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const LabeledInputContainer = styled(FlexColumn)<{ error?: string }>`
  gap: 8px;
  position: relative;

  input:valid ~ span,
  input:focus ~ span {
    padding: 0 4px;
    background-color: #fff;
    color: var(--primary-color);
    transform: translateY(-24px);
    font-size: 12px;
  }

  ${({ error }) =>
    error &&
    css`
      input {
        border: 1px solid var(--red-color);
      }

      span {
        color: var(--red-color) !important;
      }

      div::before {
        content: '${error}';
      }
    `}
`;

export const Label = styled.span`
  margin: 16px 0 0 16px;
  color: var(--grey-01-color);
  font-size: 14px;
  line-height: 16px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  box-sizing: border-box;
`;

export const Input = styled.input`
  padding: 16px;
  width: 100%;
  border: 1px solid var(--grey-02-color);
  border-radius: 8px;
  font-size: 14px;
  line-height: 16px;
  outline: none;
  box-sizing: border-box;
`;

export const ErrorMessage = styled(TextXSmall)`
  color: var(--red-color);
  position: absolute;
  left: 4px;
  bottom: 0;
  transform: translate(0, 120%);
`;
