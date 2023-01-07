import styled from 'styled-components';

import { FlexColumn } from '@styles/layout';

export const SelectBookModalContainer = styled(FlexColumn)`
  gap: 32px;
`;

export const SelectWrapper = styled.div`
  height: 250px;
  background-color: #fff;
  border: 1px solid var(--grey-02-color);
  overflow: auto;
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
