import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ItemWrapper = styled.div`
  > li {
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      flex: 1;
      line-height: 50px;
      user-select: none;
    }

    > svg:last-child {
      cursor: grab;
    }
  }
`;
