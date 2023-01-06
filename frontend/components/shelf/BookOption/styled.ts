import styled from 'styled-components';

import { TextMedium } from '@styles/common';
import { Flex } from '@styles/layout';

export const BookOptionContainer = styled(Flex)`
  height: 24px;
  justify-content: flex-end;
  position: relative;
`;

export const Dropdown = styled.div`
  background-color: var(--white-color);
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(0, 100%);
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

export const DropdownItem = styled(TextMedium)`
  padding: 16px 0;
  width: 128px;
  text-align: center;
  cursor: pointer;

  :hover {
    color: var(--primary-color);
    background-color: var(--grey-03-color);
  }
`;
