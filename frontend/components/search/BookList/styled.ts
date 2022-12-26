import styled from 'styled-components';

export const BookContainer = styled.div`
  width: 280px;
`;

export const BookListWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  grid-gap: 20px 10px;
  padding: 20px 0px;

  margin-bottom: 30px;

  & div {
    justify-self: center;
  }

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
