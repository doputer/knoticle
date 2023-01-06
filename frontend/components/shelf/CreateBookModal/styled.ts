import styled from 'styled-components';

import { TextLinkXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const CreateBookModalContainer = styled(FlexColumn)`
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
