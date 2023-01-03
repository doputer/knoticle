import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';
import { FlexCenter, FlexSpaceBetween } from '@styles/layout';

export const ModalContainer = styled(FlexCenter)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 200;
`;

export const Dimmed = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalInner = styled.div`
  width: 360px;
  padding: 32px;
  background: var(--white-color);
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  overflow: auto;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const ModalButtonWrapper = styled(FlexSpaceBetween)`
  margin-bottom: 8px;
`;

export const ModalTitle = styled(TextLinkMedium)`
  text-align: center;
  margin-bottom: 32px;
`;
