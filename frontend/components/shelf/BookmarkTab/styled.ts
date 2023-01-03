import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const BookGrid = styled.div`
  padding: 24px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;
  grid-gap: 8px;

  @media ${({ theme }) => theme.devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
