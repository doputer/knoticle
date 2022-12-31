import Link from 'next/link';

import { useRecoilValue } from 'recoil';

import { activeTocState, tocState } from '@atoms/tocState';
import { TextSmall } from '@styles/common';

import { TocContainer, TocItem } from './styled';

export default function TOC() {
  const toc = useRecoilValue(tocState);
  const activeToc = useRecoilValue(activeTocState);

  return (
    <TocContainer>
      {toc.map(({ id, text }) => (
        <Link key={id} href={`#${id}`}>
          <TocItem active={activeToc === id}>
            <TextSmall>{text}</TextSmall>
          </TocItem>
        </Link>
      ))}
    </TocContainer>
  );
}
