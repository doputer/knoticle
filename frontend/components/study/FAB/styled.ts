import styled from 'styled-components';

export const FABWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 60px;
  right: 330px;
  width: 110px;
`;

export const Button = styled.button<{ isGreen?: boolean }>`
  display: center;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${(props) => (props.isGreen ? 'var(--green-color)' : 'var(--primary-color)')};
`;