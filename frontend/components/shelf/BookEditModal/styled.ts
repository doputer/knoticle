import styled from 'styled-components';

import { TextLinkSmall } from '@styles/common';
import {
  FlexColumn,
  FlexColumnAlignCenter,
  FlexColumnCenter,
  FlexSpaceBetween,
} from '@styles/layout';

export const BookEditModalContainer = styled(FlexColumnAlignCenter)`
  margin: 0 auto;
  width: 280px;
  min-width: 280px;
  gap: 32px;
`;

export const BookContainer = styled(FlexColumn)`
  width: 280px;
  min-width: 280px;
  min-height: 452.5px;
  background-color: #ffffff;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const BookThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  img {
    object-fit: cover;
  }
`;

export const ThumbnailImageInput = styled.input`
  display: none;
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

  div {
    font-size: 14px;
    line-height: 28px;
    padding: 2px 0;
    border-bottom: 1px solid var(--grey-02-color);
  }
`;
