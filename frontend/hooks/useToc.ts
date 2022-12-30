import { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';

import { useSetRecoilState } from 'recoil';

import { activeTocState, TOC, tocState } from '@atoms/tocState';

const useTOC = () => {
  const router = useRouter();
  const tocRef = useRef<HTMLDivElement>(null);
  const setToc = useSetRecoilState<TOC[]>(tocState);
  const setActiveToc = useSetRecoilState(activeTocState);

  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef('');

  const setScrollDirection = () => {
    if (window.scrollY === 0 && lastScrollPosition.current === 0) return;

    if (window.scrollY > lastScrollPosition.current) scrollDirection.current = 'down';
    else scrollDirection.current = 'up';

    lastScrollPosition.current = window.scrollY;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        setScrollDirection();

        if (
          (scrollDirection.current === 'down' && !isIntersecting) ||
          (scrollDirection.current === 'up' && isIntersecting)
        ) {
          setActiveToc(target.id);
        }
      });
    },
    { threshold: 1, rootMargin: '-64px 0px 0px 0px' }
  );

  const handleToc = () => {
    setActiveToc('');
    scrollDirection.current = '';
    lastScrollPosition.current = 0;

    const content = tocRef.current;

    if (!content) return null;

    const headers = <HTMLDivElement[]>[];

    content.querySelectorAll<HTMLDivElement>('h1, h2, h3').forEach((header) => {
      if (header.textContent) headers.push(header);
    });

    const toc = headers
      .filter((header) => header.textContent)
      .map<TOC>((header, index) => ({
        index,
        id: header.id,
        text: header.textContent || '',
        offsetTop: header.offsetTop,
      }));

    setToc(toc);

    headers.forEach((header) => {
      if (header.textContent) {
        observer.observe(header);
      }
    });

    return () => {
      observer.disconnect();
    };
  };

  useEffect(() => {
    handleToc();

    router.events.on('routeChangeComplete', handleToc);

    return () => {
      router.events.off('routeChangeComplete', handleToc);
    };
  }, []);

  return { tocRef };
};

export default useTOC;
