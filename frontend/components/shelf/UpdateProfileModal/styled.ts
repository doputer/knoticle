import styled from 'styled-components';

import { FlexColumn } from '@styles/layout';

export const ProfileEditModalContainer = styled(FlexColumn)`
  gap: 32px;
`;

export const ProfileImageWrapper = styled.div`
  margin: 0 auto;
  position: relative;

  svg {
    padding: 2px;
    background-color: var(--light-orange-color);
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    fill: var(--grey-01-color);
  }

  * {
    cursor: pointer;
  }
`;

export const ProfileImageInput = styled.input`
  display: none;
`;

export const ProfileImage = styled.div`
  width: 128px;
  height: 128px;
  border: 1px solid var(--grey-01-color);
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
