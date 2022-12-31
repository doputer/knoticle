import styled from 'styled-components';

export const TocContainer = styled.ul``;

export const TocItem = styled.li<{ tag: string; active: boolean }>`
  margin-left: ${({ tag }) => (tag === 'h2' && '8px') || (tag === 'h3' && '16px')};
  padding: 4px 0;
  color: ${({ active }) => (active && 'var(--primary-color)') || 'var(--grey-01-color)'};

  a:hover {
    color: ${({ active }) => (active && 'var(--primary-color)') || 'var(--title-active-color)'};
  }
`;
