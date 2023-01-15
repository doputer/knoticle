import useParser from '@hooks/useParser';
import useToc from '@hooks/useToc';

import { ContentBody, ContentWrapper } from './styled';

import 'highlight.js/styles/github.css';

interface ContentProps {
  content: string;
}

export default function Content({ content }: ContentProps) {
  const element = useParser(content);

  useToc(element);

  return (
    <ContentWrapper>
      <ContentBody>{element}</ContentBody>
    </ContentWrapper>
  );
}
