import styled from 'styled-components';

export const PreviewContainer = styled.div`
  flex: 1;
  padding: 32px;
  height: 100vh;
  background-color: var(--white-color);
  border-left: 1px solid var(--grey-02-color);
  box-sizing: border-box;
  overflow: auto;

  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

export const PreviewTitle = styled.h1`
  padding-bottom: 24px;
  font-size: 32px;
  font-weight: 700;
  word-break: break-all;
`;
