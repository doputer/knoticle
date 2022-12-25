import styled from 'styled-components';

import { FlexColumn, FlexSpaceBetween } from '@styles/layout';

const SkeletonItem = styled.div`
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

export const BookContainer = styled(FlexColumn)`
  min-width: 280px;
  width: 280px;
  height: 445.5px;
  background-color: var(--white-color);
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const BookThumbnail = styled(SkeletonItem)`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const BookBody = styled(FlexColumn)`
  padding: 16px 24px 32px 24px;
  box-sizing: border-box;
  gap: 16px;
`;

export const BookInformation = styled(FlexSpaceBetween)``;

export const BookDescription = styled(FlexColumn)``;

export const BookTitle = styled(SkeletonItem)`
  width: 128px;
  height: 30px;
`;

export const BookAuthor = styled(SkeletonItem)`
  width: 64px;
  height: 20px;
  margin-top: 4px;
`;

export const Bookmark = styled(SkeletonItem)`
  height: 30px;
  width: 30px;
`;

export const BookScrapList = styled(FlexColumn)`
  gap: 8px;
  margin-top: 46px;
`;

export const BookScrap = styled(SkeletonItem)`
  height: 24px;
  width: 100%;
`;
