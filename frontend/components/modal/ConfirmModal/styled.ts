import styled from 'styled-components';

import { ModalInner } from '@components/modal/BasicModal/styled';
import { TextLinkMedium } from '@styles/common';
import { Flex } from '@styles/layout';

export const ConfirmModalInner = styled(ModalInner)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  white-space: pre-wrap;
`;

export const ModalHeader = styled(Flex)`
  height: 24px;
  justify-content: flex-end;
`;

export const ModalBody = styled(TextLinkMedium)`
  text-align: center;
`;

export const ModalFooter = styled(Flex)`
  justify-content: flex-end;
  gap: 8px;

  button {
    flex: 1;
    height: 36px;
  }
`;
