import { useRecoilValue } from 'recoil';

import articleState from '@atoms/articleState';
import Content from '@components/common/Content';

import { PreviewContainer, PreviewTitle } from './styled';

function Preview() {
  const article = useRecoilValue(articleState);

  return (
    <PreviewContainer>
      <PreviewTitle>{article.title}</PreviewTitle>
      <Content content={article.content} />
    </PreviewContainer>
  );
}

export default Preview;
