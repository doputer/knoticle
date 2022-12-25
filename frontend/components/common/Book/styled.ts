import Image from 'next/image';

import styled from 'styled-components';

import { TextLarge, TextLinkSmall } from '@styles/common';
import { FlexColumn, FlexColumnCenter, FlexSpaceBetween } from '@styles/layout';

export const BookContainer = styled(FlexColumn)`
  min-width: 280px;
  width: 280px;
  background-color: #ffffff;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const BookThumbnail = styled(Image)`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

export const BookBody = styled(FlexColumn)`
  padding: 16px 24px 32px 24px;
  box-sizing: border-box;
  gap: 16px;
`;

export const BookInformation = styled(FlexSpaceBetween)`
  align-items: center;
  gap: 8px;
`;

export const BookDescription = styled(FlexColumn)`
  flex: 1;
  overflow: hidden;
`;

export const BookTitle = styled(TextLarge)`
  font-weight: 700;
`;

export const BookAuthor = styled(TextLinkSmall)`
  color: var(--grey-01-color);
  font-size: 14px;
  line-height: 28px;
`;

export const Bookmark = styled(FlexColumnCenter)``;

export const BookScrapList = styled(FlexColumn)`
  gap: 8px;

  > div:first-child {
    box-sizing: border-box;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--primary-color);
  }
`;

export const BookScrap = styled(FlexColumn)`
  color: var(--grey-01-color);

  a {
    font-size: 14px;
    line-height: 28px;
    padding: 2px 0;
    border-bottom: 1px solid var(--grey-02-color);
  }
`;
