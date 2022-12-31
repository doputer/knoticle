import useParser from '@hooks/useParser';
import useToc from '@hooks/useToc';

import { ContentBody, ContentTitle, ContentWrapper } from './styled';

import 'highlight.js/styles/github.css';

interface ContentProps {
  title?: string;
  content: string;
}

export default function Content({ title = '', content }: ContentProps) {
  const element = useParser(content);

  useToc(element);

  return (
    <ContentWrapper>
      {title && <ContentTitle>{title}</ContentTitle>}
      <ContentBody>{element}</ContentBody>
    </ContentWrapper>
  );
}
