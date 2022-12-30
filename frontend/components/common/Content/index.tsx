import { forwardRef, Ref } from 'react';

import { markdown2html } from '@utils/parser';

import { ContentBody, ContentTitle, ContentWrapper } from './styled';

import 'highlight.js/styles/github.css';

interface ContentProps {
  title?: string;
  content: string;
}

function Content({ title = '', content }: ContentProps, ref?: Ref<HTMLDivElement>) {
  return (
    <ContentWrapper>
      {title && <ContentTitle>{title}</ContentTitle>}
      <ContentBody
        dangerouslySetInnerHTML={{
          __html: markdown2html(content),
        }}
        ref={ref}
      />
    </ContentWrapper>
  );
}

export default forwardRef(Content);
