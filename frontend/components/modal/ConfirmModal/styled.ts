import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';
import { Flex, FlexCenter, FlexColumn } from '@styles/layout';

export const ModalContainer = styled(FlexCenter)``;

export const Dimmed = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 200;
`;

export const ModalInner = styled(FlexColumn)`
  width: 360px;
  padding: 24px;
  background: var(--white-color);
  border-radius: 16px;
  gap: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  white-space: pre-wrap;
  animation: openAnimation 0.3s ease;
  z-index: 250;

  @keyframes openAnimation {
    0% {
      transform: translate(-50%, -75%);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled(Flex)`
  justify-content: flex-end;
`;

export const ModalBody = styled(TextLinkMedium)`
  text-align: center;
`;

export const ModalFooter = styled(Flex)`
  justify-content: flex-end;
  gap: 8px;

  button {
    padding: 0;
    width: 64px;
    height: 36px;
    border-radius: 8px;
  }
`;
