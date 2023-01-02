import styled from 'styled-components';

import { TextMedium } from '@styles/common';
import { FlexCenter } from '@styles/layout';

export const ProfileContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const ProfileImageWrapper = styled(FlexCenter)`
  fill: var(--grey-02-color);

  :hover {
    fill: var(--grey-01-color);
  }
`;

export const ProfileImage = styled.div`
  width: 32px;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--grey-01-color);
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;

  img {
    object-fit: cover;
  }
`;

export const Dropdown = styled.div`
  background-color: var(--white-color);
  position: absolute;
  bottom: -8px;
  right: 0;
  transform: translate(0, 100%);
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

export const DropdownItem = styled(TextMedium)`
  padding: 16px 0;
  width: 128px;
  text-align: center;

  :hover {
    color: var(--primary-color);
    background-color: var(--grey-03-color);
  }
`;
