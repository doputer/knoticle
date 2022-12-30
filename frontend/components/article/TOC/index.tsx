import Link from 'next/link';

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
      {toc.map(({ index, id, text, offsetTop }) => (
        <Link key={index} href={`#${id}`} onClick={() => handleTocClick(offsetTop)} scroll={false}>
          <TocItem active={activeToc === id}>
            <TextSmall>{text}</TextSmall>
          </TocItem>
        </Link>
      ))}
    </TocContainer>
  );
}
