import styled from 'styled-components';

export const TocContainer = styled.ul``;

export const TocItem = styled.li<{ active: boolean }>`
  padding: 4px 0;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--grey-01-color)')};
`;
