import styled from 'styled-components';

import { Flex, FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const ArticleContainer = styled(FlexColumn)`
  margin: 0 auto;
  width: 768px;
  box-sizing: border-box;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 48px 16px 32px 16px;
  }
`;

export const ArticleHeader = styled(FlexSpaceBetween)`
  border-bottom: 1px solid var(--grey-01-color);
  align-items: center;
  flex-wrap: wrap;
`;

export const ArticleTitle = styled.h1`
  padding: 24px 0;
  text-align: left;
  font-size: 32px;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

export const ArticleButtonWrapper = styled(Flex)`
  gap: 8px;

  @media ${({ theme }) => theme.devices.tablet} {
    margin-bottom: 16px;
  }
`;

export const ArticleButton = styled.button`
  padding: 4px 8px;
  color: var(--title-active-color);
  background-color: var(--light-orange-color);
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--grey-02-color);
  border-radius: 16px;
`;

export const ArticleNavigatorWrapper = styled(FlexSpaceBetween)`
  position: sticky;
  top: 50%;
  z-index: 0;

  button:first-child {
    transform: translateX(-32px);
  }

  button:last-child {
    transform: translateX(32px);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;
