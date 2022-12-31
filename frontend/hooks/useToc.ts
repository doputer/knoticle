import { ReactNode, useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { activeTocState, type TOC, tocState } from '@atoms/tocState';

const useTOC = (deps: ReactNode) => {
  const setToc = useSetRecoilState<TOC[]>(tocState);
  const setActiveToc = useSetRecoilState(activeTocState);

  const visibleElements = new Map<number, string>();

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visibleElements.set((target as HTMLDivElement).offsetTop, target.id);
      else visibleElements.delete((target as HTMLDivElement).offsetTop);
    });

    if (visibleElements.size > 0)
      setActiveToc(Array.from(visibleElements).sort((a, b) => a[0] - b[0])[0][1]);
  };

  const options: IntersectionObserverInit = { rootMargin: '-64px 0px 0px 0px' };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    const headers = <HTMLDivElement[]>[];

    document
      .querySelectorAll<HTMLDivElement>('h1, h2, h3')
      .forEach((header) => header.textContent && headers.push(header));

    const toc = headers.map<TOC>((header) => ({
      id: header.id,
      text: header.textContent || '',
      tag: header.tagName.toLowerCase(),
    }));

    setToc(toc);

    headers.forEach((header) => observer.observe(header));

    return () => observer.disconnect();
  }, [deps]);
};

export default useTOC;
