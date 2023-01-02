import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { TextLinkSmall, TextMedium } from '@styles/common';
import { Flex, FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const SidebarContainer = styled(FlexColumn)`
  padding: 24px;
  width: 320px;
  height: calc(100vh - 64px);
  color: var(--white-color);
  background-color: var(--primary-color);
  gap: 16px;
  position: sticky;
  top: 64px;
  z-index: 200;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &.show {
    margin-left: 0;
  }

  &.hide {
    margin-left: -320px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    position: fixed;

    &.hide {
      margin-left: -100%;
    }
  }

  @media ${({ theme }) => theme.devices.tablet} {
    position: fixed;
  }
`;

export const SidebarHeader = styled(FlexSpaceBetween)`
  fill: var(--white-color);
`;

export const BookmarkButton = styled.button`
  padding: 0;
  color: var(--white-color);
  display: flex;
  align-items: center;
  fill: var(--white-color);
`;

export const SidebarTitle = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid var(--white-color);
`;

export const ArticleNavigation = styled.div`
  flex: 1 1 0;
  padding: 24px;
  color: var(--grey-01-color);
  background-color: var(--white-color);
  border-radius: 16px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--grey-02-color);
    border-radius: 10px;
  }
`;

export const NavigationTitle = styled(TextMedium)`
  margin-bottom: 8px;
  font-weight: 700;
`;

export const NavigationItem = styled(TextLinkSmall)<{ current: boolean }>`
  padding: 4px 0;
  color: ${({ current }) => (current ? 'var(--primary-color)' : 'inherit')};
  cursor: pointer;
`;

export const SidebarFooter = styled(Link)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  text-decoration: none;
  color: inherit;
`;

export const ProfileLabel = styled(Flex)`
  flex-direction: column;
  justify-content: flex-end;
`;

export const ProfileImage = styled(Image)`
  width: 64px;
  height: 64px;
  position: relative;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--grey-01-color);
  box-sizing: border-box;
`;

export const SidebarOpenButton = styled.button`
  margin: 24px;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 150;
  fill: var(--primary-color);
`;
