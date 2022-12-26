import styled from 'styled-components';

import { Flex, FlexCenter, FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const SliderContainer = styled(FlexSpaceBetween)`
  margin-top: 32px;
  gap: 8px;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 0;
  }
`;

export const SliderInner = styled(FlexColumn)<{ bookCountPerPage: number }>`
  max-width: ${(props) => `${props.bookCountPerPage * 288 - 8}px`};
  overflow: hidden;
  gap: 8px;
`;

export const SliderHeader = styled(FlexSpaceBetween)``;

export const SliderTitle = styled(FlexCenter)`
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
`;

export const SliderIndicatorWrapper = styled(FlexCenter)`
  gap: 4px;
`;

export const SliderIndicator = styled.div<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? 'var(--primary-color)' : 'var(--grey-02-color)'};
  width: 32px;
  height: 8px;
  border-radius: 8px;
`;

export const SliderBody = styled.div`
  position: relative;
`;

export const SliderTrack = styled(Flex)<{ currentBookIndex: number }>`
  gap: 8px;
  transform: ${(props) => `translateX(-${props.currentBookIndex * 288}px)`};
  transition: transform 0.5s ease;
`;
