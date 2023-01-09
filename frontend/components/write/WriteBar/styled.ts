import styled from 'styled-components';

export const WriteBarContainer = styled.div`
  width: 100%;
  padding: 16px 32px;
  background-color: var(--white-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

export const ButtonGroup = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  height: 32px;
  padding: 4px;
  border-radius: 8px;
  font-family: 'Noto Sans KR';
  box-sizing: border-box;
`;

export const ExitButton = styled(Button)``;

export const TemporaryButton = styled(Button)`
  color: var(--title-active-color);
  background-color: transparent;
  border: 1px solid var(--grey-01-color);
`;

export const DoneButton = styled(Button)`
  color: var(--white-color);
  background-color: var(--primary-color);
  border: 1px solid var(--grey-01-color);
`;
