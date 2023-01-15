import styled from 'styled-components';

import { TextSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const SelectBookModalContainer = styled(FlexColumn)`
  height: 100%;
  gap: 16px;
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

export const SelectItem = styled.div`
  padding: 0 8px;
  height: 50px;
  line-height: 50px;

  :hover {
    background-color: var(--grey-03-color);
    cursor: pointer;
  }
`;

export const SelectLabel = styled(TextSmall)`
  text-align: center;
`;
