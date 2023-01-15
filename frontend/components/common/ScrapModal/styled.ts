import styled from 'styled-components';

import { FlexColumn } from '@styles/layout';

export const ScrapModalContainer = styled(FlexColumn)`
  height: 100%;
  gap: 32px;
`;

export const SelectWrapper = styled.div`
  background-color: #fff;

  > ul {
    height: 250px;
    border: 1px solid var(--grey-02-color);
    overflow-y: auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    flex: 1;

    > ul {
      height: 100%;
    }
  }
`;
