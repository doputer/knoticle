import styled, { css } from 'styled-components';

import { FlexColumn } from '@styles/layout';

export const ScrapModalContainer = styled(FlexColumn)`
  height: 100%;
  gap: 32px;
`;

export const SelectWrapper = styled.div`
  height: 250px;
  background-color: #fff;
  border: 1px solid var(--grey-02-color);
  overflow: auto;

  @media ${({ theme }) => theme.devices.mobile} {
    flex: 1;
  }
`;

export const SelectItem = styled.div<{ isActive: boolean }>`
  padding: 0 8px;
  height: 50px;
  line-height: 50px;
  transition: all 0.2s ease;

  &.space-top {
    padding-top: 50px;
  }

  &.space-bottom {
    padding-bottom: 50px;
  }

  :hover {
    background-color: var(--grey-03-color);
    cursor: pointer;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--light-orange-color);

      :hover {
        background-color: var(--light-orange-color);
      }
    `}
`;
