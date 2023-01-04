import styled from 'styled-components';

import { TextLinkSmall, TextLinkXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const BookEditModalContainer = styled(FlexColumn)`
  gap: 32px;
`;

export const ThumbnailImageWrapper = styled.div`
  position: relative;

  svg {
    margin: 4px;
    padding: 2px;
    background-color: var(--light-yellow-color);
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

export const ThumbnailImage = styled.div`
  img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border: 1px solid var(--grey-02-color);
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
  }
`;

export const ThumbnailImageInput = styled.input`
  display: none;
`;

export const ScrapListWrapper = styled.div`
  position: relative;
`;

export const ScrapList = styled(FlexColumn)`
  padding: 8px 16px 0 16px;
  height: 128px;
  color: var(--grey-01-color);
  background-color: #fff;
  border: 1px solid var(--grey-02-color);
  border-radius: 8px;
  overflow: auto;
`;

export const Scrap = styled(TextLinkSmall)`
  line-height: 32px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &.space-top {
    padding-top: 16px;
  }

  &.space-bottom {
    padding-bottom: 16px;
  }

  > div {
    pointer-events: none;
  }
`;

export const Label = styled(TextLinkXSmall)`
  margin-left: 16px;
  padding: 0 4px;
  color: var(--primary-color);
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
`;
