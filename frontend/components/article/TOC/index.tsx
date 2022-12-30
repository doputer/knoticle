import { useRecoilValue } from 'recoil';

import { activeTocState, tocState } from '@atoms/tocState';
import { TextSmall } from '@styles/common';

import { TocContainer, TocItem } from './styled';

export default function TOC() {
  const toc = useRecoilValue(tocState);
  const activeToc = useRecoilValue(activeTocState);

  const handleTocClick = (offsetTop: number) => {
    window.scrollTo({
      top: offsetTop - 64,
      behavior: 'smooth',
    });
  };

  return (
    <TocContainer>
      {toc.map(({ id, text, offsetTop }) => (
        <TocItem key={id} active={activeToc === id} onClick={() => handleTocClick(offsetTop)}>
          <TextSmall>{text}</TextSmall>
        </TocItem>
      ))}
    </TocContainer>
  );
}
