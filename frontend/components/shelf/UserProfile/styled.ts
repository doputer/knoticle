import styled from 'styled-components';

import { TextMedium } from '@styles/common';
import { Flex, FlexColumn } from '@styles/layout';

export const ProfileContainer = styled(Flex)`
  padding: 24px 0;
  width: 768px;
  justify-content: flex-start;
  align-items: center;

  @media ${({ theme }) => theme.devices.tablet} {
    width: auto;
    flex-direction: column;
    justify-content: center;
  }
`;

export const UserThumbnail = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 1px solid var(--grey-01-color);
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const UserInformation = styled(FlexColumn)`
  padding: 16px;
  max-width: 360px;
  gap: 8px;
`;

export const Nickname = styled.div`
  font-size: 24px;
`;

export const Description = styled(TextMedium)`
  word-break: break-all;
`;

export const ProfileEditButton = styled.button`
  padding: 4px 8px;
  background-color: var(--light-orange-color);
  display: flex;
  align-items: center;
  border: 1px solid var(--grey-02-color);
  border-radius: 16px;
`;
