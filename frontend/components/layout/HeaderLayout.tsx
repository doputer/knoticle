import { useEffect, useLayoutEffect, useState } from 'react';

import GNB from '@components/common/GNB';
import { PageWrapper } from '@styles/layout';

interface HeaderLayoutProps {
  fix?: boolean;
  children: React.ReactNode;
}

export default function HeaderLayout({ fix, children }: HeaderLayoutProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [delta, setDelta] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);

    const gap = scrollPosition - lastScrollPosition;

    if (gap >= 0) setDelta((prev) => Math.min(64, prev + gap));
    else setDelta((prev) => Math.max(0, prev + gap));
  };

  useLayoutEffect(() => {
    setDelta(0);
  }, [children]);

  useEffect(() => {
    setLastScrollPosition(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <PageWrapper>
      <GNB delta={fix ? 0 : delta} />
      {children}
    </PageWrapper>
  );
}

HeaderLayout.defaultProps = {
  fix: false,
};
