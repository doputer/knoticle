import Link from 'next/link';

import styled from 'styled-components';

export const GNBContainer = styled.div`
  width: 100vw;
  height: 64px;
  background-color: var(--light-yellow-color);
  padding: 16px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
  box-sizing: border-box;
  z-index: 150;
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${({ theme }) => theme.devices.mobile} {
    left: 0;
    transform: translate(0, -50%);
    margin-left: 32px;
  }
`;

export const Logo = styled(Link)`
  color: var(--title-active-color);
  font-family: 'Sofia';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
