import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 100%;
  z-index: 50;
`;

export const ContentBody = styled.div`
  > * {
    line-height: 2;
    font-weight: 400;
    word-break: break-word;
  }

  h1,
  h2,
  h3,
  strong {
    font-weight: 700;
  }

  h1,
  h2,
  h3 {
    margin: 16px 0 8px 0;
    scroll-margin-top: 64px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  ol,
  ul {
    padding-left: 16px;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  p {
    img {
      width: 100%;
    }
  }

  a {
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
      text-decoration: underline;
    }
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin: 16px 0;
    padding: 8px 16px;
    border-left: 8px solid var(--light-orange-color);
  }

  code {
    padding: 0px 4px;
    background-color: var(--light-orange-color);
    border-radius: 4px;
  }

  pre {
    display: none;
    margin: 16px 0;
    padding: 16px;
    background-color: var(--light-orange-color);
    border-radius: 4px;
    font-family: 'consolas';
    font-size: 16px;
    line-height: 1.4;

    code {
      padding: 0;
      white-space: pre-wrap;
    }
  }
`;
