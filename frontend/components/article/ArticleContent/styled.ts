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

export const ArticleHeader = styled(FlexColumn)``;

export const ArticleTitle = styled.h1`
  padding: 24px 0;
  text-align: left;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid var(--grey-01-color);

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

export const ArticleButtonWrapper = styled(Flex)`
  padding-top: 16px;
  justify-content: flex-end;
  gap: 8px;

  @media ${({ theme }) => theme.devices.mobile} {
    justify-content: flex-start;
  }
`;

export const ArticleButton = styled.button`
  padding: 4px 8px;
  color: var(--title-active-color);
  background-color: var(--light-orange-color);
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--grey-02-color);
  border-radius: 16px;
`;

export const ArticleNavigatorWrapper = styled(FlexSpaceBetween)`
  height: 0;
  position: sticky;
  top: 50%;
  z-index: 0;

  button:first-child {
    transform: translateX(-32px);
  }

  button:last-child {
    transform: translateX(32px);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    top: 100%;

    button:first-child,
    button:last-child {
      transform: translateX(0);
    }
  }
`;

export const TocWrapper = styled.div`
  height: 0;
  position: sticky;
  top: 20%;

  @media ${({ theme }) => theme.devices.desktop} {
    display: none;
  }
`;

export const TocInner = styled.div`
  max-width: 200px;
  position: absolute;
  top: 0;
  right: -48px;
  transform: translate(100%, 0);
`;
