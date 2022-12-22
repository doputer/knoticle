import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

export const GNBContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: var(--light-yellow-color);
  padding: 16px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
  box-sizing: border-box;
  z-index: 100;
  transition: all 0.2s ease;

  &.show {
    transform: translateY(0);
  }

  &.hide {
    transform: translateY(-64px);
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.mobile} {
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
  text-decoration: none;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

export const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
